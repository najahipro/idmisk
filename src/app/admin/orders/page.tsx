import { db } from "@/lib/db"
import { OrdersClient } from "@/components/admin/orders-client"

export const dynamic = "force-dynamic"

export default async function OrdersPage() {
    const orders = await db.order.findMany({
        orderBy: { createdAt: 'desc' }
    })

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Gestion des Commandes</h2>
            <OrdersClient orders={orders} />
        </div>
    )
}
