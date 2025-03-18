import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://stormmaze-nader-hadjoudjs-projects.vercel.app";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const scaleIn = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
`;

// Styled components
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  background: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  overflow-x: hidden; /* Prevent horizontal scrolling */
  touch-action: manipulation; /* Prevents default touch behaviors */
  
  @media (max-width: 768px) {
    padding: 10px;
    min-height: -webkit-fill-available;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: auto;
  padding: 20px;
  background: rgb(13, 13, 13);
  border-radius: 10px;
  box-shadow: 0 1px 8px #ffd700;
  display: flex;
  flex-direction: column;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
  }
  
  @media (max-width: 768px) {
    padding: 15px;
    box-shadow: 0 1px 4px #ffd700;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Divider = styled.div`
  height: 2px;
  width: 90%;
  margin: 10px auto;
  background: linear-gradient(to right, #ffd700, #ffea00);
  
  @media (min-width: 768px) {
    width: 2px;
    height: auto;
    margin: 0 15px;
    background: linear-gradient(to bottom, #ffd700, #ffea00);
  }
`;

const Title = styled.h2`
  text-align: center;
  color: #ffd700;
  font-size: 20px;
  
  @media (min-width: 768px) {
    font-size: 22px;
  }
  
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

const TimeSlotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
`;

const TimeSlotButton = styled(Button)`
  width: auto;
  padding: 8px 12px;
  margin: 3px;
  font-size: 14px;
  background: ${({ selected }) => (selected ? "#ffea00" : "#007bff")};
  color: ${({ selected }) => (selected ? "black" : "white")};
  
  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: 12px;
  }
`;

// Animation components
const AnimationContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CalendarBase = styled.div`
  width: 100px;
  height: 120px;
  background-color: white;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out;
`;

const CalendarHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: #ff4757;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  font-size: 14px;
`;

const CalendarBody = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CalendarDate = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-top: 5px;
`;

const CalendarTime = styled.div`
  font-size: 14px;
  color: #666;
  margin-top: 5px;
`;

const CheckIcon = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 40px;
  height: 40px;
  background-color: #28a745;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  animation: ${scaleIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:before {
    content: "✓";
  }
`;

const ErrorIcon = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 40px;
  height: 40px;
  background-color: #dc3545;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 20px;
  font-weight: bold;
  animation: ${scaleIn} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  
  &:before {
    content: "✕";
  }
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  
  span {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    background-color: #007bff;
    border-radius: 50%;
    display: inline-block;
    animation: ${pulse} 1.4s infinite ease-in-out both;
    
    &:nth-child(1) {
      animation-delay: -0.32s;
    }
    
    &:nth-child(2) {
      animation-delay: -0.16s;
    }
  }
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
    // Prevent page zooming on double-tap in iOS
    document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });
    
    // Prevent page zooming on double-tap in iOS (alternative method)
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, { passive: false });
    
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

  // Format date for display
  const getFormattedDate = () => {
    const day = selectedDate.getDate();
    return day;
  };

  // Get month name
  const getMonthName = () => {
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames[selectedDate.getMonth()];
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
          <TimeSlotContainer>
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
          </TimeSlotContainer>
          <Button onClick={handleBooking} disabled={loading}>
            {loading ? "Processing..." : "Confirm Appointment"}
          </Button>
          
          {bookingStatus !== "idle" && (
            <AnimationContainer>
              <CalendarBase>
                <CalendarHeader>{getMonthName()}</CalendarHeader>
                <CalendarBody>
                  <CalendarDate>{getFormattedDate()}</CalendarDate>
                  {selectedTime && <CalendarTime>{selectedTime}</CalendarTime>}
                  
                  {bookingStatus === "loading" && (
                    <LoadingDots>
                      <span></span>
                      <span></span>
                      <span></span>
                    </LoadingDots>
                  )}
                </CalendarBody>
                {bookingStatus === "success" && <CheckIcon />}
                {bookingStatus === "error" && <ErrorIcon />}
              </CalendarBase>
            </AnimationContainer>
          )}
          
          {confirmation && <Confirmation>{confirmation}</Confirmation>}
        </RightColumn>
      </Container>
    </PageWrapper>
  );
}

export default AppointmentBooking;