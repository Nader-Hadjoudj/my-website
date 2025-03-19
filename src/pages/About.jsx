import React from "react";
import Navbar from "../components/Navbar";
import AnimatedText from "../components/AnimatedText";
import FarmingHeroSection from "../components/FarmingHeroSection";
import AboutUsVideo from "../components/AboutUsVideo";
import AboutText from "../components/AboutText";
import FieldsOfOrigin from "../components/FieldsOfOrigin"
import AboutSection from "../components/AboutSection"

function About() {
  return (
    <div>
      <AboutText />
      <AboutUsVideo />
      <FieldsOfOrigin/>
      <AboutSection/>
    </div>
  );
}

export default About;
