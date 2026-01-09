import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

i18n
    .use(HttpBackend) // Load translations from /public/locales
    .use(LanguageDetector) // Functionality to cache the language
    .use(initReactI18next) // Passes i18n instance to react-i18next
    .init({
        fallbackLng: 'fr', // Default language
        supportedLngs: ['en', 'fr', 'ar'],

        // Detector options
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'], // Cache user language in localStorage
        },

        backend: {
            loadPath: '/locales/{{lng}}/translation.json', // Path to translation files
        },

        interpolation: {
            escapeValue: false, // React already safe from XSS
        },

        react: {
            useSuspense: false // Handle loading manually if needed, or use Suspense
        }
    });

export default i18n;
