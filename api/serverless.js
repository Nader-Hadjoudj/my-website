import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { google } from "googleapis";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Load Google Service Account Key from Vercel environment
const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
const formattedPrivateKey = serviceAccountKey.private_key.replace(/\\n/g, "\n");

const auth = new google.auth.JWT(
  serviceAccountKey.client_email,
  null,
  formattedPrivateKey,
  ["https://www.googleapis.com/auth/calendar"]
);

const calendar = google.calendar({ version: "v3", auth });

// API Test Route
app.get("/api/test", (req, res) => {
  res.json({ success: true, message: "API is working!" });
});

// Book Appointment API
app.post("/api/book-appointment", async (req, res) => {
  try {
    const { name, email, date, time, company } = req.body;

    if (!name || !email || !date || !time || !company) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }

    const formattedDate = new Date(date).toISOString().split("T")[0];
    const [hour, minutes = 0] = time.split(":").map(Number);

    const startTime = new Date(`${formattedDate}T${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:00`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // 1 hour

    const event = {
      summary: `Meeting with ${company}`,
      description: `Scheduled by ${name} (${email})`,
      start: { dateTime: startTime.toISOString(), timeZone: "Europe/Paris" },
      end: { dateTime: endTime.toISOString(), timeZone: "Europe/Paris" },
    };

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      resource: event,
    });

    res.json({ success: true, event: response.data });
  } catch (error) {
    console.error("❌ Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export as Vercel Serverless Function
export default app;
