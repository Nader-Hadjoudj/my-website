import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translation from './src/locales/en/translation.json';
import translation from './src/locales/fr/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translation
      },
      fr: {
        translation: translation
      }
    },
    lng: 'fr', // Default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already safes from XSS
    }
  });

export default i18n;