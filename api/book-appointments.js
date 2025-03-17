import { google } from "googleapis";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  try {
    const { name, email, date, time, company } = req.body;

    if (!name || !email || !date || !time || !company) {
      return res.status(400).json({ success: false, error: "Missing required fields." });
    }

    const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const formattedPrivateKey = serviceAccountKey.private_key.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT(
      serviceAccountKey.client_email,
      null,
      formattedPrivateKey,
      ["https://www.googleapis.com/auth/calendar"]
    );

    const calendar = google.calendar({ version: "v3", auth });

    const formattedDate = new Date(date).toISOString().split("T")[0];
    const [hour] = time.split(" - ")[0].split(":").map(Number);

    const startTime = new Date(`${formattedDate}T${hour.toString().padStart(2, "0")}:00:00`);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

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
    console.error("❌ Error Adding Event:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}