import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const LandingSection = styled.section`
  width: 100vw;
  height: 100vh;
  background: #000;
  color: #ffd700;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  text-align: center;
  z-index: 10;
`;

const Title = styled(motion.h1)`
  font-size: clamp(2rem, 5vw, 5rem);
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #ffd700, #ffcc00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Subtitle = styled(motion.h2)`
  font-size: clamp(1.2rem, 3vw, 2rem);
  color: #ffffff;
  margin-bottom: 2rem;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 2rem;
  font-weight: bold;
  color: #000;
  background: #ffd700;
  border-radius: 25px;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(255, 215, 0, 0.4);
  cursor: pointer;

  &:hover {
    background: #ffea00;
  }
`;

const BackgroundPattern = styled.div`
  position: absolute;
  width: 120%;
  height: 120%;
  top: -10%;
  left: -10%;
  background-image: radial-gradient(rgba(255, 215, 0, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
  opacity: 0.2;
`;

const StormmazeLanding = () => {
  const { t } = useTranslation();

  return (
    <LandingSection id="StormmazeLanding">
      <BackgroundPattern />
      <Content>
        <Title initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          {t("landing.welcomeTitle")}
        </Title>
        <Subtitle initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
          {t("landing.welcomeSubtitle")}
        </Subtitle>
        <CTAButton
          href="/catalogue"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8 }}
        >
          {t("landing.cta")} <FiArrowRight />
        </CTAButton>
      </Content>
    </LandingSection>
  );
};

export default StormmazeLanding;
