import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function FAQSection() {
    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground font-serif">
                        Questions Fréquentes
                    </h2>
                    <p className="mt-4 text-foreground/70">
                        Tout ce que vous devez savoir avant de commander.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full bg-background rounded-xl border px-4 md:px-8 py-2">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="text-left">Comment se passe le paiement ?</AccordionTrigger>
                        <AccordionContent>
                            Paiement à la livraison. Vous ne payez qu'après avoir reçu et vérifié votre commande.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger className="text-left">Quel est le délai de livraison ?</AccordionTrigger>
                        <AccordionContent>
                            24 à 48 heures partout au Maroc. Nos livreurs vous contactent avant leur passage.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger className="text-left">Puis-je retourner le produit ?</AccordionTrigger>
                        <AccordionContent>
                            Oui, vous avez 3 jours pour vérifier la qualité. Si le produit ne vous convient pas, nous procédons à l'échange ou au remboursement.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </section>
    );
}
