import { db } from "@/lib/db"

export interface Order {
    id: string
    customer: string
    date: string
    amount: number
    status: 'En cours' | 'Livré' | 'Annulé'
}

const MOCK_ORDERS: Order[] = [
    { id: "CMD-2024-001", customer: "Sophia Benali", date: "2026-01-06", amount: 450, status: "En cours" },
    { id: "CMD-2024-002", customer: "Fatima Zahra", date: "2026-01-05", amount: 1200, status: "Livré" },
    { id: "CMD-2024-003", customer: "Houda El Idrissi", date: "2026-01-05", amount: 150, status: "Livré" },
    { id: "CMD-2024-004", customer: "Yasmine Tazi", date: "2026-01-04", amount: 890, status: "En cours" },
    { id: "CMD-2024-005", customer: "Kenza Alami", date: "2026-01-03", amount: 320, status: "Livré" },
    { id: "CMD-2024-006", customer: "Rania Berrada", date: "2026-01-02", amount: 550, status: "Livré" },
]

export async function getDashboardStats() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    const totalRevenue = MOCK_ORDERS
        .filter(o => o.status === 'Livré')
        .reduce((acc, curr) => acc + curr.amount, 0)

    const totalOrders = MOCK_ORDERS.length

    // Fetch real product count from DB
    const totalProducts = await db.product.count()

    return {
        revenue: totalRevenue.toFixed(2),
        orders: totalOrders,
        products: totalProducts,
        activeAmbassadors: 3, // Hardcoded as requested
        recentOrders: MOCK_ORDERS
    }
}
