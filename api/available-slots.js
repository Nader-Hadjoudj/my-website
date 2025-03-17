import { google } from "googleapis";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" });
  }

  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ success: false, error: "Date is required" });
  }

  try {
    const serviceAccountKey = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const formattedPrivateKey = serviceAccountKey.private_key.replace(/\\n/g, "\n");

    const auth = new google.auth.JWT(
      serviceAccountKey.client_email,
      null,
      formattedPrivateKey,
      ["https://www.googleapis.com/auth/calendar"]
    );

    const calendar = google.calendar({ version: "v3", auth });

    const timeMin = new Date(`${date}T00:00:00`).toISOString();
    const timeMax = new Date(`${date}T23:59:59`).toISOString();

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin,
      timeMax,
      timeZone: "Europe/Paris",
      singleEvents: true,
      orderBy: "startTime",
    });

    const bookedSlots = response.data.items.map((event) => {
      const start = new Date(event.start.dateTime);
      const localHour = start.getHours();
      return `${localHour}:00 - ${localHour + 1}:00`;
    });

    res.json({ success: true, bookedSlots });
  } catch (error) {
    console.error("❌ Error fetching slots:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
}