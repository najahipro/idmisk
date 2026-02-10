import { Truck, PhoneCall, Wallet, MapPin, PackageCheck, Clock } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
    title: "Livraison et Paiement | IDMISK",
    description: "Informations sur la livraison partout au Maroc et le paiement à la livraison chez IDMISK.",
}

export default function DeliveryPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">

                {/* Hero Header */}
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
                        Livraison & Paiement
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Nous expédions vos commandes avec soin partout au Maroc.
                        Voici tout ce que vous devez savoir pour une réception en toute sérénité.
                    </p>
                </div>

                {/* Section 1: Tarifs */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                            <MapPin className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold">Zones et Tarifs</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="border-border bg-card">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <span className="font-bold text-lg mb-2">Casablanca</span>
                                <span className="text-4xl font-bold text-primary mb-4">20 DH</span>
                                <p className="text-sm text-muted-foreground">
                                    Livraison rapide assurée par nos coursiers locaux.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-border bg-card">
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <span className="font-bold text-lg mb-2">Autres Villes</span>
                                <span className="text-4xl font-bold text-primary mb-4">35 DH</span>
                                <p className="text-sm text-muted-foreground">
                                    Livraison partout au Maroc via nos partenaires logistiques.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-yellow-400 bg-yellow-50 relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded-bl">
                                OFFRE SPÉCIALE
                            </div>
                            <CardContent className="p-6 flex flex-col items-center text-center">
                                <span className="font-bold text-lg mb-2 text-yellow-900">Packs Cadeaux</span>
                                <span className="text-3xl font-bold text-yellow-700 mb-4">GRATUITE</span>
                                <div className="p-2 bg-white rounded-full mb-2 shadow-sm">
                                    <PackageCheck className="w-5 h-5 text-yellow-600" />
                                </div>
                                <p className="text-sm text-yellow-800 font-medium">
                                    Profitez de la livraison offerte sur tous nos coffrets cadeaux.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </section>

                {/* Section 2: Processus */}
                <section className="mb-16">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                            <Truck className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold">Comment ça marche ?</h2>
                    </div>

                    <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-12 pb-4">
                        {/* Step 1 */}
                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <PackageCheck className="w-4 h-4 text-muted-foreground" />
                                Validation
                            </h3>
                            <p className="text-muted-foreground">
                                Une fois votre commande passée, notre équipe la prépare avec soin. Vous recevrez une notification de confirmation.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                Expédition
                            </h3>
                            <p className="text-muted-foreground">
                                Votre colis est confié au livreur. Bien que nous visions la rapidité, les délais peuvent varier selon votre ville et la charge de travail logistique.
                            </p>
                        </div>

                        {/* Step 3 - CRITICAL */}
                        <div className="relative pl-8 md:pl-12">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary animate-pulse ring-4 ring-background" />
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2 text-primary">
                                <PhoneCall className="w-5 h-5" />
                                Appel du Livreur (Important)
                            </h3>
                            <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-lg text-yellow-800">
                                <p className="font-medium">
                                    Le livreur vous contactera TOUJOURS par téléphone avant de passer.
                                </p>
                                <p className="text-sm mt-1 opacity-90">
                                    Restez joignable ! Il fixera avec vous l'heure exacte de livraison ou le point de rencontre qui vous convient le mieux.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 3: Paiement */}
                <section>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-primary/10 rounded-full text-primary">
                            <Wallet className="w-6 h-6" />
                        </div>
                        <h2 className="text-2xl font-serif font-bold">Paiement Sécurisé</h2>
                    </div>

                    <Card className="bg-muted/30 border-none">
                        <CardContent className="p-8 flex flex-col md:flex-row items-center gap-6">
                            <div className="shrink-0 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-green-600">
                                <Wallet className="w-8 h-8" />
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className="font-bold text-xl mb-2">Paiement à la Livraison (Cash on Delivery)</h3>
                                <p className="text-muted-foreground">
                                    Ne payez aucun frais à l'avance ! Vous réglez le montant total de votre commande directement au livreur, en espèces, au moment où vous recevez votre colis.
                                </p>
                                <p className="text-sm font-medium text-foreground mt-4 flex items-center justify-center md:justify-start gap-2">
                                    <PackageCheck className="w-4 h-4" />
                                    Vous pouvez vérifier votre commande à la réception.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </section>

            </div>
        </main>
    )
}
