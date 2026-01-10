import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/db"
import { OrderCard, OrderType } from "@/components/order-card"
import { Search, ShoppingBag } from "lucide-react"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

interface SuiviPageProps {
    searchParams: Promise<{
        phone?: string
    }>
}

export default async function SuiviPage({ searchParams }: SuiviPageProps) {
    const { phone } = await searchParams
    let orders: OrderType[] = [] // explicitly typed
    let hasSearched = false

    if (phone) {
        hasSearched = true
        // Normalize phone search if needed, strictly partial match or exact?
        // Let's do exact match for now as requested "via ONLY their Phone Number"
        // But users might format differently. Let's start with contains or exact.
        // Prisma SQLite 'contains' is easy.

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

        // Cast to OrderType (ensure items is string)
        orders = rawOrders.map(o => ({
            ...o,
            // safety check if schema differs in future
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

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-2xl">

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
                                <div className="space-y-6">
                                    {orders.map(order => (
                                        <OrderCard key={order.id} order={order} href={`/suivi/${order.id}`} />
                                    ))}
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
