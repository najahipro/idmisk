import { Feather, Truck, ShieldCheck } from "lucide-react";

export function FeaturesSection() {
    return (
        <section className="bg-secondary/10 py-12 md:py-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col items-center text-center space-y-4 p-8 bg-background rounded-2xl shadow-sm border border-secondary/20 transition-transform hover:-translate-y-1">
                        <div className="p-4 bg-secondary/20 rounded-full text-secondary-foreground">
                            <Feather className="h-8 w-8 text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold">Tissu Crêpe Premium</h3>
                        <p className="text-foreground/70">
                            Un tissu léger, opaque et respirant qui ne glisse pas et résiste aux froissements pour une tenue parfaite toute la journée.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4 p-8 bg-background rounded-2xl shadow-sm border border-secondary/20 transition-transform hover:-translate-y-1">
                        <div className="p-4 bg-secondary/20 rounded-full text-secondary-foreground">
                            <Truck className="h-8 w-8 text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold">Livraison Gratuite</h3>
                        <p className="text-foreground/70">
                            Profitez de la livraison offerte partout au Maroc. Recevez vos articles préférés directement chez vous.
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center space-y-4 p-8 bg-background rounded-2xl shadow-sm border border-secondary/20 transition-transform hover:-translate-y-1">
                        <div className="p-4 bg-secondary/20 rounded-full text-secondary-foreground">
                            <ShieldCheck className="h-8 w-8 text-secondary" />
                        </div>
                        <h3 className="text-xl font-bold">Paiement à la Livraison</h3>
                        <p className="text-foreground/70">
                            Commandez en toute confiance et payez uniquement lorsque vous recevez votre colis. Satisfait ou remboursé.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
