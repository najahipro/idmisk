
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, Users, ArrowUpRight } from "lucide-react"
import { getDashboardStats, getGraphRevenue } from "@/actions/get-graph-revenue"
import { Overview } from "@/components/admin/overview"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export const dynamic = 'force-dynamic'

export default async function AdminDashboard() {
    const stats = await getDashboardStats()
    const graphData = await getGraphRevenue()

    // Fetch Recent Orders (Real Data)
    const recentOrders = await db.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    })

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-serif text-primary">Tableau de Bord (Live)</h1>

            {/* Cards Statistics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenu Total</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalRevenue.toFixed(2)} DH</div>
                        <div className="flex items-center text-xs text-green-600 font-bold mt-1">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> Données réelles
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Commandes</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.salesCount}</div>
                        <p className="text-xs text-muted-foreground">Total commandes</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Produits</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.stockCount}</div>
                        <p className="text-xs text-muted-foreground">En stock</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ambassadrices</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeAmbassadors}</div>
                        <p className="text-xs text-muted-foreground">À venir...</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Overview Chart */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Aperçu des Ventes</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={graphData} />
                    </CardContent>
                </Card>

                {/* Recent Orders Table */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Dernières Commandes</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Client</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Montant</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentOrders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell className="font-medium">{order.customerEmail || "Guest"}</TableCell>
                                        <TableCell>{new Date(order.createdAt).toLocaleDateString('fr-FR')}</TableCell>
                                        <TableCell className="text-right">{order.total} DH</TableCell>
                                    </TableRow>
                                ))}
                                {recentOrders.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center text-muted-foreground">
                                            Aucune commande.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}