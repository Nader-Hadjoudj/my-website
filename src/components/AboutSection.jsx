import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AboutSection.css"; // We'll define styles below

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", // Start animation when section is 80% in view
        toggleActions: "play none none reset",
      },
    });

    tl.from(titleRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    }).from(
      textRefs.current,
      {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2, // Stagger each paragraph slightly
        ease: "power2.out",
      },
      "-=0.5" // Overlap with title animation
    );
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <h2 ref={titleRef} className="about-title">
        About Stormmaze
      </h2>
      <div className="about-content">
        <p ref={(el) => (textRefs.current[0] = el)}>
          At Stormmaze, we are passionate about connecting the world’s finest
          agricultural products with the vibrant markets of France. Specializing
          in <span className="highlight">premium imports from Algeria</span> and
          beyond, we pride ourselves on delivering quality, authenticity, and
          sustainability to every table.
        </p>
        <p ref={(el) => (textRefs.current[1] = el)}>
          Our deep-rooted relationships with trusted growers and suppliers
          allow us to bring exceptional produce to our customers, blending
          tradition with innovation. With a commitment to excellence, Stormmaze
          is dedicated to fostering a seamless bridge between global agriculture
          and <span className="highlight">French cuisine</span>.
        </p>
        <p ref={(el) => (textRefs.current[2] = el)}>
          We are driven by a vision to expand horizons, sourcing unique and
          high-quality products from diverse regions to meet the evolving tastes
          of our clients. Stormmaze isn’t just about products; it’s about
          building connections, celebrating flavors, and contributing to a
          thriving agricultural ecosystem.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;