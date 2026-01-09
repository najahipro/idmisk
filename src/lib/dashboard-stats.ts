// Msa7na l import li kan hna dyal INITIAL_PRODUCTS 7it mab9ach

export interface Order {
    id: string
    customer: string
    item: string
    date: string
    amount: number
    status: 'En cours' | 'Livré' | 'Annulé'
}

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

    return {
        revenue: "4,550.00",
        ordersToday: 5,
        // Hna bddlna INITIAL_PRODUCTS b ra9m fix (matalan 15) bach l build ydouz
        totalProducts: 15,
        activeAmbassadors: 3,
        recentOrders: MOCK_ORDERS
    }
}