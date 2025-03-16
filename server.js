import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import { google } from "googleapis";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Google OAuth Config
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// ✅ Step 1: Generate Google OAuth URL
app.get("/auth/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.events"],
  });
  res.redirect(authUrl);
});

// ✅ Step 2: Handle Google OAuth Callback
app.get("/oauth/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    console.log("✅ Google OAuth Success:", tokens);
    res.json({ success: true, tokens });
  } catch (error) {
    console.error("❌ OAuth Error:", error.message);
    res.status(500).json({ error: "OAuth Failed" });
  }
});

// ✅ Step 3: Create Google Calendar Event
app.post("/api/book-appointment", async (req, res) => {
  try {
    const { name, email, date, time, company, accessToken } = req.body;
    oauth2Client.setCredentials({ access_token: accessToken });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const eventStartTime = new Date(`${date}T${time}:00`);
    const eventEndTime = new Date(eventStartTime);
    eventEndTime.setHours(eventStartTime.getHours() + 1);

    const event = {
      summary: `Meeting with ${company}`,
      start: { dateTime: eventStartTime.toISOString(), timeZone: "Europe/Paris" },
      end: { dateTime: eventEndTime.toISOString(), timeZone: "Europe/Paris" },
      attendees: [{ email }],
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    });

    console.log("✅ Event Created:", response.data);
    res.json({ success: true, event: response.data });
  } catch (error) {
    console.error("❌ Google Calendar Error:", error.message);
    res.status(500).json({ error: "Failed to create event" });
  }
});

// ✅ Start Express Server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
