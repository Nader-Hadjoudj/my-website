import styled from "styled-components";
import logo from "../assets/Stormmaze_gold.png";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Logo = styled.img`
  height: 70px;
  position: absolute;
  left: 20px;
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 0, 0);
  padding: 15px 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  z-index: 1000;
  transform: translateX(100%);
  opacity: 0;
  box-sizing: border-box;
`;

const NavLinks = styled.div`
  display: flex;
  position: relative; /* Add this */
  z-index: 1001; /* Add this - higher than Nav z-index */
`;

const NavLink = styled(Link)`
  margin: 0 15px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: bold;
  cursor: pointer; /* Add this */
  user-select: none; /* Add this */
  position: relative; /* Add this */
  z-index: 1002; /* Add this */
  
  &:hover {
    color: rgb(118, 118, 118);
  }
`;

function Navbar() {
    const navRef = useRef(null);
    const { t } = useTranslation();
  
    useEffect(() => {
      if (navRef.current) {
        gsap.to(navRef.current, {
          x: 0,
          duration: 1, 
          opacity: 1,
          ease: "power2.out",
        });
      }
    }, []);
      
    // Add console log to debug
    console.log("Translation test:", t('navbar.home'));
    
    return (
      <Nav ref={navRef}>
        <Link to="/">
          <Logo src={logo} alt="Logo" />
        </Link>
        <NavLinks>
          <NavLink to="/">{t('navbar.home')}</NavLink>
          <NavLink to="/about">{t('navbar.about')}</NavLink>
          <NavLink to="/contact">{t('navbar.contact')}</NavLink>
          <NavLink to="/catalogue">{t('navbar.catalogue')}</NavLink>
        </NavLinks>
        <LanguageSwitcher />
      </Nav>
    );
}
  
export default Navbar;