import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './src/locales/en.json';
import frTranslations from './src/locales/fr.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      fr: {
        translation: frTranslations
      }
    },
    lng: 'fr', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;