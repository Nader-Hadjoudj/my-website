import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #000;
  text-align: center;
  overflow: hidden;
`;

const Text = styled.div`
  font-size: ${({ size }) => size || "2rem"};
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  font-family: Arial, sans-serif;
  color: #ffd700;
  padding: 10px;
  text-shadow: 
    0 0 5px rgba(255, 223, 100, 0.8),
    0 0 10px rgba(255, 223, 100, 0.6),
    0 0 15px rgba(200, 150, 50, 0.5);
`;

const Separator = styled.div`
  width: 60%;
  height: 2px;
  background-color: #ffd700;
  margin: 15px 0;
`;

const AnimatedText = () => {
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);

  useEffect(() => {
    if (!textRef1.current || !textRef2.current) return;

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
  }, []);

  return (
    <Container>
      <Text ref={textRef1} size="3rem" bold>
      We are committed to providing the best services for our clients.
      Our team is dedicated to ensuring a smooth and seamless experience for all your needs.
      </Text>
      <Separator />
      <Text ref={textRef2} size="1.5rem">
        Website is under maintenance
      </Text>
    </Container>
  );
};

export default AnimatedText;
