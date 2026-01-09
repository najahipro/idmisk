"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { en } from "@/locales/en"
import { fr } from "@/locales/fr"
import { ar } from "@/locales/ar"

export type Language = "EN" | "FR" | "AR"
export type Currency = "USD" | "EUR" | "DH"

type LanguageContextType = {
    language: Language
    currency: Currency
    setLanguage: (lang: Language) => void
    setCurrency: (curr: Currency) => void
    formatPrice: (priceInDh: number | undefined | null) => string
    t: (key: string) => string
    dir: "ltr" | "rtl"
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations = {
    EN: en,
    FR: fr,
    AR: ar,
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    // 1. Core State
    const [language, setLanguageState] = useState<Language>("FR")
    const [currency, setCurrencyState] = useState<Currency>("EUR")
    const [isMounted, setIsMounted] = useState(false)

    // 2. Persistence (Load from localStorage on mount)
    useEffect(() => {
        const savedLang = localStorage.getItem("app-language") as Language
        const savedCurr = localStorage.getItem("app-currency") as Currency

        if (savedLang && ["EN", "FR", "AR"].includes(savedLang)) {
            setLanguageState(savedLang)
        }
        if (savedCurr && ["USD", "EUR", "DH"].includes(savedCurr)) {
            setCurrencyState(savedCurr)
        }
        setIsMounted(true)
    }, [])

    // 3. Document Direction & Font Updates
    const dir = language === "AR" ? "rtl" : "ltr"

    useEffect(() => {
        document.documentElement.dir = dir
        document.documentElement.lang = language.toLowerCase()

        // Font Switching Logic
        if (language === "AR") {
            document.body.classList.add("font-arabic")
            document.body.classList.remove("font-sans")
        } else {
            document.body.classList.add("font-sans")
            document.body.classList.remove("font-arabic")
        }
    }, [dir, language])

    // 4. Setters with Persistence
    const setLanguage = (lang: Language) => {
        console.log("Language changed to:", lang)
        setLanguageState(lang)
        localStorage.setItem("app-language", lang)
    }

    const setCurrency = (curr: Currency) => {
        console.log("Currency changed to:", curr)
        setCurrencyState(curr)
        localStorage.setItem("app-currency", curr)
    }

    // 5. Price Conversion Logic (User Rules)
    const formatPrice = (priceInDh: number | undefined | null) => {
        if (priceInDh === undefined || priceInDh === null) return "0 DH"

        // Normalize: Input is MAD (e.g., 150)
        // EUR Base = 150 / 11 ~ 13.63
        // USD Base = 150 / 10 = 15 (if strict rule) or derive from EUR? User said: USD = Price / 10.

        // Let's stick strictly to user formulas:
        switch (currency) {
            case "DH":
                return `${priceInDh} DH`
            case "EUR":
                return `${(priceInDh / 11).toFixed(2)} €`
            case "USD":
                return `${(priceInDh / 10).toFixed(2)} $`
            default:
                return `${priceInDh} DH`
        }
    }

    // 6. Translation Function (Support Nested Keys "nav.home")
    const t = (key: string) => {
        const keys = key.split('.')
        let value: any = translations[language]

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k]
            } else {
                return key // Fallback to key if not found
            }
        }

        return typeof value === 'string' ? value : key
    }

    // Avoid hydration mismatch by rendering children only after mount (optional, or just render with default)
    // Determining if we should block rendering until hydrated is valid for language to avoid flash.
    // But for better UX, usually we render default and update.

    return (
        <LanguageContext.Provider value={{ language, currency, setLanguage, setCurrency, formatPrice, t, dir }}>
            {children}
        </LanguageContext.Provider>
    )
}

export const useLanguage = () => {
    const context = useContext(LanguageContext)
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
