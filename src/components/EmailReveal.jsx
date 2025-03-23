import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

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
  width: 100%;
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

const Description = styled.p`
  color: #e0e0e0;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.6;
`;

const ImageContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
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
  justify-content: center;
  margin: 10px 0;
`;

const MathProblem = styled.span`
  color: white;
  font-size: 16px;
  margin-right: 10px;
`;

const VerificationInput = styled.input`
  width: 80px;
  text-align: center;
  padding: 12px;
  border: 1px solid #ffd700;
  background: black;
  color: white;
  border-radius: 5px;
  font-size: 14px;
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

const EmailContainer = styled(motion.div)`
  margin-top: 20px;
  padding: 20px;
  background: #1a1a1a;
  border: 1px solid #ffd700;
  border-radius: 5px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const EmailTitle = styled.h3`
  color: #ffd700;
  margin-bottom: 10px;
`;

const EmailAddress = styled.p`
  color: white;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: 1px;
`;

const EmailNote = styled.p`
  color: #bbb;
  font-size: 14px;
  margin-top: 10px;
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

function EmailReveal() {
  const { t, i18n } = useTranslation();
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [verificationAnswer, setVerificationAnswer] = useState("");
  const [verificationPassed, setVerificationPassed] = useState(false);
  const [status, setStatus] = useState({ message: "", isError: false });
  const [showStatus, setShowStatus] = useState(false);
  
  // Your email address (this will be revealed after verification)
  const emailAddress = "nader@stormmaze.com"; // Replace with your actual email
  
  const containerRef = useRef(null);

  useEffect(() => {
    generateMathProblem();
    
    const container = containerRef.current;
    if (container) {
      let growing = true;
      const animateGlow = () => {
        if (!container) return;
        
        const shadowIntensity = growing 
          ? "0 0 20px #ffd700, 0 0 35px rgba(255, 215, 0, 0.4)" 
          : "0 0 15px #ffd700, 0 0 25px rgba(255, 215, 0, 0.3)";
        
        container.style.boxShadow = shadowIntensity;
        growing = !growing;
      };
      
      const glowInterval = setInterval(animateGlow, 1500);
      return () => clearInterval(glowInterval);
    }
  }, []);

  const generateMathProblem = () => {
    const newNum1 = Math.floor(Math.random() * 10) + 1;
    const newNum2 = Math.floor(Math.random() * 10) + 1;
    setNum1(newNum1);
    setNum2(newNum2);
    setVerificationAnswer("");
  };

  const handleVerify = () => {
    const correctAnswer = num1 + num2;
    const userAnswer = parseInt(verificationAnswer);
    
    if (userAnswer === correctAnswer) {
      setVerificationPassed(true);
      setStatus({
        message: t('emailReveal.verificationSuccess'),
        isError: false
      });
      
      const container = containerRef.current;
      if (container) {
        container.style.boxShadow = "0 0 30px #4cd137, 0 0 50px rgba(76, 209, 55, 0.6)";
        setTimeout(() => {
          container.style.boxShadow = "0 0 15px #ffd700, 0 0 25px rgba(255, 215, 0, 0.3)";
        }, 1000);
      }
    } else {
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
        message: t('emailReveal.verificationFailed'),
        isError: true
      });
      generateMathProblem();
    }
    
    setShowStatus(true);
    setTimeout(() => setShowStatus(false), 3000);
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
  };

  return (
    <PageWrapper>
      <Container ref={containerRef}>
        <LanguageToggle onClick={toggleLanguage}>
          {t('emailReveal.languageToggle')}
        </LanguageToggle>
        
        <Title>{t('emailReveal.title')}</Title>
        
        <Description>{t('emailReveal.description')}</Description>
        
        <ImageContainer>
          <Image src="/storm_png.png" alt={t('emailReveal.imageAlt')} />
        </ImageContainer>
        
        {!verificationPassed ? (
          <>
            <VerificationContainer>
              <VerificationTitle>{t('emailReveal.verificationQuestion')}</VerificationTitle>
              <VerificationSubtext>{t('emailReveal.verificationSubtext')}</VerificationSubtext>
              
              <VerificationQuestion>
                <MathProblem>{num1} + {num2} = </MathProblem>
                <VerificationInput
                  type="number"
                  value={verificationAnswer}
                  onChange={(e) => setVerificationAnswer(e.target.value)}
                />
              </VerificationQuestion>
            </VerificationContainer>
            
            <Button onClick={handleVerify}>
              {t('emailReveal.verify')}
            </Button>
          </>
        ) : (
          <EmailContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <EmailTitle>{t('emailReveal.emailTitle')}</EmailTitle>
            <EmailAddress>{emailAddress}</EmailAddress>
            <EmailNote>{t('emailReveal.emailNote')}</EmailNote>
          </EmailContainer>
        )}
        
        {showStatus && (
          <StatusMessage isError={status.isError}>
            {status.message}
          </StatusMessage>
        )}
      </Container>
    </PageWrapper>
  );
}

export default EmailReveal;