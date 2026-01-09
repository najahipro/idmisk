import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Package, Truck, ShoppingBag, AlertCircle, ArrowRight } from "lucide-react"

// HADA HOWA L MO5ADDIR (Mra wa7da safi)
export const dynamic = "force-dynamic";

export default async function MyOrdersPage() {
    const session = await auth()

    if (!session || !session.user?.email) {
        redirect("/login")
    }

    const orders = await db.order.findMany({
        where: {
            customerEmail: session.user.email
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const getStatusBadge = (status: string) => {
        const s = status.toLowerCase()
        if (s.includes('attente')) return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit"><Clock className="w-3 h-3" /> {status}</span>
        if (s.includes('cours') || s.includes('préparation')) return <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit"><Package className="w-3 h-3" /> {status}</span>
        if (s.includes('expédié')) return <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit"><Truck className="w-3 h-3" /> {status}</span>
        if (s.includes('livré')) return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" /> {status}</span>
        if (s.includes('annulé')) return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full flex items-center gap-1 w-fit"><AlertCircle className="w-3 h-3" /> {status}</span>

        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full w-fit">{status}</span>
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-foreground">Mes Commandes</h1>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl border p-12 text-center">
                        <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                        <h2 className="text-xl font-medium mb-2">Aucune commande trouvée</h2>
                        <p className="text-muted-foreground mb-6">Vous n'avez pas encore passé de commande avec ce compte.</p>
                        <Link href="/products">
                            <Button>Découvrir la boutique</Button>
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-muted/50 border-b">
                                    <tr>
                                        <th className="p-4 font-medium text-muted-foreground">Commande</th>
                                        <th className="p-4 font-medium text-muted-foreground">Date</th>
                                        <th className="p-4 font-medium text-muted-foreground">Statut</th>
                                        <th className="p-4 font-medium text-muted-foreground text-right">Total</th>
                                        <th className="p-4 font-medium text-muted-foreground text-center">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                                            <td className="p-4 font-medium">#{order.id.slice(0, 8)}</td>
                                            <td className="p-4 text-muted-foreground">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">{getStatusBadge(order.status)}</td>
                                            <td className="p-4 font-bold text-right">
                                                {order.total} DH
                                            </td>
                                            <td className="p-4 text-center">
                                                <Link href={`/orders/${order.id}`}>
                                                    <Button variant="outline" size="sm" className="gap-2 text-primary hover:text-primary border-primary/20 hover:border-primary">
                                                        Suivre
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}