import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { OrderDetailsView, OrderDetails } from "@/components/order/order-details-view"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export const dynamic = "force-dynamic"

interface OrderPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function OrderDetailsPage({ params }: OrderPageProps) {
    const { id } = await params

    // DEBUG LOGS (Requested by User)
    console.log('-------------------------------------------')
    console.log('Searching for Order ID:', id)
    console.log('Type of ID:', typeof id)
    console.log('-------------------------------------------')

    // DB Query (By ID/PK as requested)
    const orderRaw = await db.order.findUnique({
        where: { id: id }
    })

    if (!orderRaw) {
        console.log('Order NOT found in DB for ID:', id)
        return (
            <div className="container mx-auto py-32 text-center">
                <div className="max-w-md mx-auto space-y-4">
                    <h1 className="text-2xl font-bold">Commande introuvable</h1>
                    <p className="text-muted-foreground">Nous ne trouvons pas la commande demandée (ID: {id}).</p>
                    <Link href="/">
                        <Button>Retour à l'accueil</Button>
                    </Link>
                </div>
            </div>
        )
    }

    console.log('Order FOUND:', orderRaw.id)

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
        total: `${orderRaw.total} DH`,
        customer: {
            name: orderRaw.customerName,
            phone: orderRaw.customerPhone,
            address: orderRaw.address,
            city: orderRaw.city
        },
        items: items.map((item: any) => ({
            id: item.id || `item-${Math.random()}`,
            title: item.title,
            image: item.image,
            price: `${item.price} DH`,
            quantity: item.quantity,
            color: item.color
        }))
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 max-w-5xl">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Retour à l'accueil
                </Link>

                <OrderDetailsView
                    order={order}
                    // For guests, we can't really "Cancel" via client context easily without auth or token.
                    // Passing empty handler or handling via server action later if needed.
                    onCancel={() => { }}
                />
            </div>
        </div>
    )
}
