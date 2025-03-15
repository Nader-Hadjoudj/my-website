import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

const AnimatedText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      motionPath: {
        path: [
          { x: -100, y: 50 },  // Left loop
          { x: 0, y: -50 },    // Middle top
          { x: 100, y: 50 },   // Right loop
          { x: 0, y: 0 }       // Back to center
        ],
        curviness: 1.5,
        autoRotate: false
      },
      duration: 6, // Adjust speed
      repeat: -1,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", position: "relative", height: "200px", overflow: "hidden" }}>
      <div ref={textRef} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", whiteSpace: "nowrap", fontSize: "2rem", fontWeight: "bold" }}>
        🚀 Welcome this is Stormmaze - WEBSITE IS UNDER MAINTENANCE 🚀 Welcome this is Stormmaze - WEBSITE IS UNDER MAINTENANCE 🚀
      </div>
    </div>
  );
};

export default AnimatedText;
