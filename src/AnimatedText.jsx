import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedText = () => {
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    if (!textRef1.current || !textRef2.current) return;

    const animationSettings = {
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    };

    gsap.to([textRef1.current, textRef2.current], animationSettings);

    gsap.to([textRef1.current, textRef2.current], {
      textShadow: `
        0 0 10px rgba(255, 223, 100, 0.8), 
        0 0 20px rgba(255, 223, 100, 0.6), 
        0 0 30px rgba(200, 150, 50, 0.5)
      `,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut"
    });
  }, []);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000", // Full black background
    textAlign: "center",
    overflow: "hidden"
  };

  const textStyle1 = {
    fontSize: "3rem", // Larger first text
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    color: "#FFD700",
    textAlign: "center",
    padding: "10px",
    textShadow: `
      0 0 5px rgba(255, 223, 100, 0.8), 
      0 0 10px rgba(255, 223, 100, 0.6), 
      0 0 15px rgba(200, 150, 50, 0.5)
    `
  };

  const textStyle2 = {
    fontSize: "1.5rem", // Smaller second text
    fontWeight: "normal",
    fontFamily: "Arial, sans-serif",
    color: "#FFD700",
    textAlign: "center",
    padding: "10px",
    textShadow: `
      0 0 5px rgba(255, 223, 100, 0.8), 
      0 0 10px rgba(255, 223, 100, 0.6), 
      0 0 15px rgba(200, 150, 50, 0.5)
    `
  };

  const separatorStyle = {
    width: "60%",
    height: "2px",
    backgroundColor: "#FFD700", // Gold separator
    margin: "15px 0"
  };

  return (
    <div style={containerStyle}>
      <div ref={textRef1} style={textStyle1}>
        you are at stormmaze
      </div>
      <div style={separatorStyle}></div>
      <div ref={textRef2} style={textStyle2}>
        website is under maintenance
      </div>
    </div>
  );
};

export default AnimatedText;
