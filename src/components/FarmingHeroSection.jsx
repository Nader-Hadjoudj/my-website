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

// Rest of your styled components remain the same...

const FarmingHeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    // Animation logic remains the same...
  }, []);

  return (
    <HeroSection id="FarmingHeroSection">
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/videos/farming-background.mp4" type="video/mp4" />
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
          Télécharger Notre Catalogue
        </DownloadButton>
      </Content>
    </HeroSection>
  );
};

export default FarmingHeroSection;