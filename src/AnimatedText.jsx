import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const AnimatedText = () => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
    );
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1 ref={textRef}>🚀 Welcome this is stormmaze</h1>
      <h1 ref={textRef}>WEBSITE IS UNDER MAINTNANCE</h1>
    </div>
  );
};

export default AnimatedText;
