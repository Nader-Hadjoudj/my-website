import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";

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
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 2rem;
  color: transparent;
  background: linear-gradient(45deg, #ffd700, #ffcc00, #ffd700, #ffea00);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 2px 2px 8px rgba(255, 215, 0, 0.3);
  opacity: 0;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  color: #ffea00;
  margin-bottom: 3rem;
  opacity: 0;
`;

// Luxurious square button design
const DownloadButton = styled.a`
  position: relative;
  display: inline-block;
  width: 260px;
  height: 260px;
  background-color: #000;
  color: #ffd700;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-decoration: none;
  text-align: center;
  opacity: 0;
  margin-bottom: 40px;
  
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    transition: all 0.4s ease;
  }
  
  &::before {
    background-color: #ffd700;
    transform: scale(0.95);
  }
  
  &::after {
    background-color: #000;
    transform: scale(0.9);
  }
  
  &:hover::before {
    transform: scale(1);
  }
  
  &:hover::after {
    transform: scale(0.95);
  }
  
  &:hover .btn-text {
    background-position: right center;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ButtonInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const ButtonText = styled.span`
  display: block;
  background: linear-gradient(to right, #ffd700, #ffcc00, #ffd700);
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  transition: all 0.5s ease;
  margin-bottom: 10px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const ButtonBorder = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid #ffd700;
  pointer-events: none;
`;

const ButtonIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 15px;
  color: #ffd700;
`;

const AboutUsVideo = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

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

    return () => {
      Splitting.revert(title);
    };
  }, []);

  return (
    <HeroSection id="FarmingHeroSection">
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/videos/orange.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Overlay />
      <Content>
        <Title ref={titleRef}>AGROFRANÇAIS</Title>
        <Subtitle ref={subtitleRef}>
          Importation de Produits Agricoles Premium
        </Subtitle>
        <DownloadButton 
          href="files/catalogue.pdf" 
          download="AgroFrancais_Catalogue.pdf" 
          ref={buttonRef}
        >
          <ButtonInner>
            <ButtonIcon>↓</ButtonIcon>
            <ButtonText className="btn-text">Télécharger</ButtonText>
            <ButtonText className="btn-text">Notre Catalogue</ButtonText>
            <ButtonBorder />
          </ButtonInner>
        </DownloadButton>
      </Content>
    </HeroSection>
  );
};

export default AboutUsVideo;