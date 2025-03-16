import React, { useState, useEffect } from "react"; // Added useEffect
import axios from "axios";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5000"
  : "https://stormmaze-nader-hadjoudjs-projects.vercel.app";

// Styled components remain unchanged
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

const LeftColumn = styled.div`
  flex: 1;
  padding: 20px;
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 20px;
`;

const Divider = styled.div`
  width: 2px;
  background: linear-gradient(to bottom, #ffd700, #ffea00);
  margin: 0 15px;
`;

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

const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  border: 1px solid #ffd700;
  background: black;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  margin-bottom: 10px;
  cursor: pointer;
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
  const [availableSlots, setAvailableSlots] = useState([]); // State for free slots

  // All possible time slots from 5:00 to 18:00
  const allSlots = [...Array(14)].map((_, i) => `${i + 5}:00 - ${i + 6}:00`);

  // Fetch available slots when date changes
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await axios.get(`${BASE_URL}/api/available-slots`, {
          params: { date: formattedDate },
        });
        const bookedSlots = response.data.bookedSlots || [];
        // Filter out booked slots from all possible slots
        const freeSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
        setAvailableSlots(freeSlots);
        // Reset selected time if it's no longer available
        if (selectedTime && !freeSlots.includes(selectedTime)) {
          setSelectedTime("");
        }
      } catch (error) {
        console.error("Error fetching available slots:", error);
        setAvailableSlots(allSlots); // Fallback to all slots if fetch fails
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (clientName && email && company && selectedDate && selectedTime) {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await axios.post(`${BASE_URL}/api/book-appointment/`, {
          name: clientName,
          email,
          company,
          date: formattedDate,
          time: selectedTime,
        });

        if (response.data.success) {
          setConfirmation(`✅ Appointment booked for ${clientName} on ${formattedDate} at ${selectedTime}.`);
          // Refresh available slots after booking
          const bookedSlots = (await axios.get(`${BASE_URL}/api/available-slots`, {
            params: { date: formattedDate },
          })).data.bookedSlots || [];
          const freeSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
          setAvailableSlots(freeSlots);
          setSelectedTime(""); // Reset selected time
        } else {
          setConfirmation("❌ Failed to book the appointment.");
        }
      } catch (error) {
        console.error("❌ Error booking appointment:", error.response?.data || error.message);
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
          <Title>Client Information</Title>
          <Label>Name</Label>
          <Input type="text" value={clientName} onChange={(e) => setClientName(e.target.value)} />
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Label>Company</Label>
          <Input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
        </LeftColumn>
        <Divider />
        <RightColumn>
          <Title>Select Date & Time</Title>
          <Label>Select a Date:</Label>
          <StyledDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat="dd/MM/yyyy"
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