import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, Phone, Truck, CreditCard, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata = {
    title: "FAQ | IDMISK",
    description: "Questions fréquentes sur la livraison, les retours et l'entretien de nos produits.",
}

export default function FAQPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-2xl">

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 text-primary">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Questions Fréquentes
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Vous avez des questions ? Nous avons les réponses.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Catégorie : Livraison */}
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                <Truck className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold font-serif">Livraison & Expédition</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="delais">
                                <AccordionTrigger className="text-left font-medium">
                                    Quels sont les délais de livraison ?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    <p className="mb-2">Nous livrons partout au Maroc :</p>
                                    <ul className="list-disc pl-5 space-y-1 mb-2">
                                        <li><strong>Casablanca :</strong> Livraison express en 24h.</li>
                                        <li><strong>Autres villes :</strong> Livraison sous 48h à 72h ouvrables.</li>
                                    </ul>
                                    <p>Le livreur vous contactera par téléphone le jour de la livraison pour confirmer l'heure et l'adresse.</p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="verification">
                                <AccordionTrigger className="text-left font-medium">
                                    Puis-je vérifier ma commande avant de payer ?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    <span className="text-green-600 font-bold">Oui, absolument !</span>
                                    <br />
                                    Chez IDMISK, la transparence est primordiale. Vous avez le droit d'ouvrir votre colis devant le livreur pour vérifier la qualité et la conformité des articles avant de procéder au paiement.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Catégorie : Paiement */}
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-green-100 p-2 rounded-full text-green-600">
                                <CreditCard className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold font-serif">Paiement</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="moyens-paiement">
                                <AccordionTrigger className="text-left font-medium">
                                    Comment puis-je payer ma commande ?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    Nous proposons le <strong>paiement à la livraison (COD)</strong> uniquement. Vous ne payez qu'une fois votre colis reçu et vérifié, en espèces directement auprès du livreur.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>

                    {/* Catégorie : Produits & Boutique */}
                    <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                                <ShoppingBag className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl font-bold font-serif">Produits & Services</h2>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="echange">
                                <AccordionTrigger className="text-left font-medium">
                                    Comment échanger un article ?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    Vous disposez de <strong>7 jours</strong> après réception pour demander un échange. Contactez-nous simplement sur WhatsApp. L'article doit être dans son état d'origine, ni porté ni lavé.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="magasin">
                                <AccordionTrigger className="text-left font-medium">
                                    Où se trouve votre magasin ?
                                </AccordionTrigger>
                                <AccordionContent className="text-muted-foreground leading-relaxed">
                                    Nous sommes une boutique <strong>100% en ligne</strong> basée à Casablanca. Cela nous permet de réduire nos frais et de vous proposer la meilleure qualité au meilleur prix, livré directement chez vous.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-muted-foreground mb-4">Vous ne trouvez pas votre réponse ?</p>
                    <a href="/contact">
                        <Button className="gap-2">
                            <Phone className="w-4 h-4" /> Contactez-nous
                        </Button>
                    </a>
                </div>

            </div>
        </main>
    )
}
