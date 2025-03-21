import React from "react";
import Navbar from "../components/Navbar";
import AnimatedText from "../components/AnimatedText";
import StormmazeLanding from "../components/StormmazeLanding";
import AgricultureImportLanding from "../components/AgricultureImportLanding";
import FarmingHeroSection from "../components/FarmingHeroSection";
import AppointmentBooking from "../components/AppointmentBooking";
import FarmingProductsShowcase from "../components/FarmingProductsShowcase";

function Home() {
  return (
    <div>
      <StormmazeLanding />
      
      <FarmingHeroSection />
      <FarmingProductsShowcase />
    </div>
  );
}

export default Home;
