import { auth } from "@/auth"
import { db } from "@/lib/db"
import { OrderCard, OrderType } from "@/components/order-card"
import { redirect } from "next/navigation"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function MyOrdersPage() {
    const session = await auth()

    if (!session?.user?.email) {
        redirect("/auth/login?callbackUrl=/my-orders")
    }

    // Fetch orders for logged in user (by email)
    const rawOrders = await db.order.findMany({
        where: {
            customerEmail: session.user.email
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const orders = rawOrders.map(o => ({
        ...o,
        items: o.items
    })) as OrderType[]

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-2xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-serif font-bold text-foreground">Mes Commandes</h1>
                    <Link href="/products">
                        <Button variant="outline">Boutique</Button>
                    </Link>
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-6">
                        {orders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border p-12 flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                            <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Aucune commande</h2>
                        <p className="text-muted-foreground mb-6">
                            Vous n'avez pas encore passé de commande.
                        </p>
                        <Link href="/products">
                            <Button size="lg">Découvrir nos produits</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
