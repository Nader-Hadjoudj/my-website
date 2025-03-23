import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

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

// Subtle gold shimmer effect
const shimmer = keyframes`
  0% { background-position: -100% 0; }
  100% { background-position: 200% 0; }
`;

// Styled components
const PageWrapper = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  height: auto;
  padding: 20px;
  background: rgb(13, 13, 13);
  border-radius: 10px;
  box-shadow: 0 0 15px #ffd700, 0 0 25px rgba(255, 215, 0, 0.3);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    z-index: -1;
    background: linear-gradient(45deg, transparent, rgba(255, 215, 0, 0.1), transparent);
    background-size: 200% 200%;
    animation: ${shimmer} 3s linear infinite;
    filter: blur(10px);
  }
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  padding: 20px;
  opacity: 0; // For GSAP animation
`;

const RightColumn = styled.div`
  flex: 1;
  padding: 20px;
  opacity: 0; // For GSAP animation
`;

const Divider = styled.div`
  height: 2px;
  width: 90%;
  margin: 10px auto;
  background: linear-gradient(to right, #ffd700, #ffea00);
  opacity: 0; // For GSAP animation
  
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
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #ffea00;
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
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
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #ffea00;
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #222;
  color: #ffd700;
  border: 1px solid #ffd700;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  margin-top: 10px;
  overflow: hidden;
  position: relative;
  z-index: 1;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.2), transparent);
    transition: 0.5s;
    z-index: -1;
  }

  &:hover {
    color: white;
    background: #333;
    border-color: #ffea00;
    &:before {
      left: 100%;
    }
  }
  
  &:disabled {
    background: #333;
    color: #888;
    border-color: #555;
    cursor: not-allowed;
    &:before {
      display: none;
    }
  }
`;

const Confirmation = styled.p`
  text-align: center;
  color: #ffd700;
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
  background: ${({ selected }) => (selected ? "#ffd700" : "#222")};
  color: ${({ selected }) => (selected ? "black" : "#ffd700")};
  border: 1px solid #ffd700;
  
  &:hover {
    background: ${({ selected }) => (selected ? "#ffea00" : "#333")};
    color: ${({ selected }) => (selected ? "black" : "white")};
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
  opacity: 0; // For GSAP animation
`;

const CalendarBase = styled.div`
  width: 100px;
  height: 120px;
  background-color: #222;
  border: 1px solid #ffd700;
  border-radius: 8px;
  position: relative;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.5s ease-out;
`;

const CalendarHeader = styled.div`
  width: 100%;
  height: 30px;
  background-color: #ffd700;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
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
  color: #ffd700;
  margin-top: 5px;
`;

const CalendarTime = styled.div`
  font-size: 14px;
  color: #ddd;
  margin-top: 5px;
`;

const CheckIcon = styled.div`
  position: absolute;
  top: -15px;
  right: -15px;
  width: 40px;
  height: 40px;
  background-color: #ffd700;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
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
  background-color: #ff4757;
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
    background-color: #ffd700;
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
  const { t, i18n } = useTranslation();
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

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const leftColumnRef = useRef(null);
  const rightColumnRef = useRef(null);
  const dividerRef = useRef(null);
  const animationContainerRef = useRef(null);

  const allSlots = [...Array(14)].map((_, i) => `${i + 5}:00 - ${i + 6}:00`);

  // Initialize GSAP animations
  useEffect(() => {
    // Initial entrance animation
    gsap.to(leftColumnRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.2
    });
    
    gsap.to(rightColumnRef.current, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.4
    });
    
    gsap.to(dividerRef.current, {
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.3
    });
    
    // Subtle container glow pulsing
    gsap.to(containerRef.current, {
      boxShadow: "0 0 20px #ffd700, 0 0 35px rgba(255, 215, 0, 0.4)",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  // Animation for status changes
  useEffect(() => {
    if (bookingStatus !== "idle" && animationContainerRef.current) {
      gsap.to(animationContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)"
      });
    }
  }, [bookingStatus]);

  useEffect(() => {
    const fetchAvailableSlots = async () => {
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await axios.get(`${BASE_URL}/api/available-slots`, {
          params: { date: formattedDate },
        });
        const bookedSlots = response.data.bookedSlots || [];
        const freeSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));
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
        
        // GSAP animation for button click
        if (animationContainerRef.current) {
          gsap.fromTo(
            animationContainerRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
          );
        }
        
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
          const displayDate = format(selectedDate, 'PP', { 
            locale: i18n.language === 'fr' ? fr : undefined 
          });
          setConfirmation(
            t('appointment.success', { 
              name: clientName, 
              date: displayDate, 
              time: selectedTime 
            })
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
          
          // Success animation
          gsap.to(containerRef.current, {
            boxShadow: "0 0 30px #ffd700, 0 0 50px rgba(255, 215, 0, 0.6)",
            duration: 0.5,
            yoyo: true,
            repeat: 3
          });
        } else {
          setBookingStatus("error");
          setConfirmation(t('appointment.error'));
          
          // Error animation
          gsap.to(containerRef.current, {
            x: [-5, 5, -5, 5, 0],
            duration: 0.5,
            ease: "power1.inOut"
          });
        }
      } catch (error) {
        setBookingStatus("error");
        console.error("Error booking appointment:", error.response?.data || error.message);
        setConfirmation(t('appointment.error'));
        
        // Error animation
        gsap.to(containerRef.current, {
          x: [-5, 5, -5, 5, 0],
          duration: 0.5,
          ease: "power1.inOut"
        });
      } finally {
        setLoading(false);
      }
    } else {
      setBookingStatus("error");
      setConfirmation(t('appointment.validationError'));
      
      // Validation error animation
      gsap.to(containerRef.current, {
        x: [-3, 3, -3, 3, 0],
        duration: 0.4,
        ease: "power1.inOut" 
      });
    }
  };

  // Animation for time slot selection
  const handleTimeSlotClick = (slot) => {
    setSelectedTime(slot);
    
    // GSAP animation for selection
    gsap.fromTo(
      ".selected-time-slot",
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: "back.out(1.7)" }
    );
  };

  // Format date for display
  const getFormattedDate = () => {
    const day = selectedDate.getDate();
    return day;
  };

  // Get month name
  const getMonthName = () => {
    const monthNames = i18n.language === 'fr' 
      ? ["JAN", "FÉV", "MAR", "AVR", "MAI", "JUIN", "JUIL", "AOÛ", "SEP", "OCT", "NOV", "DÉC"]
      : ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return monthNames[selectedDate.getMonth()];
  };

  return (
    <PageWrapper>
      <Container ref={containerRef}>
        <LeftColumn ref={leftColumnRef}>
          <Title>{t('appointment.title')}</Title>
          <Label>{t('appointment.name')}</Label>
          <Input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            disabled={loading}
          />
          <Label>{t('appointment.email')}</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <Label>{t('appointment.phone')}</Label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t('appointment.phonePlaceholder')}
            disabled={loading}
          />
          <Label>{t('appointment.company')}</Label>
          <Input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            disabled={loading}
          />
        </LeftColumn>
        <Divider ref={dividerRef} />
        <RightColumn ref={rightColumnRef}>
          <Title>{t('appointment.dateTimeTitle')}</Title>
          <Label>{t('appointment.selectDate')}:</Label>
          <StyledDatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            minDate={new Date()}
            dateFormat={i18n.language === 'fr' ? "dd/MM/yyyy" : "MM/dd/yyyy"}
            disabled={loading}
          />
          <Label>{t('appointment.selectTime')}:</Label>
          <TimeSlotContainer>
            {availableSlots.map((slot) => (
              <TimeSlotButton
                key={slot}
                onClick={() => handleTimeSlotClick(slot)}
                selected={selectedTime === slot}
                disabled={loading}
                className={selectedTime === slot ? "selected-time-slot" : ""}
              >
                {slot}
              </TimeSlotButton>
            ))}
          </TimeSlotContainer>
          <Button onClick={handleBooking} disabled={loading}>
            {loading ? t('appointment.processing') : t('appointment.confirm')}
          </Button>
          
          {bookingStatus !== "idle" && (
            <AnimationContainer ref={animationContainerRef}>
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