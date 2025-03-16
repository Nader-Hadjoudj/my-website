import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const ZOHO_CALENDAR_API =
  "https://calendar.zoho.eu/eventreq/your_calendar_id_here";

// ✅ No Authentication Required for Booking
app.post("/api/book-appointment", async (req, res) => {
  try {
    const { name, email, date, time, company } = req.body;

    if (!name || !email || !date || !time || !company) {
      return res.status(400).json({ success: false, error: "Missing fields" });
    }

    // Format date to MM/DD/YYYY
    const formattedDate = date.split("-").reverse().join("/");

    // Format time to 24-hour format
    let [hour, minutes] = time.split(":").map(Number);
    if (isNaN(minutes)) minutes = 0;
    const formattedTime = `${hour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    const endHour = hour + 1;
    const formattedEndTime = `${endHour.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;

    // Construct Zoho API request
    const requestUrl = `${ZOHO_CALENDAR_API}?name=${encodeURIComponent(name)}&mailId=${encodeURIComponent(email)}&date=${formattedDate}&time=${formattedTime}&endTime=${formattedEndTime}&reason=Meeting%20with%20${encodeURIComponent(company)}`;

    console.log("🔹 Sending Request to Zoho:", requestUrl);

    const response = await axios.get(requestUrl);
    console.log("✅ Zoho Response:", response.data);

    res.json({ success: true, data: response.data });
  } catch (error) {
    console.error("❌ Error booking appointment:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message, details: error.response?.data });
  }
});

app.listen(PORT, () => console.log(`✅ Backend Server Running on http://localhost:${PORT}`));
