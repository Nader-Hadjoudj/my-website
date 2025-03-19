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

// Square button that matches the site's existing aesthetic
const DownloadButton = styled.a`
  display: inline-block;
  position: relative;
  width: 220px;
  height: 220px;
  background-color: #000000;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #ffd700;
  text-decoration: none;
  opacity: 0;
  overflow: hidden;
  transition: all 0.4s ease;
  
  // Golden border
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 2px solid #ffd700;
    opacity: 0.8;
    z-index: 1;
  }
  
  // Inner content wrapper
  &:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 10px;
    border: 1px solid #ffd700;
    opacity: 0.5;
    z-index: 1;
    transition: all 0.3s ease;
  }
  
  &:hover {
    background-color: #0a0a0a;
    box-shadow: 0 0 30px 5px rgba(255, 215, 0, 0.2);
  }
  
  &:hover:after {
    top: 12px;
    left: 12px;
    right: 12px;
    bottom: 12px;
    opacity: 0.8;
  }
  
  &:hover .button-content {
    transform: translateY(-5px);
  }
  
  &:hover .button-icon {
    transform: translateY(-2px);
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ButtonContent = styled.div`
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
  z-index: 2;
  transition: transform 0.3s ease;
`;

const ButtonIcon = styled.div`
  margin-bottom: 15px;
  font-size: 2.5rem;
  color: #ffd700;
  transition: transform 0.3s ease;
`;

const ButtonText = styled.div`
  text-align: center;
  line-height: 1.6;
`;

const ButtonShine = styled.div`
  position: absolute;
  top: 0;
  left: -150%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(255, 215, 0, 0) 0%,
    rgba(255, 215, 0, 0.2) 50%,
    rgba(255, 215, 0, 0) 100%
  );
  transform: skewX(-20deg);
  transition: all 0.7s ease;
  z-index: 0;
  
  ${DownloadButton}:hover & {
    left: 150%;
  }
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
          <ButtonShine />
          <ButtonContent className="button-content">
            <ButtonIcon className="button-icon">↓</ButtonIcon>
            <ButtonText>
              Télécharger<br />Notre Catalogue
            </ButtonText>
          </ButtonContent>
        </DownloadButton>
      </Content>
    </HeroSection>
  );
};

export default AboutUsVideo;