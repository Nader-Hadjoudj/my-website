import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import styled from "styled-components";

// Create a container to hold the main content with padding
const MainContent = styled.div`
  padding-top: 90px; /* Adjust this value based on your navbar height (60px + padding) */
  min-height: calc(100vh - 60px); /* Ensures content takes up full height minus navbar */
`;

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar remains visible on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/catalogue" element={<Contact />} />
        </Routes>
      <Footer /> {/* Add Footer Here */}
    </Router>
  );
}

export default App;