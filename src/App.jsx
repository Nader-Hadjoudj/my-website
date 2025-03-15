import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar"; // Ensure navbar is always visible
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar remains visible on all pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer /> {/* Add Footer Here */}
    </Router>
  );
}

export default App;
