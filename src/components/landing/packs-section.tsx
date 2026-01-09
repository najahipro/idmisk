"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProductModal } from "./product-modal";

const packs = [
    {
        name: "Pack Découverte",
        quantity: "3 Hijabs",
        price: "170 DH",
        description: "Idéal pour commencer votre collection",
        popular: false,
        features: ["3 Hijabs Premium", "Couleurs au choix"]
    },
    {
        name: "Pack Best-Seller",
        quantity: "5 Hijabs",
        price: "269 DH",
        description: "Le choix préféré de nos clientes",
        popular: true,
        features: ["5 Hijabs Premium", "1 Bonnet Offert", "Livraison Gratuite"]
    },
    {
        name: "Pack Famille",
        quantity: "8+1 Gratuit",
        price: "399 DH",
        description: "La meilleure offre pour toute la famille",
        popular: false,
        features: ["9 Hijabs Premium", "2 Bonnets Offerts", "Livraison Prioritaire"]
    },
]

export function PacksSection() {
    const [selectedPack, setSelectedPack] = useState<typeof packs[0] | null>(null);

    return (
        <section id="packs" className="py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-2xl text-center mb-12 space-y-4">
                    <h2 className="font-serif text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
                        Nos Packs Exclusifs
                    </h2>
                    <p className="text-lg text-muted-foreground text-pretty">Choisissez le pack qui vous convient le mieux</p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {packs.map((pack, index) => (
                        <Card
                            key={index}
                            className={`relative flex flex-col ${pack.popular ? "border-primary shadow-lg scale-105 lg:scale-110" : ""
                                }`}
                        >
                            {pack.popular && (
                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                                    Le Plus Populaire
                                </Badge>
                            )}
                            <CardHeader className="space-y-2 text-center">
                                <CardTitle className="font-serif text-2xl">{pack.name}</CardTitle>
                                <CardDescription>{pack.quantity}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 space-y-4 text-center">
                                <div className="space-y-1">
                                    <p className="font-serif text-4xl font-bold text-primary">{pack.price}</p>
                                    <p className="text-sm text-muted-foreground">{pack.description}</p>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button
                                    onClick={() => setSelectedPack(pack)}
                                    className={`w-full ${pack.popular
                                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                        : "bg-secondary text-secondary-foreground hover:bg-secondary/90"
                                        }`}
                                >
                                    Commander ce Pack
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>

            <ProductModal
                isOpen={!!selectedPack}
                onClose={() => setSelectedPack(null)}
                product={selectedPack}
            />
        </section>
    )
}