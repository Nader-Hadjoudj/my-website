import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import { useTranslation } from "react-i18next";

const HeroSection = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 90%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 5rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: transparent;
  background: linear-gradient(45deg, #ffd700, #ffcc00, #ffd700, #ffea00);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 2px 2px 8px rgba(255, 215, 0, 0.3);
  opacity: 0;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.h2`
  font-size: clamp(1rem, 3vw, 2rem);
  font-weight: 600;
  color: #ffea00;
  margin-bottom: 2rem;
  opacity: 0;
  
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
  }
`;

const DownloadButton = styled.a`
  padding: clamp(0.7rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2.5rem);
  font-size: clamp(0.9rem, 2vw, 1.2rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #000;
  background: linear-gradient(45deg, #ffd700, #ffcc00);
  border: 2px solid #ffd700;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
  display: inline-block;
  white-space: nowrap;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 7px 20px rgba(255, 215, 0, 0.5);
    background: linear-gradient(45deg, #ffcc00, #ffd700);
  }
  
  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 10px rgba(255, 215, 0, 0.3);
  }
`;

const FarmingHeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);
  const { t } = useTranslation();
  
  useEffect(() => {
    const title = titleRef.current;
    
    const split = Splitting({ target: title, by: "chars" });

    gsap.fromTo(
      split[0].chars,
      { opacity: 0, y: 100, rotationX: -90 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power4.out",
        onComplete: () => {
          gsap.to(split[0].chars, {
            textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            stagger: { each: 0.1, from: "random" },
          });
        },
      }
    );

    gsap.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 1.5,
        ease: "back.out",
      }
    );
    
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 2,
        ease: "back.out(1.7)",
      }
    );

    // Fonction de nettoyage
    return () => {
      if (split && split[0]) {
        Splitting.revert(title);
      }
    };
  }, []);

  return (
    <HeroSection id="FarmingHeroSection">
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/videos/farming-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Overlay />
      <Content>
        <Title ref={titleRef}>{t('home.video')}</Title>
        <Subtitle ref={subtitleRef}>{t('home.subVideo')}</Subtitle>
        <DownloadButton 
          href="files/catalogue.pdf" 
          download="AgroFrancais_Catalogue.pdf" 
          ref={buttonRef}
        >
          {t('home.button')}
        </DownloadButton>
      </Content>
    </HeroSection>
  );
};

export default FarmingHeroSection; 