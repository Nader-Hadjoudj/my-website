import React from "react";
import Navbar from "../components/Navbar";
import AnimatedText from "../components/AnimatedText";
import { FarmingHeroSection } from "../components/FarmingHeroSection";
import AppointmentBooking from "../components/AppointmentBooking";

function Home() {
  return (
    <div>
      <AnimatedText />
      <AppointmentBooking />
      <FarmingHeroSection />
    </div>
  );
}

export default Home;
