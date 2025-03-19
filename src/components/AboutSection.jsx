import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslation } from "react-i18next";
import "./AboutSection.css";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%", 
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
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.5"
    );
  }, []);

  return (
    <section ref={sectionRef} className="about-section">
      <h2 ref={titleRef} className="about-title">
        {t('about.title')}
      </h2>
      <div className="about-content">
        <p ref={(el) => (textRefs.current[0] = el)}>
          {t('about.paragraph1')}
        </p>
        <p ref={(el) => (textRefs.current[1] = el)}>
          {t('about.paragraph2')}
        </p>
        <p ref={(el) => (textRefs.current[2] = el)}>
          {t('about.paragraph3')}
        </p>
      </div>
    </section>
  );
};

export default AboutSection;