"use client"

import { useParams, useRouter } from "next/navigation"
import { useOrder } from "@/context/order-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { OrderDetailsView } from "@/components/order/order-details-view"
import { ChevronLeft } from "lucide-react"

export default function OrderDetailsPage() {
    const params = useParams()
    const id = decodeURIComponent(params.id as string)
    const router = useRouter()
    const { orders, cancelOrder } = useOrder()

    const order = orders.find(o => o.id === id)

    if (!order) {
        return (
            <div className="container mx-auto py-32 text-center">
                <div className="max-w-md mx-auto space-y-4">
                    <h1 className="text-2xl font-bold">Commande introuvable</h1>
                    <p className="text-muted-foreground">Nous ne trouvons pas la commande demandée.</p>
                    <Link href="/">
                        <Button>Retour à l'accueil</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const handleCancel = () => {
        if (confirm("Êtes-vous sûr de vouloir annuler cette commande ?")) {
            cancelOrder(order.id)
        }
    }

    // Map Order to OrderDetails (converting price number to string)
    const mappedOrder = {
        ...order,
        items: order.items.map(item => ({
            ...item,
            price: `${item.price} DH` // Convert number to string
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link href="/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Continuer mes achats
                </Link>

                <OrderDetailsView
                    order={mappedOrder}
                    onCancel={handleCancel}
                />
            </div>
        </div>
    )
}
