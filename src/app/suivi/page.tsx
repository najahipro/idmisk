"use client"

import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"
import { getOrderByPhone, type OrderDetails } from "@/lib/orders"
import { OrderDetailsView } from "@/components/order/order-details-view"
import { Loader2, Search, ArrowLeft } from "lucide-react"

export default function TrackingPage() {
    const { data: session } = useSession()

    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)
    const [order, setOrder] = useState<OrderDetails | null>(null) // Explicitly type as OrderDetails | null
    const [error, setError] = useState("")

    // Redirect logic removed as it is handled in the Header component

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!phone) return

        setLoading(true)
        setError("")
        setOrder(null)

        try {
            const result = await getOrderByPhone(phone)
            if (result) {
                setOrder(result)
            } else {
                setError("Aucune commande trouvée avec ce numéro (Essayer mock: 0600...)")
            }
        } catch (err) {
            setError("Une erreur est survenue.")
        } finally {
            setLoading(false)
        }
    }

    const resetSearch = () => {
        setOrder(null)
        setPhone("")
        setError("")
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b bg-white/50 backdrop-blur p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="font-serif text-xl font-bold text-primary">IDMISK Suivi</h1>
                    {order && (
                        <Button variant="ghost" size="sm" onClick={resetSearch}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Nouvelle recherche
                        </Button>
                    )}
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-4xl">
                {order ? (
                    <OrderDetailsView order={order} isGuest />
                ) : (
                    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border p-6 md:p-8 space-y-8">
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-bold font-serif">Suivre votre commande</h1>
                            <p className="text-muted-foreground">Entrez votre numéro de téléphone pour voir l'état de votre colis (Mode Invité).</p>
                        </div>

                        <form onSubmit={handleSearch} className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="tel"
                                    placeholder="06 00 00 00 00"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="flex-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <Button type="submit" disabled={loading}>
                                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Voir le statut"}
                                </Button>
                            </div>
                            {error && <p className="text-sm text-red-500 font-medium text-center">{error}</p>}
                        </form>

                        <div className="text-center text-sm pt-4 border-t">
                            <Link href="/login" className="text-primary hover:underline">
                                Se connecter pour voir mon historique
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
