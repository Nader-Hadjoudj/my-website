import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Register the SplitText plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
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
  opacity: 0;
`;

const FarmingHeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Animation for the title
    const title = titleRef.current;
    let splitTitle;
    
    if (title && typeof SplitText !== "undefined") {
      splitTitle = new SplitText(title, { type: "chars, words" });
      
      gsap.fromTo(
        splitTitle.chars,
        { 
          opacity: 0,
          y: 100,
          rotationX: -90,
        },
        { 
          opacity: 1,
          y: 0,
          rotationX: 0,
          stagger: 0.05,
          duration: 1,
          ease: "power4.out",
          onComplete: () => {
            // Add a shimmering effect
            gsap.to(splitTitle.chars, {
              textShadow: "0 0 20px rgba(255, 215, 0, 0.8)",
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              stagger: {
                each: 0.1,
                from: "random",
              }
            });
          }
        }
      );
    } else {
      gsap.to(title, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out"
      });
    }

    // Animation for the subtitle
    gsap.fromTo(
      subtitleRef.current,
      { 
        opacity: 0,
        y: 30 
      },
      { 
        opacity: 1,
        y: 0,
        duration: 1.5,
        delay: 1.5,
        ease: "back.out" 
      }
    );

    return () => {
      // Cleanup if needed
      if (splitTitle) {
        splitTitle.revert();
      }
    };
  }, []);

  return (
    <HeroSection>
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/videos/farming-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </VideoBackground>
      <Overlay />
      <Content>
        <Title ref={titleRef}>STORMMAZE</Title>
        <Subtitle ref={subtitleRef}>The Best Import Export Vegetable Company Ever</Subtitle>
      </Content>
    </HeroSection>
  );
};

export default FarmingHeroSection;