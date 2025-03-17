import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

// Register the SplitText plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText);
}

// This container is absolutely positioned within its parent
const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 1;
`;

// Make sure the video is properly contained and doesn't break the layout
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
  background: rgba(0, 0, 0, 0.6); /* Darker overlay for better text visibility */
  z-index: 2;
`;

const Content = styled.div`
  position: relative;
  z-index: 3;
  text-align: center;
  max-width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem); /* Responsive font size */
  font-weight: 800;
  margin-bottom: 2rem;
  color: transparent;
  background: linear-gradient(45deg, #ffd700, #ffcc00, #ffd700, #ffea00);
  -webkit-background-clip: text;
  background-clip: text;
  text-shadow: 2px 2px 8px rgba(255, 215, 0, 0.3);
  opacity: 0;
  line-height: 1.2;
`;

const Subtitle = styled.h2`
  font-size: clamp(1.5rem, 4vw, 2.5rem); /* Responsive font size */
  font-weight: 600;
  color: #ffea00;
  opacity: 0;
  max-width: 800px;
  line-height: 1.4;
`;

// Add this new component that will be a wrapper around your entire app
const PageContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// This makes sure elements after the video appear properly
const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
`;

const FarmingHeroSection = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Add error handling for the video loading
    if (videoRef.current) {
      videoRef.current.addEventListener('error', (e) => {
        console.error('Video error:', e);
        // Add a background color as fallback if video fails to load
        videoRef.current.parentElement.style.backgroundColor = '#000000';
      });
    }

    // Animation for the title
    const title = titleRef.current;
    let splitTitle;
    
    if (title && typeof SplitText !== "undefined") {
      try {
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
      } catch (error) {
        console.error("SplitText error:", error);
        // Fallback animation if SplitText fails
        gsap.to(title, {
          opacity: 1,
          duration: 1.5,
          ease: "power2.out"
        });
      }
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
      // Cleanup
      if (splitTitle) {
        try {
          splitTitle.revert();
        } catch (error) {
          console.error("SplitText revert error:", error);
        }
      }
      
      if (videoRef.current) {
        videoRef.current.removeEventListener('error', () => {});
      }
    };
  }, []);

  return (
    <HeroSection>
      <VideoBackground 
        ref={videoRef}
        autoPlay 
        muted 
        loop 
        playsInline
        preload="auto"
      >
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

// Export a wrapper component that includes your video hero and provides proper structure
const AppWithVideoBackground = ({ children }) => {
  return (
    <PageContainer>
      <FarmingHeroSection />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </PageContainer>
  );
};

export { FarmingHeroSection, AppWithVideoBackground };
export default AppWithVideoBackground;