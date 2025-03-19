import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FieldsOfOrigin.css";

gsap.registerPlugin(ScrollTrigger);

const FieldsOfOrigin = () => {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const textRefs = useRef([]);
  const vineRefs = useRef([]);
  const [isHovered, setIsHovered] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Start animations once the component is mounted
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        scrub: 1,
        markers: false,
      },
    });

    // Map reveal animation
    tl.from(mapRef.current, {
      opacity: 0,
      scale: 0.8,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        ".map-overlay",
        {
          opacity: 0.2,
          duration: 1,
        },
        "-=0.5"
      )
      .to(
        ".crop",
        {
          scale: 1,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
        },
        "-=0.5"
      )
      .from(
        vineRefs.current,
        {
          scaleY: 0,
          transformOrigin: "bottom",
          duration: 1,
          stagger: 0.3,
        },
        "-=0.5"
      );

    // Text animation
    gsap.from(textRefs.current, {
      opacity: 0,
      y: 30,
      duration: 1,
      stagger: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      },
    });

    // Continuous particle animations
    gsap.to(".particle", {
      y: () => Math.random() * 100 - 50,
      x: () => Math.random() * 100 - 50,
      opacity: (i) => 0.3 + Math.random() * 0.7,
      duration: () => 2 + Math.random() * 3,
      repeat: -1,
      repeatRefresh: true,
      stagger: 0.1,
      ease: "sine.inOut",
    });

    // Pulse effect for crop circles
    gsap.to(".crop", {
      scale: 1.5,
      opacity: 0.8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2,
    });

    // Clean up
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [mapLoaded]);

  const handleHover = () => {
    setIsHovered(true);
    gsap.to(mapRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.inOut",
    });
    
    // Animate crop points to burst outward
    gsap.to(".crop", {
      scale: 2,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
    });
    
    // Animate vines to grow taller
    gsap.to(vineRefs.current, {
      scaleY: 1.2,
      duration: 0.5,
    });
    
    // Increase particle activity
    gsap.to(".particle", {
      opacity: 0.8,
      scale: 1.5,
      duration: 0.3,
    });
    
    // Enhance map glow
    gsap.to(".map-container", {
      boxShadow: "0 0 30px rgba(212, 175, 55, 0.4)",
      duration: 0.4,
    });
  };

  const handleLeave = () => {
    setIsHovered(false);
    gsap.to(mapRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power1.inOut",
    });
    
    // Return crop points to normal
    gsap.to(".crop", {
      scale: 1,
      opacity: 0.7,
      duration: 0.4,
      stagger: 0.05,
    });
    
    // Return vines to normal
    gsap.to(vineRefs.current, {
      scaleY: 1,
      duration: 0.5,
    });
    
    // Decrease particle activity
    gsap.to(".particle", {
      opacity: 0.5,
      scale: 1,
      duration: 0.3,
    });
    
    // Reduce map glow
    gsap.to(".map-container", {
      boxShadow: "0 0 15px rgba(212, 175, 55, 0.2)",
      duration: 0.4,
    });
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  // Generate crop points for Algeria map
  const cropPoints = [
    { x: "28%", y: "35%", size: 6 },
    { x: "42%", y: "28%", size: 5 },
    { x: "35%", y: "42%", size: 7 },
    { x: "50%", y: "35%", size: 5 },
    { x: "65%", y: "30%", size: 6 },
    { x: "58%", y: "45%", size: 7 },
    { x: "70%", y: "40%", size: 5 },
    { x: "45%", y: "50%", size: 6 },
    { x: "55%", y: "27%", size: 5 },
    { x: "38%", y: "33%", size: 7 },
    { x: "62%", y: "48%", size: 6 },
    { x: "48%", y: "40%", size: 5 }
  ];

  // Generate particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
  }));

  return (
    <section ref={sectionRef} className="fields-section">
      <div 
        className={`map-container ${isHovered ? 'hovered' : ''}`} 
        ref={mapRef} 
        onMouseEnter={handleHover} 
        onMouseLeave={handleLeave}
      >
        <div className="map-image-container">
          <img 
            src="/map.png" 
            alt="Algeria Map Outline" 
            className="map-image"
            onLoad={handleMapLoad}
          />
          <div className="map-overlay"></div>
          
          {/* Crop points positioned over the map */}
          {cropPoints.map((point, i) => (
            <div 
              key={i} 
              className="crop" 
              style={{ 
                left: point.x, 
                top: point.y, 
                width: `${point.size}px`, 
                height: `${point.size}px` 
              }}
            ></div>
          ))}
          
          {/* Pulse circles */}
          <div className="pulse-circle"></div>
          <div className="pulse-circle pulse-circle-large"></div>
        </div>
        
        {/* Growing vines */}
        <div className="vine" ref={(el) => (vineRefs.current[0] = el)} style={{ left: "30%", bottom: "0" }}></div>
        <div className="vine vine-2" ref={(el) => (vineRefs.current[1] = el)} style={{ left: "50%", bottom: "0" }}></div>
        <div className="vine vine-3" ref={(el) => (vineRefs.current[2] = el)} style={{ left: "70%", bottom: "0" }}></div>
        
        {/* Particles */}
        {particles.map((particle, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{ 
              left: particle.left, 
              top: particle.top, 
              width: `${particle.size}px`, 
              height: `${particle.size}px` 
            }}
          ></div>
        ))}
      </div>
      
      <div className="content">
        <h2 ref={(el) => (textRefs.current[0] = el)} className="title">
          Fields of Origin
        </h2>
        <p ref={(el) => (textRefs.current[1] = el)}>
          At Stormmaze, we cultivate connections between 
          <span className="highlight"> Algeria's fertile lands</span> and
          France's vibrant markets, delivering premium agricultural treasures with every harvest.
        </p>
        <p ref={(el) => (textRefs.current[2] = el)}>
          Our vision reaches beyond borders, weaving a tapestry of global flavors with a golden thread of quality and
          sustainability.
        </p>
        <p ref={(el) => (textRefs.current[3] = el)}>
          Hover over the map to see our story grow—rooted in tradition, blooming with innovation.
        </p>
      </div>
    </section>
  );
};

export default FieldsOfOrigin;