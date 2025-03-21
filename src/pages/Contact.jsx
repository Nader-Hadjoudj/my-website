import React from "react";
import Navbar from "../components/Navbar";
import AnimatedText from "../components/AnimatedText";
import ContactText from "../components/ContactText";
import AppointmentBooking from "../components/AppointmentBooking";
import FarmingProductsShowcase from "../components/FarmingProductsShowcase";
import ContactForm from "../components/ContactForm";

function Contact() {
  return (
    <div>
      <ContactForm />
      <AppointmentBooking />
      <FarmingProductsShowcase />
    </div>
  );
}

export default Contact;
