import styled from "styled-components";
import logo from "../assets/Stormmaze_gold.png";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const Logo = styled.img`
  height: 70px;
  position: absolute;
  left: 10px; /* Reduced from 20px */
  cursor: pointer;

  @media (max-width: 768px) {
    height: 60px; /* Further reduced for mobile */
    left: 10px;
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgb(0, 0, 0);
  padding: 15px 10px; /* Reduced horizontal padding */
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100vw - 20px); /* Adjusted for padding (10px left + 10px right) */
  height: 60px;
  z-index: 1000;
  transform: translateX(100%);
  opacity: 0;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 10px 5px; /* Even less padding on mobile */
    width: calc(90vw - 20px); /* Adjusted for mobile padding */
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  margin-left: 90px; /* Reduced from 100px */
  margin-right: 10px;

  @media (max-width: 768px) {
    margin-left: 50px; /* Reduced for smaller logo */
    margin-right: 5px;
  }
`;

const NavItem = styled.a`
  margin: 0 15px;
  text-decoration: none;
  color: rgb(255, 255, 255);
  font-weight: bold;
  cursor: pointer;
  white-space: nowrap;
  &:hover {
    color: rgb(118, 118, 118);
  }

  @media (max-width: 768px) {
    margin: 0 10px; /* Reduced spacing */
    font-size: 14px; /* Smaller text */
  }
`;

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-left: 10px;
    font-size: 12px;
  }
`;

function Navbar() {
  const navRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
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
      document.body.style.overflowX = "";
    };
  }, []);

  return (
    <Nav ref={navRef}>
      <a href="/">
        <Logo src={logo} alt="Stormmaze" />
      </a>
      <NavLinks>
        <NavItem href="/">{t("navbar.home")}</NavItem>
        <NavItem href="/about">{t("navbar.about")}</NavItem>
        <NavItem href="/contact">{t("navbar.contact")}</NavItem>
      </NavLinks>
      <LanguageWrapper>
        <LanguageSwitcher />
      </LanguageWrapper>
    </Nav>
  );
}

export default Navbar;