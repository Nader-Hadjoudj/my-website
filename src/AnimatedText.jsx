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
          { x: -100, y: 50 },
          { x: 0, y: -50 },
          { x: 100, y: 50 },
          { x: 0, y: 0 }
        ],
        curviness: 1.5,
        autoRotate: false
      },
      duration: 4,
      repeat: -1,
      ease: "power1.inOut"
    });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", position: "relative", height: "200px" }}>
      <h1 ref={textRef} style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}>
        🚀 Welcome this is Stormmaze - WEBSITE IS UNDER MAINTENANCE 🚀
      </h1>
    </div>
  );
};

export default AnimatedText;
