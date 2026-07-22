import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import hi from './locales/hi.json';

// Initializes i18next with the namespaces bundled at build time (the locale
// files are small enough that lazy-loading isn't worth the complexity for two
// languages). React components consume translations via useTranslation().
//
// Language is detected from (in order): localStorage 'i18nLang', the
// navigator language, then falls back to 'en'. The Header language switcher
// sets localStorage 'i18nLang' and calls i18n.changeLanguage().
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            hi: { translation: hi }
        },
        fallbackLng: 'en',
        supportedLngs: ['en', 'hi'],
        detection: {
            order: ['localStorage', 'navigator'],
            lookupLocalStorage: 'i18nLang',
            caches: ['localStorage']
        },
        interpolation: {
            escapeValue: false // React already escapes
        },
        react: {
            useSuspense: false
        }
    });

export const LANGUAGES = [
    { code: 'en', label: 'EN', nativeName: 'English' },
    { code: 'hi', label: 'हिं', nativeName: 'हिन्दी' }
];

export default i18n;
