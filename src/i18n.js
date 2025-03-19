import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Don't forget to create these translation files
const enTranslation = {
  "navbar": {
    "home": "Home",
    "about": "About",
    "contact": "Contact",
    "catalogue": "Catalogue"
  },
  "animatedText": {
    "visiting": "You are visiting stormmaze",
    "maintenance": "Website is under maintenance"
  },
  "common": {
    "learnMore": "Learn More",
    "submit": "Submit"
  }
};

const frTranslation = {
  "navbar": {
    "home": "Accueil",
    "about": "À propos",
    "contact": "Contact",
    "catalogue": "Catalogue"
  },
  "animatedText": {
    "visiting": "Vous visitez stormmaze",
    "maintenance": "Site en cours de maintenance"
  },
  "common": {
    "learnMore": "En savoir plus",
    "submit": "Soumettre"
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      fr: {
        translation: frTranslation
      }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;