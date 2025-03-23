import React from "react";
import Navbar from "../components/Navbar";
import AnimatedText from "../components/AnimatedText";
import ContactText from "../components/ContactText";
import AppointmentBooking from "../components/AppointmentBooking";
import FarmingProductsShowcase from "../components/FarmingProductsShowcase";
import ContactForm from "../components/ContactForm";
import EmailReveal from "../components/EmailReveal";

function Contact() {
  return (
    <div>
      <EmailReveal/>
      <AppointmentBooking />
      <FarmingProductsShowcase />
    </div>
  );
}

export default Contact;
