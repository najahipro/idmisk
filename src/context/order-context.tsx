"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { CartItem } from "./cart-context"

export interface Order {
    id: string
    date: string
    customer: {
        name: string
        phone: string
        city: string
        address: string
    }
    items: CartItem[]
    total: string
    status: "En attente" | "En cours" | "Expédié" | "Livré" | "Annulé"
    userEmail?: string
}

type OrderContextType = {
    orders: Order[]
    addOrder: (customer: Order['customer'], items: CartItem[], total: string, userEmail?: string) => string
    updateOrderStatus: (id: string, status: Order['status']) => void
    cancelOrder: (id: string) => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orders, setOrders] = useState<Order[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("orders")
        if (saved) {
            try {
                setOrders(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse orders", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("orders", JSON.stringify(orders))
        }
    }, [orders, isLoaded])

    const addOrder = (customer: Order['customer'], items: CartItem[], total: string, userEmail?: string) => {
        const newOrder: Order = {
            id: `#CMD-${Date.now().toString().slice(-6)}`, // Simple ID generation
            date: new Date().toLocaleDateString('fr-FR'),
            customer,
            items,
            total,
            status: "En attente",
            userEmail
        }

        // Add to beginning of list
        setOrders(prev => [newOrder, ...prev])
        return newOrder.id
    }

    const updateOrderStatus = (id: string, status: Order['status']) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    }

    const cancelOrder = (id: string) => {
        setOrders(prev => prev.map(o => {
            if (o.id === id) {
                // Strict Check: Only allow if status is 'En attente'
                if (o.status !== 'En attente') return o;
                return { ...o, status: 'Annulé' };
            }
            return o;
        }))
    }

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateOrderStatus, cancelOrder }}>
            {children}
        </OrderContext.Provider>
    )
}

export const useOrder = () => {
    const context = useContext(OrderContext)
    if (!context) {
        throw new Error("useOrder must be used within an OrderProvider")
    }
    return context
}
