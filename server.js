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
    origin: ["http://localhost:5173", "https://www.stormmaze.com"], // Allow frontend in dev & prod
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Middleware to Handle CORS Preflight Requests
app.options("*", cors());

// ✅ Load Google Service Account Key (Fix for Vercel)
let serviceAccountKey;
try {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    throw new Error("GOOGLE_SERVICE_ACCOUNT_KEY is missing in environment variables.");
  }
  serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
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

// ✅ Test Route (Check if API is Running)
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

// ✅ Start Server (Fix for Vercel)
export default app;
if (process.env.NODE_ENV !== "vercel") {
  app.listen(PORT, () => console.log(`✅ Server Running on http://localhost:${PORT}`));
}
