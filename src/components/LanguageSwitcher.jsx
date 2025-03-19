import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const SwitcherContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const LanguageButton = styled.button`
  background: ${props => props.active ? '#ffd700' : 'transparent'};
  color: ${props => props.active ? 'black' : '#ffd700'};
  border: 1px solid #ffd700;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#ffd700' : 'rgba(255, 215, 0, 0.2)'};
  }
`;

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <SwitcherContainer>
      <LanguageButton 
        active={i18n.language === 'en'} 
        onClick={() => changeLanguage('en')}
      >
        EN
      </LanguageButton>
      <LanguageButton 
        active={i18n.language === 'fr'} 
        onClick={() => changeLanguage('fr')}
      >
        FR
      </LanguageButton>
    </SwitcherContainer>
  );
};

export default LanguageSwitcher;