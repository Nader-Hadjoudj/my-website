import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.to(textRef.current, {
      opacity: 0.3,        // Fade to 30% opacity
      duration: 1,         // Speed of fade
      repeat: -1,          // Infinite loop
      yoyo: true,          // Fade in after fading out
      ease: "power1.inOut" // Smooth transition
    });
  }, []);

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",  // Full screen height
    background: "radial-gradient(circle, rgba(0,0,0,0.8) 30%, rgba(0,0,0,1) 80%)",
    textAlign: "center"
  };

  const textStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#0ff", // Neon cyan color
    textShadow: `
      0 0 5px #0ff, 
      0 0 10px #0ff, 
      0 0 15px #0ff, 
      0 0 20px #08f, 
      0 0 30px #08f, 
      0 0 40px #08f
    `,
    whiteSpace: "nowrap"
  };

  return (
    <div style={containerStyle}>
      <div ref={textRef} style={textStyle}>
        🚀 Welcome to Stormmaze - WEBSITE IS UNDER MAINTENANCE 🚀
      </div>
    </div>
  );
};

export default AnimatedText;
