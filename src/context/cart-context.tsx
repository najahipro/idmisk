"use client"

import React, { createContext, useContext, useEffect, useState } from "react"

export type CartItem = {
    id: string
    title: string
    price: number
    image: string
    quantity: number
    color?: string
}

type CartContextType = {
    items: CartItem[]
    addItem: (item: CartItem) => void
    removeItem: (id: string, color?: string) => void
    updateQuantity: (id: string, color: string | undefined, delta: number) => void
    clearCart: () => void
    total: number
    itemCount: number
    isOpen: boolean
    setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    // Load from local storage
    useEffect(() => {
        setIsMounted(true)
        const saved = localStorage.getItem("cart-storage")
        if (saved) {
            try {
                setItems(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse cart local storage", e)
            }
        }
    }, [])

    // Save to local storage
    useEffect(() => {
        if (isMounted) {
            localStorage.setItem("cart-storage", JSON.stringify(items))
        }
    }, [items, isMounted])

    const addItem = (newItem: CartItem) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === newItem.id && item.color === newItem.color
            )

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === newItem.id && item.color === newItem.color
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
            }

            return [...currentItems, newItem]
        })
        setIsOpen(true) // Auto open cart on add
    }

    const removeItem = (id: string, color?: string) => {
        setItems((currentItems) =>
            currentItems.filter((item) => !(item.id === id && item.color === color))
        )
    }

    const updateQuantity = (id: string, color: string | undefined, delta: number) => {
        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id === id && item.color === color) {
                    const newQuantity = item.quantity + delta
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : item
                }
                return item
            })
        )
    }

    const clearCart = () => setItems([])

    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

    // Hydration mismatch fix: Just render children, but effective Context will be empty until mount?
    // Better strategy: Always render Provider, just maybe with initial empty state.
    // Since we use useState for items, it's fine.

    // We do NOT return <>{children}</> here because checking !isMounted would strip the Provider
    // which causes the "must be used within a CartProvider" error for children that use the hook immediately.


    return (
        <CartContext.Provider
            value={{
                items,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                total,
                itemCount,
                isOpen,
                setIsOpen,
            }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
