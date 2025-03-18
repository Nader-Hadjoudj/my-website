import styled from "styled-components";
import logo from "../assets/Stormmaze_gold.png";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";


const Logo = styled.img`
  height: 70px; /* Adjust size if needed */
  position: absolute;
  left: 20px; /* Keep it on the very left */
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 0, 0); /* Ensure background is black */
  padding: 15px 30px;
  position: fixed; 
  top: 0; /* Position at the top */
  left: 0;
  width: 100vw; /* Full width */
  height: 60px; /* Adjust height as needed */
  z-index: 1000; /* Keep navbar above other elements */
  transform: translateX(100%); /* Start off-screen */
  opacity: 0; /* Initially hidden */
`;

const NavItem = styled.a`
  margin: 0 15px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: bold;
  &:hover {
    color: rgb(118, 118, 118);
  }
`;
const NavList = styled.div`
  display: flex;
`;

function Navbar() {
    const navRef = useRef(null);
  
    useEffect(() => {
        gsap.to(navRef.current, {
          x: 0, // Move to normal position
          duration: 1, 
          opacity: 1,
          ease: "power2.out",
        });
      }, []);
      
  
    return (
      <Nav ref={navRef}>
        <a href="/">
          <Logo src={logo} alt="Logo" />
        </a>
        <NavList>
          <NavItem href="/">Home</NavItem>
          <NavItem href="/about">About</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </NavList>
      </Nav>
    );
  }
  

export default Navbar;
