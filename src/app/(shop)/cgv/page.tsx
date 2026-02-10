import { ScrollText, ShieldCheck } from "lucide-react"

export const metadata = {
    title: "Conditions Générales de Vente | IDMISK",
    description: "Conditions générales de vente, mentions légales et politique de confidentialité IDMISK.",
}

export default function CGVPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 text-primary">
                        <ScrollText className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Mentions Légales & CGV
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Transparence et confiance sont nos priorités.
                    </p>
                </div>

                <div className="bg-white border border-border rounded-xl p-8 md:p-12 shadow-sm space-y-10 text-justify">

                    {/* Section 1 */}
                    <section>
                        <h2 className="text-xl font-bold font-serif mb-4 flex items-center gap-2">
                            1. Préambule
                        </h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Les présentes conditions générales de vente (CGV) régissent l'ensemble des transactions effectuées sur le site web <strong>IDMISK</strong>. Toute commande passée sur ce site suppose l'acceptation inconditionnelle et irrévocable de ces conditions par le client.
                        </p>
                    </section>

                    <hr className="border-border/50" />

                    {/* Section 2 */}
                    <section>
                        <h2 className="text-xl font-bold font-serif mb-4">2. Prix</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Les prix de nos produits sont indiqués en <strong>Dirhams Marocains (MAD)</strong> toutes taxes comprises (TTC). IDMISK se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de l'enregistrement de la commande.
                        </p>
                    </section>

                    <hr className="border-border/50" />

                    {/* Section 3 */}
                    <section>
                        <h2 className="text-xl font-bold font-serif mb-4">3. Paiement</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Pour garantir votre sécurité et votre satisfaction, nous proposons uniquement le <strong>Paiement à la Livraison (Cash on Delivery)</strong>. Vous ne payez qu'une fois votre commande reçue et vérifiée. Aucun paiement en ligne par carte bancaire n'est requis sur le site.
                        </p>
                    </section>

                    <hr className="border-border/50" />

                    {/* Section 4 */}
                    <section>
                        <h2 className="text-xl font-bold font-serif mb-4">4. Livraison</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Nous livrons partout au Maroc. Les délais indiqués (généralement 24h à 72h) sont donnés à titre indicatif et peuvent varier selon la ville et les contraintes logistiques.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mt-2 p-4 bg-muted/30 rounded-lg">
                            <span className="font-semibold text-foreground">Important :</span> Le transporteur vous contactera toujours par téléphone pour confirmer l'adresse et l'heure de passage avant la livraison.
                        </p>
                    </section>

                    <hr className="border-border/50" />

                    {/* Section 5 */}
                    <section>
                        <h2 className="text-xl font-bold font-serif mb-4">5. Retours & Échanges</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Vous disposez d'un délai de <strong>7 jours</strong> après réception de votre commande pour procéder à un échange. Les articles doivent être retournés dans leur état d'origine, non portés, non lavés, et dans leur emballage. Les frais de retour peuvent être à la charge du client, sauf en cas d'erreur de notre part.
                        </p>
                    </section>

                    <hr className="border-border/50" />

                    {/* Section 6 */}
                    <section>
                        <h2 className="text-xl font-bold font-serif mb-4 flex items-center gap-2">
                            6. Protection des données
                        </h2>
                        <div className="flex gap-4 items-start">
                            <ShieldCheck className="w-6 h-6 text-green-600 shrink-0 mt-1" />
                            <p className="text-muted-foreground leading-relaxed">
                                Vos informations personnelles (nom, adresse, téléphone) sont collectées uniquement pour le traitement de votre commande. Elles sont strictement confidentielles et ne seront jamais vendues ni partagées avec des tiers à des fins commerciales, conformément à la législation marocaine en vigueur sur la protection des données personnelles.
                            </p>
                        </div>
                    </section>
                </div>

                <div className="text-center mt-12 text-muted-foreground text-sm">
                    © {new Date().getFullYear()} IDMISK. Tous droits réservés.
                </div>

            </div>
        </main>
    )
}
