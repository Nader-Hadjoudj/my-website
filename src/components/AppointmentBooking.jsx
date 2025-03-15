import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background:rgb(0, 0, 0);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin: 10px 0 5px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
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
  
  &:hover {
    background: #0056b3;
  }
`;

const Confirmation = styled.p`
  text-align: center;
  color: green;
  font-weight: bold;
  margin-top: 15px;
`;

function AppointmentBooking() {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleBooking = () => {
    if (clientName && email && date && time) {
      setConfirmation(`✅ Appointment booked for ${clientName} on ${date} at ${time}`);
      setClientName("");
      setEmail("");
      setDate("");
      setTime("");
    } else {
      setConfirmation("❌ Please fill all fields.");
    }
  };

  return (
    <Container>
      <Title>Book an Appointment</Title>
      <Label>Name</Label>
      <Input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} placeholder="Enter your name" />

      <Label>Email</Label>
      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" />

      <Label>Date</Label>
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

      <Label>Time</Label>
      <Input type="time" value={time} onChange={(e) => setTime(e.target.value)} />

      <Button onClick={handleBooking}>Confirm Appointment</Button>

      {confirmation && <Confirmation>{confirmation}</Confirmation>}
    </Container>
  );
}

export default AppointmentBooking;
