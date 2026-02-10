import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, ShoppingCart, Users, ArrowUpRight } from "lucide-react"
import { getDashboardStats, getGraphRevenue } from "@/actions/get-graph-revenue"
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

// Loading skeleton components
function StatsCardSkeleton() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
            </CardContent>
        </Card>
    )
}

function ChartSkeleton() {
    return (
        <Card className="col-span-4">
            <CardHeader>
                <CardTitle>Aperçu des Ventes</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
                <div className="h-[350px] bg-gray-100 rounded animate-pulse" />
            </CardContent>
        </Card>
    )
}

function TableSkeleton() {
    return (
        <Card className="col-span-3">
            <CardHeader>
                <CardTitle>Dernières Commandes</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// Async components for data fetching
async function DashboardStats() {
    const stats = await getDashboardStats()

    return (
        <>
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
        </>
    )
}

async function RevenueChart() {
    const graphData = await getGraphRevenue()

    // Import the client component dynamically
    const { RevenueChartClient } = await import("./revenue-chart-client")

    return <RevenueChartClient data={graphData} />
}

async function RecentOrdersTable() {
    const recentOrders = await db.order.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
    })

    return (
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
    )
}

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold font-serif text-primary">Tableau de Bord (Live)</h1>

            {/* Cards Statistics with Suspense */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Suspense fallback={<><StatsCardSkeleton /><StatsCardSkeleton /><StatsCardSkeleton /><StatsCardSkeleton /></>}>
                    <DashboardStats />
                </Suspense>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Overview Chart with Suspense */}
                <Suspense fallback={<ChartSkeleton />}>
                    <RevenueChart />
                </Suspense>

                {/* Recent Orders Table with Suspense */}
                <Suspense fallback={<TableSkeleton />}>
                    <RecentOrdersTable />
                </Suspense>
            </div>
        </div>
    )
}
