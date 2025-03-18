import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
  background: rgb(0, 0, 0);
  width: 100vw;
  color: white;
  text-align: center;
  padding: 20px 10px;
  margin-top: 0px;
`;

const FooterText = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: #ffd700;
`;

const FooterLinks = styled.div`
  margin-top: 10px;
`;

const FooterLink = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 0 10px;
  font-size: 14px;
  
  &:hover {
    color: gray;
  }
`;

const SocialIcons = styled.div`
  margin-top: 10px;
`;

const SocialIcon = styled.a`
  color: white;
  margin: 0 8px;
  font-size: 20px;
  text-decoration: none;

  &:hover {
    color: gray;
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterLinks>
        <FooterLink to="/">Home</FooterLink>
        <FooterLink to="/about">About</FooterLink>
        <FooterLink to="/contact">Contact</FooterLink>
        <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
        <FooterLink to="/terms">Terms of Service</FooterLink>
      </FooterLinks>

    {/* 
        <SocialIcons>
        <SocialIcon href="#" target="_blank">📘</SocialIcon> Facebook Placeholder
        <SocialIcon href="#" target="_blank">🐦</SocialIcon> Twitter Placeholder
        <SocialIcon href="#" target="_blank">📷</SocialIcon> Instagram Placeholder
        <SocialIcon href="#" target="_blank">🔗</SocialIcon> LinkedIn Placeholder
        </SocialIcons> 
    */}

      <FooterText>
        © 2025 stormmaze. All rights reserved.
      </FooterText>
    </FooterContainer>
  );
}

export default Footer;
