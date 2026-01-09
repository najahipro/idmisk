"use client"

import React, { createContext, useContext } from "react"

// Hada Context "Khawi" bach nfakko l mochkil dyal l build
// Bla ma n7tajo ndiro import l en/fr/ar
const LanguageContext = createContext<any>({
    t: (key: string) => key,
    language: "fr",
    setLanguage: () => { },
    dir: "ltr",
})

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    return (
        <LanguageContext.Provider
            value={{
                t: (key: string) => key, // Kayraja3 l kelma kifma hiya
                language: "fr",
                setLanguage: () => { },
                dir: "ltr"
            }}
        >
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => useContext(LanguageContext)