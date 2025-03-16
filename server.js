import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";
import fs from "fs";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// ✅ Load Google Service Account Key
let serviceAccountKey;
try {
  serviceAccountKey = JSON.parse(fs.readFileSync(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, "utf-8"));
} catch (error) {
  console.error("❌ Error loading service account key:", error.message);
  process.exit(1);
}

// ✅ Fix Private Key Format
const formattedPrivateKey = serviceAccountKey.private_key.replace(/\\n/g, "\n");

// ✅ Authenticate with Google API
const auth = new google.auth.JWT(
  serviceAccountKey.client_email,
  null,
  formattedPrivateKey,
  ["https://www.googleapis.com/auth/calendar"]
);

const calendar = google.calendar({ version: "v3", auth });

// ✅ API to Book an Appointment
app.post("/api/book-appointment", async (req, res) => {
  try {
    const { name, email, date, time, company } = req.body;

    if (!name || !email || !date || !time || !company) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }

    console.log("🔹 Received Booking Request:", req.body);

    // ✅ Ensure Date Format is Correct
    const formattedDate = new Date(date).toISOString().split("T")[0];

    // ✅ Format Time Properly
    let [hour, minutes] = time.split(":").map(Number);
    if (isNaN(minutes)) minutes = 0;

    const startTime = new Date(`${formattedDate}T${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00Z`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

    // ✅ Google Calendar Event Details
    const event = {
      summary: `Meeting with ${company}`,
      description: `Scheduled by ${name} (${email})`,
      start: { dateTime: startTime.toISOString(), timeZone: "Europe/Paris" },
      end: { dateTime: endTime.toISOString(), timeZone: "Europe/Paris" },
    };

    // ✅ Add Event to Google Calendar
    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
    });

    console.log("✅ Appointment Added:", response.data);
    res.json({ success: true, event: response.data });
  } catch (error) {
    console.error("❌ Error Adding Event:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Start Server
app.listen(PORT, () => console.log(`✅ Server Running on http://localhost:${PORT}`));
