import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import { useTranslation } from "react-i18next";

const LandingSection = styled.section`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-color: #000000; /* Black primary color */
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  box-sizing: border-box;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.3));
  z-index: 1;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 1200px;
  padding: 2rem;
`;

const MainTitle = styled(motion.h1)`
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  color: #ffd700; /* Gold secondary color */
  background: linear-gradient(45deg, #ffd700, #ffea00, #ffd700);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 0 0 15px rgba(255, 215, 0, 0.5);
  margin-bottom: 1.5rem;
`;

const SubTitle = styled(motion.p)`
  font-size: clamp(1rem, 2.5vw, 1.5rem);
  color: #e0e0e0;
  font-weight: 400;
  margin-bottom: 2.5rem;
  max-width: 800px;
  line-height: 1.6;
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(2rem, 3vw, 3rem);
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 600;
  text-transform: uppercase;
  color: #000000;
  background: linear-gradient(45deg, #ffd700, #ffcc00);
  border: 2px solid #ffd700;
  border-radius: 50px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.6);
    background: linear-gradient(45deg, #ffcc00, #ffd700);
  }
`;

const titleVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "power4.out" } },
};

const subTitleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, delay: 0.5, ease: "easeOut" } },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 1, ease: "back.out" } },
  hover: { scale: 1.05 },
};

const StormmazeLanding = () => {
  const titleRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (titleRef.current) {
      const split = Splitting({ target: titleRef.current, by: "chars" });
      gsap.fromTo(
        split[0].chars,
        { opacity: 0, y: 50, rotationX: -90 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.05,
          duration: 1.2,
          ease: "power4.out",
        }
      );
    }
  }, []);

  return (
    <LandingSection>
      <BackgroundOverlay />
      <ContentWrapper>
        <MainTitle
          ref={titleRef}
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          {t("landing.title")}
        </MainTitle>
        <SubTitle initial="hidden" animate="visible" variants={subTitleVariants}>
          {t("landing.subtitle")}
        </SubTitle>
        <CTAButton
          href="/catalogue"
          initial="hidden"
          animate="visible"
          whileHover="hover"
          variants={buttonVariants}
        >
          {t("landing.cta")}
        </CTAButton>
      </ContentWrapper>
    </LandingSection>
  );
};

export default StormmazeLanding;