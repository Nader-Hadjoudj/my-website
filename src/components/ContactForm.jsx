import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";

// Language translations
const translations = {
  en: {
    title: "Contact Form",
    name: "Name",
    email: "Email",
    message: "Message",
    subject: "Subject",
    verificationQuestion: "Human Verification",
    verificationSubtext: "Please solve this simple math problem",
    submit: "Send Message",
    sending: "Sending...",
    success: "Message sent successfully!",
    error: "Error sending message",
    fillAllFields: "Please fill all required fields",
    verificationFailed: "Verification failed. Please try again.",
    languageToggle: "Français"
  },
  fr: {
    title: "Formulaire de Contact",
    name: "Nom",
    email: "Email",
    message: "Message",
    subject: "Sujet",
    verificationQuestion: "Vérification Humaine",
    verificationSubtext: "Veuillez résoudre ce problème mathématique simple",
    submit: "Envoyer le Message",
    sending: "Envoi en cours...",
    success: "Message envoyé avec succès !",
    error: "Erreur lors de l'envoi du message",
    fillAllFields: "Veuillez remplir tous les champs obligatoires",
    verificationFailed: "La vérification a échoué. Veuillez réessayer.",
    languageToggle: "English"
  }
};

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
  max-width: 600px;
  height: auto;
  padding: 30px;
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
`;

const Title = styled.h2`
  text-align: center;
  color: #ffd700;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
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
  padding: 12px;
  border: 1px solid #ffd700;
  background: black;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 15px;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #ffea00;
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ffd700;
  background: black;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  margin-bottom: 15px;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  &:focus {
    outline: none;
    border-color: #ffea00;
    box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
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

const VerificationContainer = styled.div`
  margin: 15px 0;
  padding: 15px;
  border: 1px solid #ffd700;
  border-radius: 5px;
  background: rgba(0, 0, 0, 0.3);
  animation: ${fadeIn} 0.5s ease-out;
`;

const VerificationTitle = styled.h3`
  color: #ffd700;
  font-size: 16px;
  margin-bottom: 5px;
`;

const VerificationSubtext = styled.p`
  color: #ddd;
  font-size: 14px;
  margin-bottom: 10px;
`;

const VerificationQuestion = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
`;

const MathProblem = styled.span`
  color: white;
  font-size: 16px;
  margin-right: 10px;
`;

const VerificationInput = styled(Input)`
  width: 80px;
  text-align: center;
`;

const StatusMessage = styled.div`
  text-align: center;
  padding: 10px;
  margin-top: 20px;
  border-radius: 5px;
  animation: ${fadeIn} 0.5s ease-out;
  
  color: ${(props) => (props.isError ? "#ff4757" : "#4cd137")};
  background: ${(props) => (props.isError ? "rgba(255, 71, 87, 0.1)" : "rgba(76, 209, 55, 0.1)")};
  border: 1px solid ${(props) => (props.isError ? "#ff4757" : "#4cd137")};
`;

const LoadingDots = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  
  span {
    width: 8px;
    height: 8px;
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

const LanguageToggle = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  color: #ffd700;
  border: 1px solid #ffd700;
  border-radius: 30px;
  padding: 5px 10px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 215, 0, 0.1);
  }
  
  &:focus {
    outline: none;
  }
`;

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: "", isError: false });
  const [showStatus, setShowStatus] = useState(false);
  
  // Verification related states
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [verificationPassed, setVerificationPassed] = useState(false);
  
  // Language state
  const [language, setLanguage] = useState("en");
  const text = translations[language];
  
  const containerRef = useRef(null);

  // Generate a new math problem on component mount and when verification fails
  useEffect(() => {
    generateMathProblem();
    
    // Initialize GSAP-like subtle container glow pulsing
    const container = containerRef.current;
    if (container) {
      let growing = true;
      const animateGlow = () => {
        if (!container) return;
        
        const currentShadow = container.style.boxShadow || "0 0 15px #ffd700, 0 0 25px rgba(255, 215, 0, 0.3)";
        const shadowIntensity = growing ? "0 0 20px #ffd700, 0 0 35px rgba(255, 215, 0, 0.4)" : "0 0 15px #ffd700, 0 0 25px rgba(255, 215, 0, 0.3)";
        
        container.style.boxShadow = shadowIntensity;
        growing = !growing;
      };
      
      const glowInterval = setInterval(animateGlow, 1500);
      return () => clearInterval(glowInterval);
    }
  }, []);

  const generateMathProblem = () => {
    // Generate random numbers between 1 and 10
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setVerificationAnswer("");
    setVerificationPassed(false);
  };

  const checkVerification = () => {
    const correctAnswer = num1 + num2;
    const userAnswer = parseInt(verificationAnswer);
    
    if (userAnswer === correctAnswer) {
      setVerificationPassed(true);
      return true;
    } else {
      // Shake the verification container on wrong answer
      const container = containerRef.current;
      if (container) {
        let position = 0;
        const interval = setInterval(() => {
          if (position === 0) {
            container.style.transform = 'translateX(5px)';
            position = 1;
          } else if (position === 1) {
            container.style.transform = 'translateX(-5px)';
            position = 2;
          } else if (position === 2) {
            container.style.transform = 'translateX(5px)';
            position = 3;
          } else {
            container.style.transform = 'translateX(0)';
            clearInterval(interval);
          }
        }, 70);
      }
      
      setStatus({
        message: text.verificationFailed,
        isError: true
      });
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
      generateMathProblem();
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // First check if all fields are filled
    if (!name || !email || !message) {
      setStatus({
        message: text.fillAllFields,
        isError: true
      });
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
      return;
    }
    
    // Check human verification if not already passed
    const isVerified = verificationPassed || checkVerification();
    if (!isVerified) return;
    
    setLoading(true);
    
    try {
      // Replace with your actual API endpoint
      const response = await axios.post("/api/send-message", {
        name,
        email,
        subject,
        message,
        language
      });
      
      if (response.data.success) {
        setStatus({
          message: text.success,
          isError: false
        });
        
        // Clear form
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        generateMathProblem();
        setVerificationPassed(false);
        
        // Success animation - flash border
        const container = containerRef.current;
        if (container) {
          container.style.boxShadow = "0 0 30px #4cd137, 0 0 50px rgba(76, 209, 55, 0.6)";
          setTimeout(() => {
            container.style.boxShadow = "0 0 15px #ffd700, 0 0 25px rgba(255, 215, 0, 0.3)";
          }, 1000);
        }
      } else {
        throw new Error(response.data.message || text.error);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({
        message: text.error,
        isError: true
      });
      
      // Error animation - shake
      const container = containerRef.current;
      if (container) {
        let position = 0;
        const interval = setInterval(() => {
          if (position === 0) {
            container.style.transform = 'translateX(10px)';
            position = 1;
          } else if (position === 1) {
            container.style.transform = 'translateX(-10px)';
            position = 2;
          } else if (position === 2) {
            container.style.transform = 'translateX(10px)';
            position = 3;
          } else {
            container.style.transform = 'translateX(0)';
            clearInterval(interval);
          }
        }, 100);
      }
    } finally {
      setLoading(false);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 4000);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "fr" : "en");
  };

  return (
    <PageWrapper>
      <Container ref={containerRef}>
        <LanguageToggle onClick={toggleLanguage}>
          {text.languageToggle}
        </LanguageToggle>
        
        <Title>{text.title}</Title>
        
        <form onSubmit={handleSubmit}>
          <Label>{text.name} *</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          
          <Label>{text.email} *</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          
          <Label>{text.subject}</Label>
          <Input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={loading}
          />
          
          <Label>{text.message} *</Label>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
          
          {!verificationPassed && (
            <VerificationContainer>
              <VerificationTitle>{text.verificationQuestion}</VerificationTitle>
              <VerificationSubtext>{text.verificationSubtext}</VerificationSubtext>
              
              <VerificationQuestion>
                <MathProblem>{num1} + {num2} = </MathProblem>
                <VerificationInput
                  type="number"
                  value={verificationAnswer}
                  onChange={(e) => setVerificationAnswer(e.target.value)}
                  disabled={loading}
                />
              </VerificationQuestion>
            </VerificationContainer>
          )}
          
          <Button type="submit" disabled={loading}>
            {loading ? (
              <>
                {text.sending}
                <LoadingDots>
                  <span></span>
                  <span></span>
                  <span></span>
                </LoadingDots>
              </>
            ) : (
              text.submit
            )}
          </Button>
        </form>
        
        {showStatus && (
          <StatusMessage isError={status.isError}>
            {status.message}
          </StatusMessage>
        )}
      </Container>
    </PageWrapper>
  );
}

export default ContactForm;