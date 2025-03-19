import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const SwitcherContainer = styled.div`
  display: flex;
  align-items: center;
`;

const LanguageButton = styled.button`
  background: transparent;
  border: none;
  color: ${props => props.active ? "#d4af37" : "#ffffff"};
  cursor: pointer;
  margin: 0 5px;
  font-weight: ${props => props.active ? "bold" : "normal"};
  transition: color 0.3s ease;
  
  &:hover {
    color: #d4af37;
  }
`;

const Divider = styled.span`
  color: #ffffff;
  margin: 0 5px;
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitcherContainer>
      <LanguageButton 
        active={i18n.language === 'fr'} 
        onClick={() => changeLanguage('fr')}
      >
        FR
      </LanguageButton>
      <Divider>|</Divider>
      <LanguageButton 
        active={i18n.language === 'en'} 
        onClick={() => changeLanguage('en')}
      >
        EN
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;