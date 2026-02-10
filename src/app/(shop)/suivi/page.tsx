import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/db"
import { OrderCard, OrderType } from "@/components/order-card"
import { Search, ShoppingBag, ArrowRight, Eye, Clock, CheckCircle, Truck, XCircle, Home } from "lucide-react"
import { redirect } from "next/navigation"
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
import Link from "next/link"

export const dynamic = "force-dynamic"

interface SuiviPageProps {
    searchParams: Promise<{
        phone?: string
    }>
}

import { auth } from "@/auth"

export default async function SuiviPage({ searchParams }: SuiviPageProps) {
    const session = await auth()
    if (session?.user) {
        redirect("/my-orders")
    }

    const { phone } = await searchParams
    let orders: OrderType[] = []
    let hasSearched = false

    if (phone) {
        hasSearched = true
        // Normalize phone search if needed
        const rawOrders = await db.order.findMany({
            where: {
                customerPhone: {
                    contains: phone.trim()
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        // Cast to OrderType
        orders = rawOrders.map(o => ({
            ...o,
            items: o.items
        })) as OrderType[]

        // Smart Redirection: If only 1 order, go straight to details
        if (orders.length === 1) {
            redirect(`/suivi/${orders[0].id}`)
        }
    }

    async function searchAction(formData: FormData) {
        "use server"
        const phone = formData.get("phone") as string
        if (phone) {
            redirect(`/suivi?phone=${encodeURIComponent(phone)}`)
        }
    }

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

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-serif font-bold text-foreground mb-4">Suivi de Commande</h1>
                    <p className="text-muted-foreground">
                        Entrez votre numéro de téléphone pour voir l'état de vos commandes.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-xl border shadow-sm mb-10">
                    <form action={searchAction} className="flex gap-3">
                        <Input
                            name="phone"
                            type="tel"
                            placeholder="Ex: 0612345678"
                            defaultValue={phone}
                            required
                            className="flex-1 h-12 text-lg"
                        />
                        <Button type="submit" size="lg" className="h-12 px-8">
                            <Search className="w-4 h-4 mr-2" /> Suivre
                        </Button>
                    </form>
                </div>

                {hasSearched && (
                    <div className="space-y-6">
                        {orders.length > 0 ? (
                            <>
                                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <ShoppingBag className="w-5 h-5" />
                                    {orders.length} commande{orders.length > 1 ? 's' : ''} trouvée{orders.length > 1 ? 's' : ''}
                                </h2>

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
                                                        <Link href={`/suivi/${order.id}`}>
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
                            </>
                        ) : (
                            <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-medium mb-1">Aucune commande trouvée</h3>
                                <p className="text-muted-foreground">
                                    Aucune commande associée au numéro "{phone}". <br />
                                    Vérifiez le numéro et réessayez.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
