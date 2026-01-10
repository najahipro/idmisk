import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag } from "lucide-react"

export default function MyOrdersPage() {
    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl text-center">
                <div className="bg-white rounded-xl border p-12 flex flex-col items-center">
                    <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
                    <h1 className="text-3xl font-serif font-bold text-foreground mb-2">Mes Commandes</h1>
                    <p className="text-muted-foreground mb-6">
                        Cette section est en cours de mise à jour. 
                        Veuillez revenir dans quelques instants.
                    </p>
                    <Link href="/products">
                        <Button>Continuer mes achats</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
