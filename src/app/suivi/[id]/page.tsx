import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { OrderDetailsView, OrderDetails } from "@/components/order/order-details-view"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { useCurrency } from "@/context/currency-context"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

interface GuestOrderPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function GuestOrderPage({ params }: GuestOrderPageProps) {
    const { id } = await params

    const orderRaw = await db.order.findUnique({
        where: { id: id }
    })

    if (!orderRaw) {
        return notFound()
    }

    // Parse items
    let items: any[] = []
    try {
        items = JSON.parse(orderRaw.items)
    } catch (e) {
        items = []
    }

    // Map to view interface
    const order: OrderDetails = {
        id: orderRaw.id,
        date: format(new Date(orderRaw.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr }),
        status: orderRaw.status,
        total: `${orderRaw.total} DH`, // Format with currency symbol
        customer: {
            name: orderRaw.customerName,
            phone: orderRaw.customerPhone,
            address: orderRaw.address,
            city: orderRaw.city
        },
        items: items.map((item: any) => ({
            id: item.id || `item-${Math.random()}`, // Fallback ID
            title: item.title,
            image: item.image,
            price: `${item.price} DH`,
            quantity: item.quantity,
            color: item.color
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-8">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">
                <Link href="/suivi" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Retour à la recherche
                </Link>

                <OrderDetailsView order={order} isGuest={true} />
            </div>
        </div>
    )
}
