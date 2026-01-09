import { INITIAL_PRODUCTS } from "@/context/product-context"

export interface Order {
    id: string
    customer: string
    item: string
    date: string
    amount: number
    status: 'En cours' | 'Livré' | 'Annulé'
}

// Mock Orders configured to sum to exactly 4550 DH of 'Livré' revenue if needed, 
// or just return the static value as requested.
// User Request: Total Revenue: 4,550 DH, Orders Today: 5.
// Let's make the mock data reflect this.

const MOCK_ORDERS: Order[] = [
    { id: "CMD-2026-001", customer: "Amina B.", item: "Hijab Jersey", date: "2026-01-06", amount: 150, status: "Livré" },
    { id: "CMD-2026-002", customer: "Sarah K.", item: "Pack Essentiel", date: "2026-01-06", amount: 399, status: "En cours" },
    { id: "CMD-2026-003", customer: "Leila M.", item: "Hijab Soie", date: "2026-01-06", amount: 150, status: "Livré" },
    { id: "CMD-2026-004", customer: "Houda F.", item: "Coffret Cadeau", date: "2026-01-06", amount: 550, status: "Livré" },
    { id: "CMD-2026-005", customer: "Noura T.", item: "Hijab Crêpe", date: "2026-01-06", amount: 170, status: "Livré" },
]

export async function getStats() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // User explicitly requested these values:
    // Revenue: 4,550 DH
    // Orders Today: 5
    // Products: Actual count + 1

    return {
        revenue: "4,550.00", // Hardcoded as requested
        ordersToday: 5,
        totalProducts: INITIAL_PRODUCTS.length + 1,
        activeAmbassadors: 3,
        recentOrders: MOCK_ORDERS
    }
}
