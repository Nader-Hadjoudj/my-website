import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import CountUp from "react-countup";
import { FaLeaf, FaShippingFast, FaGlobeEurope, FaSeedling } from "react-icons/fa";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LandingSection = styled.section`
  background-color: #0a0a0a;
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.7) 100%);
  z-index: 1;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/agriculture-bg.jpg');
  background-size: cover;
  background-position: center;
  filter: grayscale(30%);
  z-index: 0;
`;

const ContentContainer = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 6rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const HeroContent = styled.div`
  text-align: center;
  max-width: 900px;
  margin-bottom: 4rem;
`;

const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  background: linear-gradient(45deg, #ffd700, #ffcc00, #ffd700, #ffea00);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 2px 2px 10px rgba(255, 215, 0, 0.3);
  opacity: 0;
  transform: translateY(30px);
`;

const Subtitle = styled.h2`
  font-size: clamp(1.2rem, 3vw, 2rem);
  font-weight: 500;
  color: #e0e0e0;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.5;
  opacity: 0;
  transform: translateY(30px);
`;

const Highlight = styled.span`
  color: #ffd700;
  font-weight: 600;
`;

const ActionButton = styled.a`
  padding: clamp(0.8rem, 2vw, 1.2rem) clamp(2rem, 4vw, 3rem);
  font-size: clamp(1rem, 2vw, 1.3rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #000;
  background: linear-gradient(45deg, #ffd700, #ffcc00);
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  display: inline-block;
  opacity: 0;
  transform: translateY(30px);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(255, 215, 0, 0.5);
    filter: brightness(110%);
  }
  
  &:active {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 215, 0, 0.4);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const StatCard = styled(motion.div)`
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    border-color: rgba(255, 215, 0, 0.6);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 215, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const StatIcon = styled.div`
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 1rem;
`;

const StatValue = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #b0b0b0;
`;

const FeaturesSection = styled.div`
  width: 100%;
  margin-top: 6rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #ffd700;
  text-align: center;
  margin-bottom: 4rem;
  
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
  background: rgba(20, 20, 20, 0.8);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  padding: 2rem;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    border-color: rgba(255, 215, 0, 0.6);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3), 0 0 15px rgba(255, 215, 0, 0.2);
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: #ffd700;
  margin-bottom: 1.5rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #b0b0b0;
  line-height: 1.6;
`;

const LandingFooter = styled.div`
  margin-top: 4rem;
  text-align: center;
`;

const FooterText = styled.p`
  color: #a0a0a0;
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;

const FooterLink = styled.a`
  color: #ffd700;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #ffea00;
    text-decoration: underline;
  }
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

const AgricultureImportLanding = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (titleRef.current && subtitleRef.current && buttonRef.current) {
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
      });

      gsap.to(subtitleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
      });

      gsap.to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.6,
        ease: "power3.out",
      });
    }

    if (statsRef.current) {
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        toggleClass: { targets: statsRef.current, className: "visible" },
        once: true
      });
    }
  }, []);

  return (
    <LandingSection ref={sectionRef} id="agriculture-landing">
      <BackgroundImage />
      <BackgroundOverlay />
      <ContentContainer>
        <HeroContent>
          <Title ref={titleRef}>{t('landing.title')}</Title>
          <Subtitle ref={subtitleRef}>
            {t('landing.subtitle.part1')} <Highlight>{t('landing.subtitle.highlight1')}</Highlight> {t('landing.subtitle.part2')} <Highlight>{t('landing.subtitle.highlight2')}</Highlight> {t('landing.subtitle.part3')}
          </Subtitle>
          <ActionButton href="/catalogue" ref={buttonRef}>
            {t('landing.cta')}
          </ActionButton>
        </HeroContent>

        <StatsContainer ref={statsRef}>
          <StatCard 
            variants={cardVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 0.1 }}
          >
            <StatIcon>
              <FaLeaf />
            </StatIcon>
            <StatValue>
              <CountUp end={20} duration={2.5} suffix="+" />
            </StatValue>
            <StatLabel>{t('landing.stats.products')}</StatLabel>
          </StatCard>
          
          <StatCard 
            variants={cardVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 0.3 }}
          >
            <StatIcon>
              <FaGlobeEurope />
            </StatIcon>
            <StatValue>
              <CountUp end={15} duration={2.5} suffix="+" />
            </StatValue>
            <StatLabel>{t('landing.stats.countries')}</StatLabel>
          </StatCard>
          
          <StatCard 
            variants={cardVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 0.5 }}
          >
            <StatIcon>
              <FaShippingFast />
            </StatIcon>
            <StatValue>
              <CountUp end={1000} duration={2.5} suffix="+" />
            </StatValue>
            <StatLabel>{t('landing.stats.shipments')}</StatLabel>
          </StatCard>
          
          <StatCard 
            variants={cardVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            transition={{ delay: 0.7 }}
          >
            <StatIcon>
              <FaSeedling />
            </StatIcon>
            <StatValue>
              <CountUp end={8} duration={2.5} />
            </StatValue>
            <StatLabel>{t('landing.stats.years')}</StatLabel>
          </StatCard>
        </StatsContainer>

        <FeaturesSection>
          <SectionTitle>{t('landing.features.title')}</SectionTitle>
          <FeaturesGrid>
            <FeatureCard 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.1 }}
            >
              <FeatureIcon>
                <FaSeedling />
              </FeatureIcon>
              <FeatureTitle>{t('landing.features.quality.title')}</FeatureTitle>
              <FeatureDescription>{t('landing.features.quality.description')}</FeatureDescription>
            </FeatureCard>
            
            <FeatureCard 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.3 }}
            >
              <FeatureIcon>
                <FaShippingFast />
              </FeatureIcon>
              <FeatureTitle>{t('landing.features.logistics.title')}</FeatureTitle>
              <FeatureDescription>{t('landing.features.logistics.description')}</FeatureDescription>
            </FeatureCard>
            
            <FeatureCard 
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: 0.5 }}
            >
              <FeatureIcon>
                <FaGlobeEurope />
              </FeatureIcon>
              <FeatureTitle>{t('landing.features.global.title')}</FeatureTitle>
              <FeatureDescription>{t('landing.features.global.description')}</FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </FeaturesSection>

        <LandingFooter>
          <FooterText>
            {t('landing.footer.text')}
          </FooterText>
          <FooterLink href="/contact">
            {t('landing.footer.contact')}
          </FooterLink>
        </LandingFooter>
      </ContentContainer>
    </LandingSection>
  );
};

export default AgricultureImportLanding;