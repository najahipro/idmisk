"use client"

import Link from "next/link"

export default function MentionsLegalesPage() {
    return (
        <div className="min-h-screen bg-background py-16 px-4 md:px-6">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                        Mentions Légales
                    </h1>
                    <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-8 space-y-8 text-sm md:text-base">

                    <section>
                        <h2 className="text-lg font-bold font-serif mb-2 text-foreground">Éditeur du site</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Ce site est édité par la marque <strong>IDMISK</strong>.<br />
                            IDMISK est une marque marocaine spécialisée dans le Hijab et la Modest Fashion, dédiée à offrir élégance et qualité.
                        </p>
                    </section>

                    <div className="h-px bg-border/50"></div>

                    <section>
                        <h2 className="text-lg font-bold font-serif mb-2 text-foreground">Siège Social</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Casablanca, Maroc.
                        </p>
                    </section>

                    <div className="h-px bg-border/50"></div>

                    <section>
                        <h2 className="text-lg font-bold font-serif mb-2 text-foreground">Contact</h2>
                        <div className="text-muted-foreground space-y-2">
                            <p>Pour toute question ou information, vous pouvez nous contacter :</p>
                            <ul className="list-disc pl-5 space-y-1">
                                <li>Par email : <a href="mailto:contact@idmisk.com" className="text-primary hover:underline">contact@idmisk.com</a></li>
                                <li>Par WhatsApp : via le bouton de contact sur le site.</li>
                            </ul>
                        </div>
                    </section>

                    <div className="h-px bg-border/50"></div>

                    <section>
                        <h2 className="text-lg font-bold font-serif mb-2 text-foreground">Propriété Intellectuelle</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            Tous les éléments du site IDMISK (textes, images, logos) sont protégés par le droit d'auteur. Toute reproduction totale ou partielle est interdite sans autorisation préalable.
                        </p>
                    </section>

                </div>
            </div>
        </div>
    )
}
