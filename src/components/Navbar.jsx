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
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between; /* Changed to space-between for better control */
  background: rgb(0, 0, 0);
  padding: 15px 30px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw; /* Kept as 100vw per your instruction */
  height: 60px;
  z-index: 1000;
  transform: translateX(100%);
  opacity: 0;
  box-sizing: border-box;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Keeps items centered */
  flex-grow: 1; /* Allows NavLinks to take up available space */
  margin-left: 100px; /* Ensures space for the logo */
  margin-right: 20px; /* Ensures space for LanguageWrapper */
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
    margin: 0 8px;
    font-size: 14px;
  }
`;

const LanguageWrapper = styled.div`
  display: flex;
  align-items: center;
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