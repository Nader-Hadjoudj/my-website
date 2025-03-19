import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FieldsOfOrigin.css";

gsap.registerPlugin(ScrollTrigger);

const FieldsOfOrigin = () => {
  const sectionRef = useRef(null);
  const algeriaMapRef = useRef(null);
  const franceMapRef = useRef(null);
  const textRefs = useRef([]);
  const vineRefs = useRef([]);
  const connectionLinesRef = useRef(null);
  const [algeriaHovered, setAlgeriaHovered] = useState(false);
  const [franceHovered, setFranceHovered] = useState(false);
  const [mapsLoaded, setMapsLoaded] = useState({ algeria: false, france: false });

  useEffect(() => {
    // Only start animations when both maps are loaded
    if (!mapsLoaded.algeria || !mapsLoaded.france) return;

    // Main timeline animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        end: "bottom 20%",
        scrub: 1,
        markers: false,
      },
    });

    // Initial reveal of maps
    tl.from([algeriaMapRef.current, franceMapRef.current], {
      opacity: 0,
      scale: 0.8,
      x: (i) => (i === 0 ? -50 : 50),
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.3,
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
          stagger: 0.1,
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
      )
      .fromTo(
        ".connection-line",
        {
          strokeDashoffset: 500,
          strokeDasharray: 500,
        },
        {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.inOut",
        },
        "-=0.5"
      )
      .from(
        ".path-dot",
        {
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "back.out(1.7)",
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

    // Continuous animations
    
    // Flowing dots along connection paths
    gsap.to(".flow-dot", {
      motionPath: {
        path: ".connection-line",
        align: ".connection-line",
        alignOrigin: [0.5, 0.5],
        autoRotate: true,
      },
      duration: 5,
      repeat: -1,
      ease: "none",
      stagger: 1,
    });

    // Particle animations
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
  }, [mapsLoaded]);

  const handleAlgeriaHover = () => {
    setAlgeriaHovered(true);
    
    gsap.to(algeriaMapRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.inOut",
    });
    
    // Highlight connection from Algeria to France
    gsap.to(".connection-line", {
      stroke: "#FFCC00",
      strokeWidth: 3,
      duration: 0.3,
    });
    
    // Animate crops in Algeria
    gsap.to(".crop.algeria", {
      scale: 2,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
    });
    
    // Make France pulse subtly
    gsap.to(franceMapRef.current, {
      filter: "brightness(1.2)",
      duration: 0.3,
    });
    
    // Animate vines
    gsap.to(vineRefs.current, {
      scaleY: 1.2,
      duration: 0.5,
    });
    
    // Increase flow dot speed
    gsap.to(".flow-dot", {
      timeScale: 2,
      duration: 0.5,
    });
  };

  const handleAlgeriaLeave = () => {
    setAlgeriaHovered(false);
    
    gsap.to(algeriaMapRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power1.inOut",
    });
    
    // Reset connection styling
    gsap.to(".connection-line", {
      stroke: "#D4AF37",
      strokeWidth: 2,
      duration: 0.3,
    });
    
    // Reset crop animations
    gsap.to(".crop.algeria", {
      scale: 1,
      opacity: 0.7,
      duration: 0.4,
      stagger: 0.05,
    });
    
    // Reset France map
    gsap.to(franceMapRef.current, {
      filter: "brightness(1)",
      duration: 0.3,
    });
    
    // Reset vines
    gsap.to(vineRefs.current, {
      scaleY: 1,
      duration: 0.5,
    });
    
    // Reset flow dot speed
    gsap.to(".flow-dot", {
      timeScale: 1,
      duration: 0.5,
    });
  };

  const handleFranceHover = () => {
    setFranceHovered(true);
    
    gsap.to(franceMapRef.current, {
      scale: 1.05,
      duration: 0.3,
      ease: "power1.inOut",
    });
    
    // Highlight connection from France to Algeria
    gsap.to(".connection-line", {
      stroke: "#FFCC00",
      strokeWidth: 3,
      duration: 0.3,
    });
    
    // Animate crops in France
    gsap.to(".crop.france", {
      scale: 2,
      opacity: 1,
      duration: 0.4,
      stagger: 0.05,
    });
    
    // Make Algeria pulse subtly
    gsap.to(algeriaMapRef.current, {
      filter: "brightness(1.2)",
      duration: 0.3,
    });
    
    // Reverse flow dot direction
    gsap.to(".flow-dot", {
      timeScale: -2,
      duration: 0.5,
    });
  };

  const handleFranceLeave = () => {
    setFranceHovered(false);
    
    gsap.to(franceMapRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power1.inOut",
    });
    
    // Reset connection styling
    gsap.to(".connection-line", {
      stroke: "#D4AF37",
      strokeWidth: 2,
      duration: 0.3,
    });
    
    // Reset crop animations
    gsap.to(".crop.france", {
      scale: 1,
      opacity: 0.7,
      duration: 0.4,
      stagger: 0.05,
    });
    
    // Reset Algeria map
    gsap.to(algeriaMapRef.current, {
      filter: "brightness(1)",
      duration: 0.3,
    });
    
    // Reset flow dot direction
    gsap.to(".flow-dot", {
      timeScale: 1,
      duration: 0.5,
    });
  };

  const handleMapLoad = (map) => {
    setMapsLoaded(prev => ({ ...prev, [map]: true }));
  };

  // Generate crop points for Algeria map
  const algeriaCropPoints = [
    { x: "28%", y: "35%", size: 6 },
    { x: "42%", y: "28%", size: 5 },
    { x: "35%", y: "42%", size: 7 },
    { x: "50%", y: "35%", size: 5 },
    { x: "65%", y: "30%", size: 6 },
    { x: "58%", y: "45%", size: 7 }
  ];

  // Generate crop points for France map
  const franceCropPoints = [
    { x: "30%", y: "40%", size: 6 },
    { x: "45%", y: "35%", size: 5 },
    { x: "60%", y: "45%", size: 7 },
    { x: "35%", y: "55%", size: 5 },
    { x: "50%", y: "60%", size: 6 },
    { x: "65%", y: "40%", size: 7 }
  ];

  // Generate particles
  const particles = Array.from({ length: 30 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 4,
  }));

  // Generate connection path dots
  const pathDots = [
    { x: "60%", y: "40%" },
    { x: "70%", y: "35%" },
    { x: "80%", y: "45%" },
    { x: "90%", y: "50%" },
    { x: "100%", y: "48%" },
    { x: "110%", y: "45%" },
    { x: "120%", y: "40%" },
    { x: "130%", y: "42%" },
    { x: "140%", y: "38%" }
  ];

  return (
    <section ref={sectionRef} className="fields-section">
      <div className="maps-container">
        {/* Algeria Map */}
        <div 
          className={`map-container ${algeriaHovered ? 'hovered' : ''}`} 
          ref={algeriaMapRef} 
          onMouseEnter={handleAlgeriaHover} 
          onMouseLeave={handleAlgeriaLeave}
        >
          <div className="map-label">Algeria</div>
          <div className="map-image-container">
            <img 
              src="/map.png" 
              alt="Algeria Map Outline" 
              className="map-image"
              onLoad={() => handleMapLoad('algeria')}
            />
            <div className="map-overlay"></div>
            
            {/* Crop points positioned over Algeria */}
            {algeriaCropPoints.map((point, i) => (
              <div 
                key={i} 
                className="crop algeria" 
                style={{ 
                  left: point.x, 
                  top: point.y, 
                  width: `${point.size}px`, 
                  height: `${point.size}px` 
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Connection SVG */}
        <div className="connection-container" ref={connectionLinesRef}>
          <svg className="connection-svg" viewBox="0 0 300 200">
            <path 
              className="connection-line" 
              d="M10,100 C50,80 100,120 150,100 S250,80 290,100" 
              stroke="#D4AF37" 
              strokeWidth="2" 
              fill="none"
            />
            
            {/* Flow dots that move along the path */}
            <circle className="flow-dot" r="4" fill="#FFCC00"/>
            <circle className="flow-dot" r="4" fill="#FFCC00"/>
            <circle className="flow-dot" r="4" fill="#FFCC00"/>
            <circle className="flow-dot" r="4" fill="#FFCC00"/>
          </svg>
          
          {/* Path dots */}
          {pathDots.map((dot, i) => (
            <div 
              key={i} 
              className="path-dot" 
              style={{ 
                left: dot.x, 
                top: dot.y 
              }}
            ></div>
          ))}
        </div>

        {/* France Map */}
        <div 
          className={`map-container ${franceHovered ? 'hovered' : ''}`} 
          ref={franceMapRef} 
          onMouseEnter={handleFranceHover} 
          onMouseLeave={handleFranceLeave}
        >
          <div className="map-label">France</div>
          <div className="map-image-container">
            <img 
              src="/map.png" 
              alt="France Map Outline" 
              className="map-image"
              onLoad={() => handleMapLoad('france')}
            />
            <div className="map-overlay"></div>
            
            {/* Crop points positioned over France */}
            {franceCropPoints.map((point, i) => (
              <div 
                key={i} 
                className="crop france" 
                style={{ 
                  left: point.x, 
                  top: point.y, 
                  width: `${point.size}px`, 
                  height: `${point.size}px` 
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Growing vines */}
      <div className="vines-container">
        <div className="vine" ref={(el) => (vineRefs.current[0] = el)} style={{ left: "20%", bottom: "0" }}></div>
        <div className="vine vine-2" ref={(el) => (vineRefs.current[1] = el)} style={{ left: "40%", bottom: "0" }}></div>
        <div className="vine vine-3" ref={(el) => (vineRefs.current[2] = el)} style={{ left: "60%", bottom: "0" }}></div>
        <div className="vine vine-2" ref={(el) => (vineRefs.current[3] = el)} style={{ left: "80%", bottom: "0" }}></div>
      </div>
      
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
      
      <div className="content">
        <h2 ref={(el) => (textRefs.current[0] = el)} className="title">
          Fields of Origin
        </h2>
        <p ref={(el) => (textRefs.current[1] = el)}>
          At Stormmaze, we cultivate connections between 
          <span className="highlight"> Algeria's fertile lands</span> and
          <span className="highlight"> France's vibrant markets</span>, delivering premium agricultural treasures with every harvest.
        </p>
        <p ref={(el) => (textRefs.current[2] = el)}>
          Our vision reaches beyond borders, weaving a tapestry of global flavors with a golden thread of quality and
          sustainability.
        </p>
        <p ref={(el) => (textRefs.current[3] = el)}>
          Hover over each map to explore our story—rooted in tradition, blooming with innovation, and connecting continents.
        </p>
      </div>
    </section>
  );
};

export default FieldsOfOrigin;