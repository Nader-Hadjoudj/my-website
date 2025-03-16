import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";

// ✅ Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ Fix CORS Configuration
app.use(
  cors({
    origin: "*", // ✅ Temporarily allowing all origins (for debugging)
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware to Manually Set CORS Headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow all origins (for now)
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// ✅ Load Google Service Account Key
let serviceAccountKey;
try {
  serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
} catch (error) {
  console.error("❌ Error parsing service account key:", error.message);
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

// ✅ Test Route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working!" });
});

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
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1-hour meeting

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
