import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://stormmaze-nader-hadjoudjs-projects.vercel.app";

// Styled components
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
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
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

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const LoadingImage = styled.img`
  width: 80px;
  height: 80px;
  animation: ${({ isSpinning }) => isSpinning ? 'spin 2s linear infinite' : 'none'};
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  color: white;
  margin-top: 10px;
  font-size: 14px;
`;

function AppointmentBooking() {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("idle"); // idle, loading, success, error

  const allSlots = [...Array(14)].map((_, i) => `${i + 5}:00 - ${i + 6}:00`);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await axios.get(`${BASE_URL}/api/available-slots`, {
          params: { date: formattedDate },
        });
        const bookedSlots = response.data.bookedSlots || [];
        console.log("Booked slots:", bookedSlots);
        const freeSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
        console.log("Free slots:", freeSlots);
        setAvailableSlots(freeSlots);
        if (selectedTime && !freeSlots.includes(selectedTime)) {
          setSelectedTime("");
        }
      } catch (error) {
        console.error("Error fetching available slots:", error);
        setAvailableSlots(allSlots); // Fallback
      }
    };

    fetchAvailableSlots();
  }, [selectedDate]);

  const handleBooking = async () => {
    if (clientName && email && company && selectedDate && selectedTime) {
      try {
        setLoading(true);
        setBookingStatus("loading");
        setConfirmation("");
        
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await axios.post(`${BASE_URL}/api/book-appointment/`, {
          name: clientName,
          email,
          phone,
          company,
          date: formattedDate,
          time: selectedTime,
        });

        if (response.data.success) {
          setBookingStatus("success");
          setConfirmation(
            `✅ Appointment booked for ${clientName} on ${formattedDate} at ${selectedTime}.`
          );
          const bookedSlots = (
            await axios.get(`${BASE_URL}/api/available-slots`, {
              params: { date: formattedDate },
            })
          ).data.bookedSlots || [];
          const freeSlots = allSlots.filter(
            (slot) => !bookedSlots.includes(slot)
          );
          setAvailableSlots(freeSlots);
          setSelectedTime("");
        } else {
          setBookingStatus("error");
          setConfirmation("❌ Failed to book the appointment.");
        }
      } catch (error) {
        setBookingStatus("error");
        console.error("❌ Error booking appointment:", error.response?.data || error.message);
        setConfirmation("❌ Error booking appointment.");
      } finally {
        setLoading(false);
      }
    } else {
      setBookingStatus("error");
      setConfirmation("❌ Please fill all fields and select a time slot.");
    }
  };

  // Function to get the appropriate loading image based on status
  const getStatusImage = () => {
    switch (bookingStatus) {
      case "loading":
        return "../../public/loading-orange.png"; // Replace with your loading orange image
      case "success":
        return "success-apple.png"; // Replace with your success apple image
      case "error":
        return "../../public/error-strawberry.svg"; // Replace with your error strawberry image
      default:
        return "";
    }
  };

  // Function to get the appropriate loading text based on status
  const getStatusText = () => {
    switch (bookingStatus) {
      case "loading":
        return "Processing your appointment...";
      case "success":
        return "Appointment successfully booked!";
      case "error":
        return "Error booking appointment";
      default:
        return "";
    }
  };

  return (
    <PageWrapper>
      <Container>
        <LeftColumn>
          <Title>Client Information</Title>
          <Label>Name</Label>
          <Input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            disabled={loading}
          />
          <Label>Email</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Label>Phone Number</Label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+33 1 23 45 67 89"
            disabled={loading}
          />
          <Label>Company</Label>
          <Input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={loading}
          />
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
            disabled={loading}
          />
          <Label>Select a Time Slot:</Label>
          <div>
            {availableSlots.map((slot) => (
              <TimeSlotButton
                key={slot}
                onClick={() => setSelectedTime(slot)}
                selected={selectedTime === slot}
                disabled={loading}
              >
                {slot}
              </TimeSlotButton>
            ))}
          </div>
          <Button onClick={handleBooking} disabled={loading}>
            {loading ? "Processing..." : "Confirm Appointment"}
          </Button>
          
          {bookingStatus !== "idle" && (
            <LoadingContainer>
              <LoadingImage 
                src={getStatusImage()} 
                alt={bookingStatus} 
                isSpinning={bookingStatus === "loading"}
              />
              <LoadingText>{getStatusText()}</LoadingText>
            </LoadingContainer>
          )}
          
          {confirmation && <Confirmation>{confirmation}</Confirmation>}
        </RightColumn>
      </Container>
    </PageWrapper>
  );
}

export default AppointmentBooking;