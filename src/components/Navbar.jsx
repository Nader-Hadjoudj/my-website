import styled from "styled-components";
import logo from "../assets/Stormmaze_gold.png";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Logo = styled.img`
  height: 70px;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  z-index: 1002;
  max-width: 70px;
  object-fit: contain;
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
  width: 100vw; /* Keeping as 100vw as instructed */
  height: 60px; /* Adjust height as needed */
  z-index: 1000; /* Keep navbar above other elements */
  transform: translateX(100%); /* Start off-screen */
  opacity: 0; /* Initially hidden */
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 15px 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  position: relative;
  z-index: 1001;
  
  @media (max-width: 768px) {
    margin: 0 80px;
    justify-content: center;
  }
`;

const NavItem = styled.a`
  margin: 0 15px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: rgb(118, 118, 118);
  }
  
  @media (max-width: 768px) {
    margin: 0 8px;
    font-size: 14px;
  }
`;

const LanguageContainer = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  z-index: 1002;
  
  @media (max-width: 768px) {
    right: 10px;
  }
`;

function Navbar() {
    const navRef = useRef(null);
    const { t } = useTranslation();
  
    useEffect(() => {
      // Add overflow-x: hidden to body to prevent horizontal scrolling
      document.body.style.overflowX = "hidden";
      
      if (navRef.current) {
        gsap.to(navRef.current, {
          x: 0,
          duration: 1, 
          opacity: 1,
          ease: "power2.out",
        });
      }
      
      return () => {
        // Clean up when component unmounts
        document.body.style.overflowX = "";
      };
    }, []);
    
    return (
      <Nav ref={navRef}>
        <a href="/">
          <Logo src={logo} alt="Stormmaze" />
        </a>
        <NavLinks>
          <NavItem href="/">{t('navbar.home')}</NavItem>
          <NavItem href="/about">{t('navbar.about')}</NavItem>
          <NavItem href="/contact">{t('navbar.contact')}</NavItem>
        </NavLinks>
        <LanguageContainer>
          <LanguageSwitcher />
        </LanguageContainer>
      </Nav>
    );
}
  
export default Navbar;