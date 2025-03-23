import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

// Styled Components
const PageWrapper = styled.div`
  min-height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 500px;
  background: #111;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  text-align: center;
  position: relative;
`;

const Title = styled.h2`
  color: #ffd700;
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: #ccc;
  font-size: 14px;
  margin-bottom: 15px;
`;

const Logo = styled.img`
  width: 120px;
  margin: 0 auto 20px;
  display: block;
`;

const VerificationInput = styled.input`
  width: 70px;
  padding: 8px;
  text-align: center;
  border: 1px solid #ffd700;
  border-radius: 5px;
  background: #000;
  color: #fff;
  margin-left: 10px;
`;

const Button = styled.button`
  margin-top: 15px;
  padding: 10px;
  width: 100%;
  background: #ffd700;
  border: none;
  border-radius: 5px;
  color: #000;
  cursor: pointer;
  &:disabled {
    background: #555;
    cursor: not-allowed;
  }
`;

const EmailContainer = styled(motion.div)`
  background: #222;
  padding: 15px;
  border-radius: 5px;
  margin-top: 15px;
`;

const StatusMessage = styled.div`
  margin-top: 10px;
  color: ${({ isError }) => (isError ? "#ff4757" : "#4cd137")};
`;

function EmailReveal() {
  const { t, i18n } = useTranslation();
  const [num1, setNum1] = useState(Math.ceil(Math.random() * 10));
  const [num2, setNum2] = useState(Math.ceil(Math.random() * 10));
  const [userAnswer, setUserAnswer] = useState("");
  const [verified, setVerified] = useState(false);
  const [status, setStatus] = useState(null);

  const emailAddress = "nader@stormmaze.com";

  const handleVerify = () => {
    if (parseInt(userAnswer) === num1 + num2) {
      setVerified(true);
      setStatus({ message: t('emailReveal.verificationSuccess'), isError: false });
    } else {
      setStatus({ message: t('emailReveal.verificationFailed'), isError: true });
      setNum1(Math.ceil(Math.random() * 10));
      setNum2(Math.ceil(Math.random() * 10));
      setUserAnswer("");
    }
  };

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
  };

  return (
    <PageWrapper>
      <Container>
        <button style={{position:"absolute",top:10,right:10}} onClick={toggleLanguage}>
          {i18n.language === "en" ? "FR" : "EN"}
        </button>
        <Logo src="/storm_png.png" alt="Logo" />
        <Title>{t('emailReveal.title')}</Title>
        <Description>{t('emailReveal.description')}</Description>

        {!verified ? (
          <>
            <div>
              <span style={{ color: "#fff" }}>{num1} + {num2} =</span>
              <VerificationInput
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              />
            </div>
            <Button onClick={handleVerify}>
              {t('emailReveal.verify')}
            </Button>
          </>
        ) : (
          <EmailContainer initial={{opacity:0}} animate={{opacity:1}}>
            <p style={{ color: "#ffd700" }}>{emailAddress}</p>
          </EmailContainer>
        )}

        {status && <StatusMessage isError={status.isError}>{status.message}</StatusMessage>}
      </Container>
    </PageWrapper>
  );
}

export default EmailReveal;
