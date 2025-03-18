import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100vw;
  background-color: #000;
  text-align: center;
  overflow: hidden;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
  
  /* Fix for mobile viewport inconsistencies */
  @media (max-width: 768px) {
    min-height: 100vh;
    /* Fix for iOS Safari */
    min-height: -webkit-fill-available;
    height: auto;
    margin: 0;
    padding: 5vw;
    overflow-x: hidden;
  }
`;

const Text = styled.div`
  font-size: ${({ size, mobileSize }) => {
    if (mobileSize) {
      return `clamp(${mobileSize}, 5vw, ${size})`;
    }
    return `clamp(1rem, 5vw, ${size})`;
  }};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  font-family: Arial, sans-serif;
  color: #ffd700;
  padding: 10px;
  text-shadow: 
    0 0 5px rgba(255, 223, 100, 0.8),
    0 0 10px rgba(255, 223, 100, 0.6),
    0 0 15px rgba(200, 150, 50, 0.5);
  max-width: 100%;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const Separator = styled.div`
  width: 80%;
  max-width: 300px;
  height: 2px;
  background-color: #ffd700;
  margin: 15px 0;
  
  @media (max-width: 768px) {
    margin: 12px 0;
    width: 90%;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactText = () => {
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!textRef1.current || !textRef2.current) return;

    // Animation for the text elements
    gsap.to([textRef1.current, textRef2.current], {
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    gsap.to([textRef1.current, textRef2.current], {
      textShadow: `
        0 0 10px rgba(255, 223, 100, 0.8), 
        0 0 20px rgba(255, 223, 100, 0.6), 
        0 0 30px rgba(200, 150, 50, 0.5)
      `,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
    
    // Fix for ensuring the container takes full width but doesn't cause overflow
    if (containerRef.current) {
      const updateContainerSize = () => {
        const windowWidth = window.innerWidth;
        containerRef.current.style.width = `100%`;
        // Ensure no horizontal scrolling
        document.body.style.overflowX = 'hidden';
      };
      
      // Initial call and event listener
      updateContainerSize();
      window.addEventListener('resize', updateContainerSize);
      
      // Cleanup
      return () => window.removeEventListener('resize', updateContainerSize);
    }
  }, []);

  return (
    <Container ref={containerRef}>
      <ContentWrapper>
        <Text ref={textRef1} size="3rem" mobileSize="1.8rem" bold>
          You are visiting stormmaze
        </Text>
        <Separator />
        <Text ref={textRef2} size="1.5rem" mobileSize="1rem">
          Website is under maintenance
        </Text>
      </ContentWrapper>
    </Container>
  );
};

export default ContactText;