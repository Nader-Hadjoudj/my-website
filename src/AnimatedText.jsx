import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedText = () => {
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Infinite scrolling effect for the text
    gsap.to(textRef.current, {
      xPercent: -100,
      repeat: -1,
      duration: 10,
      ease: "linear"
    });

    // Floating object animation
    const floatingObjects = document.querySelectorAll(".floating-object");
    floatingObjects.forEach((obj) => {
      gsap.to(obj, {
        y: "random(-20, 20)", 
        x: "random(-20, 20)",
        repeat: -1,
        yoyo: true,
        duration: 3,
        ease: "power1.inOut",
      });
    });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", position: "relative", overflow: "hidden" }}>
      {/* Floating Objects */}
      <div className="floating-object" style={{ position: "absolute", top: "20%", left: "10%", fontSize: "2rem" }}>✨</div>
      <div className="floating-object" style={{ position: "absolute", top: "50%", right: "15%", fontSize: "2rem" }}>🚀</div>
      <div className="floating-object" style={{ position: "absolute", bottom: "10%", left: "40%", fontSize: "2rem" }}>🌟</div>

      {/* Infinite Scrolling Text */}
      <div ref={containerRef} style={{ width: "100%", overflow: "hidden", whiteSpace: "nowrap" }}>
        <h1 ref={textRef} style={{ display: "inline-block", fontSize: "2rem", fontWeight: "bold" }}>
          🚀 Welcome this is stormmaze - WEBSITE IS UNDER MAINTENANCE 🚀 Welcome this is stormmaze - WEBSITE IS UNDER MAINTENANCE 🚀
        </h1>
      </div>
    </div>
  );
};

export default AnimatedText;
