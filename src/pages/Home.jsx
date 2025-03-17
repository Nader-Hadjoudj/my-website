import React from "react";
import Navbar from "../components/Navbar";
import AnimatedText from "../components/AnimatedText";
import AppointmentBooking from "../components/AppointmentBooking";

function Home() {
  return (
    <div>
      <AnimatedText />
      <AppointmentBooking />
      <Navbar />
    </div>
  );
}

export default Home;
