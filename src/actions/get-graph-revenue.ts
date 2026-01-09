"use server"

import { db } from "@/lib/db"

interface GraphData {
    name: string
    total: number
}

export async function getGraphRevenue(): Promise<GraphData[]> {
    const paidOrders = await db.order.findMany({
        where: {
            status: { in: ['Livré', 'Payé', 'En cours'] } // Assuming these contribute to revenue view
        },
    })

    const monthlyRevenue: { [key: number]: number } = {}

    for (const order of paidOrders) {
        const month = order.createdAt.getMonth() // 0 for Jan, 1 for Feb...
        monthlyRevenue[month] = (monthlyRevenue[month] || 0) + order.total
    }

    const graphData: GraphData[] = [
        { name: "Jan", total: 0 },
        { name: "Fev", total: 0 },
        { name: "Mar", total: 0 },
        { name: "Avr", total: 0 },
        { name: "Mai", total: 0 },
        { name: "Juin", total: 0 },
        { name: "Juil", total: 0 },
        { name: "Août", total: 0 },
        { name: "Sep", total: 0 },
        { name: "Oct", total: 0 },
        { name: "Nov", total: 0 },
        { name: "Dec", total: 0 },
    ]

    for (const month in monthlyRevenue) {
        graphData[parseInt(month)].total = monthlyRevenue[month]
    }

    return graphData
}

export async function getDashboardStats() {
    const totalRevenue = await db.order.aggregate({
        _sum: {
            total: true,
        },
        where: {
            status: { in: ['Livré', 'Payé', 'En cours'] }
        }
    })

    const salesCount = await db.order.count()
    const stockCount = await db.product.count()
    const activeAmbassadors = 3 // Still mock for now as we don't have ambassador system

    return {
        totalRevenue: totalRevenue._sum.total || 0,
        salesCount,
        stockCount,
        activeAmbassadors
    }
}
