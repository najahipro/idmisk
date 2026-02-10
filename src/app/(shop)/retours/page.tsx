"use client"

import { MessageCircle, RefreshCw, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RetoursPage() {
    return (
        <div className="min-h-screen bg-background py-16 px-4 md:px-6">
            <div className="container mx-auto max-w-3xl">
                <div className="text-center mb-12">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                        Échanges et Retours
                    </h1>
                    <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border p-8 space-y-8">
                    {/* Intro */}
                    <div className="text-center max-w-lg mx-auto mb-8">
                        <p className="text-lg font-medium text-foreground">
                            Votre satisfaction est notre priorité absolue.
                        </p>
                        <p className="text-muted-foreground mt-2">
                            Si le produit ne vous convient pas, nous avons simplifié la procédure pour vous.
                        </p>
                    </div>

                    {/* Policy Box */}
                    <section className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                        <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                            <RefreshCw className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl font-bold font-serif mb-2">3 Jours pour changer d'avis</h2>
                        <p className="text-muted-foreground text-sm">
                            Vous disposez de <span className="font-bold text-foreground">3 jours</span> après la réception de votre commande pour demander un échange.
                        </p>
                    </section>

                    {/* Conditions */}
                    <section>
                        <h3 className="text-lg font-bold font-serif mb-4 flex items-center gap-2">
                            <AlertCircle className="w-5 h-5 text-primary" />
                            Conditions de Retour
                        </h3>
                        <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
                            <li>Le produit doit être dans son <strong>emballage d'origine</strong>.</li>
                            <li>Le produit ne doit <strong>jamais avoir été porté</strong> ni lavé.</li>
                            <li>L'étiquette doit être intacte.</li>
                            <li>Les frais de retour sont à la charge du client, sauf en cas d'erreur de notre part.</li>
                        </ul>
                    </section>

                    <div className="h-px bg-border/50"></div>

                    {/* Contact Action */}
                    <section className="text-center">
                        <h3 className="text-lg font-bold font-serif mb-4">
                            Comment faire une demande ?
                        </h3>
                        <p className="text-muted-foreground text-sm mb-6">
                            Contactez simplement notre service client sur WhatsApp avec votre numéro de commande.
                        </p>
                        <Button className="bg-[#25D366] hover:bg-[#128C7E] text-white gap-2 h-12 px-8 rounded-full shadow-lg hover:shadow-xl transition-all">
                            <MessageCircle className="w-5 h-5" />
                            Contacter le Service Client
                        </Button>
                    </section>
                </div>
            </div>
        </div>
    )
}
