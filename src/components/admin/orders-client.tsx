"use client"

import { updateOrderStatus } from "@/actions/orders"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { useTransition } from "react"
import { RefreshCw } from "lucide-react"
import { useRouter } from "next/navigation"

interface Order {
    id: string
    customerName: string
    customerPhone: string
    address: string
    city: string
    status: string
    total: number
    items: string
    createdAt: Date
}

interface OrdersClientProps {
    orders: Order[]
}

export function OrdersClient({ orders }: OrdersClientProps) {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleStatusChange = async (orderId: string, newStatus: string) => {
        startTransition(async () => {
            await updateOrderStatus(orderId, newStatus)
            router.refresh()
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "En attente": return "bg-yellow-100 text-yellow-800"
            case "En cours": return "bg-blue-100 text-blue-800"
            case "Expédié": return "bg-purple-100 text-purple-800"
            case "Livré": return "bg-green-100 text-green-800"
            case "Annulé": return "bg-red-100 text-red-800"
            default: return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <Button variant="outline" size="sm" onClick={() => router.refresh()}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Actualiser
                </Button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Client</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Ville</TableHead>
                            <TableHead>Total</TableHead>
                            <TableHead>Statut</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                    Aucune commande trouvée.
                                </TableCell>
                            </TableRow>
                        ) : (
                            orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.customerName}</TableCell>
                                    <TableCell>{order.customerPhone}</TableCell>
                                    <TableCell>{order.city}</TableCell>
                                    <TableCell className="font-bold">{order.total} DH</TableCell>
                                    <TableCell>
                                        <select
                                            disabled={isPending}
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`h-8 w-[130px] rounded-md border-0 px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-primary ${getStatusColor(order.status)}`}
                                        >
                                            <option value="En attente">En attente</option>
                                            <option value="En cours">En cours</option>
                                            <option value="Expédié">Expédié</option>
                                            <option value="Livré">Livré</option>
                                            <option value="Annulé">Annulé</option>
                                        </select>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-xs">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
