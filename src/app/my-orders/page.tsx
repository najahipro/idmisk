import { auth } from "@/auth"
import { db } from "@/lib/db"
import { OrderType } from "@/components/order-card"
import { redirect } from "next/navigation"
import { ShoppingBag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { fr } from "date-fns/locale"

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

    const getStatusColor = (status: string) => {
        const s = status.toLowerCase()
        if (s.includes('attente')) return "bg-yellow-100 text-yellow-800"
        if (s.includes('cours')) return "bg-blue-100 text-blue-800"
        if (s.includes('expédié')) return "bg-purple-100 text-purple-800"
        if (s.includes('livré')) return "bg-green-100 text-green-800"
        if (s.includes('annulé')) return "bg-red-100 text-red-800"
        return "bg-gray-100 text-gray-800"
    }

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-serif font-bold text-foreground">Mes Commandes</h1>
                    <Link href="/products">
                        <Button variant="outline">Boutique</Button>
                    </Link>
                </div>

                {orders.length > 0 ? (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                            <Table>
                                <TableHeader className="bg-gray-50">
                                    <TableRow>
                                        <TableHead>Commande</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">Total</TableHead>
                                        <TableHead className="w-[100px]"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.id} className="group hover:bg-gray-50/50">
                                            <TableCell className="font-mono font-medium">#{order.id.slice(0, 8)}</TableCell>
                                            <TableCell className="text-muted-foreground">
                                                {format(new Date(order.createdAt), "dd/MM/yyyy", { locale: fr })}
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary" className={cn("font-normal border-0", getStatusColor(order.status))}>
                                                    {order.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-medium">
                                                {order.total} DH
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/my-orders/${order.id}`}>
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
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
