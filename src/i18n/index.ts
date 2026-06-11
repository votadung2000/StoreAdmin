import LanguageDetector from 'i18next-browser-languagedetector';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';

const LANGUAGE_STORAGE_KEY = 'store-admin-language';

export const AppLanguage = {
  English: 'en',
  Vietnamese: 'vi',
} as const;

export type AppLanguage = (typeof AppLanguage)[keyof typeof AppLanguage];

i18n.use(LanguageDetector).use(initReactI18next).init({
  resources: {
    [AppLanguage.English]: {
      translation: en,
    },
    [AppLanguage.Vietnamese]: {
      translation: vi,
    },
  },
  fallbackLng: AppLanguage.English,
  supportedLngs: Object.values(AppLanguage),
  load: 'languageOnly',
  defaultNS: 'translation',
  returnNull: false,
  detection: {
    order: ['localStorage', 'navigator', 'htmlTag'],
    lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    caches: ['localStorage'],
  },
  interpolation: {
    escapeValue: false,
    prefix: '{',
    suffix: '}',
  },
});

export default i18n;
