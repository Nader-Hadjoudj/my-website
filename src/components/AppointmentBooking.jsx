import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ✅ Set Backend URL (Auto-switch for local & deployed version)
const BASE_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:5000"
  : "https://www.stormmaze.com/api";

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
  padding: 20px;
  background: rgb(13, 13, 13);
  border-radius: 10px;
  box-shadow: 0 1px 8px #ffd700;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const LeftColumn = styled.div`
  width: 45%;
  padding-right: 10px;
`;

const RightColumn = styled.div`
  width: 45%;
  padding-left: 10px;
  border-left: 2px solid #ffd700;
`;

const Title = styled.h2`
  text-align: center;
  color: rgb(255, 255, 255);
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
  color: rgb(255, 255, 255);
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
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
  background: ${({ selected }) => (selected ? "#0056b3" : "#007bff")};
`;

function AppointmentBooking() {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");

  // Generate available time slots
  const generateTimeSlots = () => {
    let slots = [];
    for (let hour = 9; hour < 18; hour++) slots.push(`${hour}:00 - ${hour + 1}:00`);
    return slots;
  };

  const availableSlots = generateTimeSlots();

  const handleBooking = async () => {
    if (clientName && email && company && selectedDate && selectedTime) {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0]; // Format YYYY-MM-DD
        const response = await axios.post(`${BASE_URL}/book-appointment`, {
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
        <LeftColumn>
          <Title>Book an Appointment</Title>
          <Label>Name</Label>
          <Input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label>Company</Label>
          <Input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </LeftColumn>

        <RightColumn>
          <Label>Select a Date:</Label>
          <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} minDate={new Date()} dateFormat="MM/dd/yyyy" className="datepicker" />

          <Label>Select a Time Slot:</Label>
          {availableSlots.map((slot) => (
            <TimeSlotButton key={slot} onClick={() => setSelectedTime(slot)} selected={selectedTime === slot}>
              {slot}
            </TimeSlotButton>
          ))}

          <Button onClick={handleBooking}>Confirm Appointment</Button>
          {confirmation && <Confirmation>{confirmation}</Confirmation>}
        </RightColumn>
      </Container>
    </PageWrapper>
  );
}

export default AppointmentBooking;
