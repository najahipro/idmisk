"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { OrderDetailsView } from "@/components/order/order-details-view"
import { getUserOrders, type OrderDetails } from "@/lib/orders"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function AuthenticatedOrderDetailsPage() {
    const params = useParams()
    const id = decodeURIComponent(params.id as string)
    const { data: session, status } = useSession()
    const router = useRouter()

    const [order, setOrder] = useState<OrderDetails | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login")
        } else if (status === "authenticated" && session?.user?.email) {
            // Find specific order
            getUserOrders(session.user.email)
                .then(orders => {
                    const found = orders.find(o => o.id === id)
                    setOrder(found || null)
                })
                .catch(err => console.error("Error fetching order"))
                .finally(() => setLoading(false))
        }
    }, [id, session, status, router])

    if (status === "loading" || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!order) {
        return (
            <div className="container mx-auto py-32 text-center">
                <div className="max-w-md mx-auto space-y-4">
                    <h1 className="text-2xl font-bold">Commande introuvable</h1>
                    <p className="text-muted-foreground">Impossible de trouver la commande {id}.</p>
                    <Link href="/my-orders">
                        <Button>Retour à mes commandes</Button>
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link href="/my-orders" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Retour à mes commandes
                </Link>

                <OrderDetailsView
                    order={order}
                    onCancel={() => alert("Cancel action mocked")}
                />
            </div>
        </div>
    )
}
