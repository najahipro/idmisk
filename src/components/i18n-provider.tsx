"use client"

import { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export function I18nProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const handleLanguageChange = (lng: string) => {
            const dir = lng === 'ar' ? 'rtl' : 'ltr';
            document.documentElement.dir = dir;
            document.documentElement.lang = lng;

            if (lng === 'ar') {
                document.body.classList.add('font-arabic');
                document.body.classList.remove('font-sans');
            } else {
                document.body.classList.add('font-sans');
                document.body.classList.remove('font-arabic');
            }
        };

        i18n.on('languageChanged', handleLanguageChange);

        // Initial setup
        handleLanguageChange(i18n.language);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, []);

    return (
        <I18nextProvider i18n={i18n}>
            {children}
        </I18nextProvider>
    );
}
