"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export type Currency = "USD" | "EUR" | "DH"

type CurrencyContextType = {
    currency: Currency
    setCurrency: (curr: Currency) => void
    formatPrice: (priceInDh: number | undefined | null) => string
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
    // Hardcode currency to MAD/DH
    const currency: Currency = "DH"

    const setCurrency = (curr: Currency) => {
        // No-op: Currency is locked to MAD
        console.log("Currency is locked to MAD/DH")
    }

    const formatPrice = (priceInDh: number | undefined | null) => {
        if (priceInDh === undefined || priceInDh === null) return "0,00 DH"

        // Use Intl.NumberFormat for proper formatting (e.g. 200,00 DH)
        return new Intl.NumberFormat('fr-MA', {
            style: 'currency',
            currency: 'MAD',
            minimumFractionDigits: 2
        }).format(priceInDh).replace('MAD', 'DH') // Replace MAD code with DH symbol common in Morocco
    }

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    )
}

export const useCurrency = () => {
    const context = useContext(CurrencyContext)
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider")
    }
    return context
}
