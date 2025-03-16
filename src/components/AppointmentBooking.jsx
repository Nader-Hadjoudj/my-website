import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ✅ Adjust API URL based on Environment
const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5000"
  : "https://your-vercel-app.vercel.app"; // Replace with your actual deployed URL

// 🔹 Page Layout
const PageWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  width: 800px;
  height: auto;
  padding: 20px;
  background: rgb(13, 13, 13);
  border-radius: 10px;
  box-shadow: 0 1px 8px #ffd700;
  display: flex;
  align-items: stretch;
`;

// 🔹 Left & Right Sections
const LeftColumn = styled.div`
  flex: 1;
  padding: 20px;
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 20px;
`;

// 🔹 Golden Divider
const Divider = styled.div`
  width: 2px;
  background: linear-gradient(to bottom, #ffd700, #ffea00);
  margin: 0 15px;
`;

// 🔹 Styled Components
const Title = styled.h2`
  text-align: center;
  color: #ffd700;
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
  color: white;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ffd700;
  background: black;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 10px;
  &:focus {
    outline: none;
    border-color: #ffea00;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;

  &:hover {
    background: #0056b3;
  }
`;

const Confirmation = styled.p`
  text-align: center;
  color: green;
  font-weight: bold;
  margin-top: 10px;
`;

const TimeSlotButton = styled(Button)`
  width: auto;
  margin: 5px;
  background: ${({ selected }) => (selected ? "#ffea00" : "#007bff")};
  color: ${({ selected }) => (selected ? "black" : "white")};
`;

function AppointmentBooking() {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");

  // ✅ Generate Available Time Slots
  const availableSlots = [...Array(14)].map((_, i) => `${i + 5}:00 - ${i + 6}:00`);

  const handleBooking = async () => {
    if (clientName && email && company && selectedDate && selectedTime) {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
        const response = await axios.post(`${BASE_URL}/api/book-appointment`, {
          name: clientName,
          email,
          company,
          date: formattedDate,
          time: selectedTime,
        });

        if (response.data.success) {
          setConfirmation(`✅ Appointment booked for ${clientName} on ${formattedDate} at ${selectedTime}.`);
        } else {
          setConfirmation("❌ Failed to book the appointment.");
        }
      } catch (error) {
        console.error(error);
        setConfirmation("❌ Error booking appointment.");
      }
    } else {
      setConfirmation("❌ Please fill all fields and select a time slot.");
    }
  };

  return (
    <PageWrapper>
      <Container>
        {/* 🔹 Left Side - Client Details */}
        <LeftColumn>
          <Title>Client Information</Title>

          <Label>Name</Label>
          <Input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />

          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <Label>Company</Label>
          <Input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </LeftColumn>

        {/* 🔹 Golden Divider */}
        <Divider />

        {/* 🔹 Right Side - Appointment Selection */}
        <RightColumn>
          <Title>Select Date & Time</Title>

          <Label>Select a Date:</Label>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="MM/dd/yyyy"
            className="datepicker"
          />

          <Label>Select a Time Slot:</Label>
          <div>
            {availableSlots.map((slot) => (
              <TimeSlotButton
                key={slot}
                onClick={() => setSelectedTime(slot)}
                selected={selectedTime === slot}
              >
                {slot}
              </TimeSlotButton>
            ))}
          </div>

          <Button onClick={handleBooking}>Confirm Appointment</Button>
          {confirmation && <Confirmation>{confirmation}</Confirmation>}
        </RightColumn>
      </Container>
    </PageWrapper>
  );
}

export default AppointmentBooking;
