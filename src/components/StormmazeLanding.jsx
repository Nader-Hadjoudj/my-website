import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingSection = styled.section`
  position: relative;
  background-color: #000000;
  min-height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 6rem 0 0 0;
  box-sizing: border-box;
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 992px) {
    flex-direction: column;
    padding: 0 1.5rem;
  }
`;

const ContentColumn = styled.div`
  flex: 1;
  max-width: 600px;
  
  @media (max-width: 992px) {
    max-width: 100%;
    margin-bottom: 2rem;
  }
`;

const MainHeading = styled(motion.h1)`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #ffd700, #ffcc00, #ffd700, #ffea00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0px 2px 4px rgba(255, 215, 0, 0.3);
  line-height: 1.2;
`;

const Subheading = styled(motion.h2)`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  font-weight: 500;
  color: #e0e0e0;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const HighlightText = styled.span`
  color: #ffd700;
  font-weight: 600;
`;

const CTAButton = styled(motion.a)`
  display: inline-block;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #000;
  background: linear-gradient(45deg, #ffd700, #ffcc00);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(255, 215, 0, 0.5);
  }
`;

const SecondaryButton = styled(motion.a)`
  display: inline-block;
  margin-left: 1rem;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #ffd700;
  background: transparent;
  border: 2px solid #ffd700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  
  &:hover {
    background: rgba(255, 215, 0, 0.1);
    transform: translateY(-3px);
  }
  
  @media (max-width: 768px) {
    margin-left: 0;
    margin-top: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ImageColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const HeroImage = styled(motion.img)`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), transparent);
  border-radius: 10px;
`;

const StatsSection = styled.div`
  width: 100%;
  background-color: rgba(255, 215, 0, 0.05);
  padding: 4rem 2rem;
`;

const StatsContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background-color: #0a0a0a;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.1);
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffd700;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #a0a0a0;
`;

const FeaturesSection = styled.div`
  width: 100%;
  padding: 6rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  color: #ffd700;
  text-align: center;
  margin-bottom: 4rem;
  font-weight: bold;

  &:after {
    content: "";
    display: block;
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #fff700, #ffd700);
    margin: 1rem auto 0;
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const FeatureCard = styled(motion.div)`
  background-color: #0a0a0a;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 215, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.4);
    border-color: rgba(255, 215, 0, 0.3);
  }
`;

const FeatureIcon = styled.div`
  width: 60px;
  height: 60px;
  background-color: rgba(255, 215, 0, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  svg {
    width: 30px;
    height: 30px;
    color: #ffd700;
  }
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffd700;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #e0e0e0;
  line-height: 1.6;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100,
      damping: 15,
    },
  },
};

const StormmazeLanding = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subheadingRef = useRef(null);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    // Heading animation
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    }

    // Subheading animation
    if (subheadingRef.current) {
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: 0.3,
          ease: "power3.out",
        }
      );
    }

    // Stats animation
    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(".stat-card", {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        once: true,
      });
    }

    // Features animation
    if (featuresRef.current) {
      ScrollTrigger.create({
        trigger: featuresRef.current,
        start: "top 75%",
        onEnter: () => {
          gsap.to(".feature-card", {
            opacity: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.8,
            ease: "power2.out",
          });
        },
        once: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <LandingSection ref={sectionRef}>
      <HeroContainer>
        <ContentColumn>
          <MainHeading 
            ref={headingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            {t('landing.title', 'Premium Agricultural Imports from Algeria to France')}
          </MainHeading>
          <Subheading
            ref={subheadingRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {t('landing.subhead', 'Stormmaze delivers high-quality, sustainable agricultural products connecting Algerian farmers to French markets with excellence and integrity.')}
          </Subheading>
          <ButtonContainer>
            <CTAButton
              href="/catalogue"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('landing.viewCatalogue', 'View Catalogue')}
            </CTAButton>
            <SecondaryButton
              href="/contact"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t('landing.contactUs', 'Contact Us')}
            </SecondaryButton>
          </ButtonContainer>
        </ContentColumn>
        <ImageColumn>
          <HeroImage 
            src="/storm.png" 
            alt="Premium agricultural products from Algeria"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          />
          <ImageOverlay />
        </ImageColumn>
      </HeroContainer>
    </LandingSection>
  );
};

export default StormmazeLanding;