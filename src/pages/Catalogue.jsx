import React from "react";
import Navbar from "../components/Navbar";
import CatalogText from "../components/CatalogText";
import FarmingHeroSection from "../components/FarmingHeroSection";
import AppointmentBooking from "../components/AppointmentBooking";
import FarmingProductsShowcase from "../components/FarmingProductsShowcase";

function Home() {
  return (
    <div>
      <CatalogText />
      <FarmingHeroSection />
      <FarmingProductsShowcase />
    </div>
  );
}

export default Home;
