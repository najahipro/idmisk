"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { useCurrency } from "@/context/currency-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ChevronRight, ArrowLeft } from "lucide-react"

const CITIES = [
    "Casablanca",
    "Rabat",
    "Marrakech",
    "Tanger",
    "Agadir",
    "Fès",
    "Autre ville..."
]

export default function CheckoutPage() {
    const { items, total: subtotal } = useCart()
    const { formatPrice } = useCurrency()
    const [city, setCity] = useState("Casablanca")
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const shippingCost = city === "Casablanca" ? 20 : 35
    const total = subtotal + shippingCost

    if (!isMounted) return null

    if (items.length === 0) {
        return (
            <div className="container mx-auto px-4 py-20 min-h-[60vh] flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-serif font-bold mb-4">Votre panier est vide</h1>
                <p className="text-muted-foreground mb-8">Ajoutez des produits à votre panier pour passer commande.</p>
                <Button asChild>
                    <Link href="/products">Continuer mes achats</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 md:px-6 py-10 pt-24 min-h-screen">
            {/* Breadcrumb-ish Header */}
            <div className="mb-8 flex items-center text-sm text-muted-foreground">
                <Link href="/products" className="flex items-center hover:text-primary transition-colors">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Retour à la boutique
                </Link>
                <div className="mx-4 h-4 w-px bg-border" />
                <span className="font-medium text-foreground">Validation de commande</span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8">Caisse</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                {/* Left Column: Shipping Form */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="border-border shadow-sm">
                        <CardHeader>
                            <CardTitle className="text-xl">Informations de livraison</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">Prénom</Label>
                                    <Input id="firstName" placeholder="Votre prénom" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Nom</Label>
                                    <Input id="lastName" placeholder="Votre nom" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">Téléphone</Label>
                                <Input id="phone" type="tel" placeholder="06..." />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="address">Adresse</Label>
                                <Input id="address" placeholder="N° Rue, Quartier..." />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="city">Ville</Label>
                                <Select value={city} onValueChange={setCity}>
                                    <SelectTrigger id="city" className="w-full">
                                        <SelectValue placeholder="Sélectionner votre ville" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CITIES.map((c) => (
                                            <SelectItem key={c} value={c}>{c}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-1">
                    <Card className="border-border shadow-md sticky top-24 bg-slate-50/50">
                        <CardHeader>
                            <CardTitle className="text-lg">Résumé de commande</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Cart Items List */}
                            <div className="space-y-3 max-h-[300px] overflow-auto pr-2">
                                {items.map((item) => (
                                    <div key={`${item.id}-${item.color}`} className="flex gap-4 py-2 border-b last:border-0 border-dashed">
                                        <div className="relative h-16 w-12 bg-muted rounded overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image || "/placeholder.jpg"}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                            <span className="absolute top-0 right-0 bg-gray-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-bl-md font-bold">
                                                {item.quantity}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">{item.color || "Standard"}</p>
                                        </div>
                                        <div className="text-sm font-semibold">
                                            {formatPrice(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Separator />

                            {/* Totals */}
                            <div className="space-y-1.5 pt-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Sous-total</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Livraison ({city})</span>
                                    <span className="font-medium text-green-700">
                                        {shippingCost === 0 ? "Gratuite" : formatPrice(shippingCost)}
                                    </span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center py-2">
                                <span className="text-base font-bold">Total</span>
                                <span className="text-xl font-bold font-serif">{formatPrice(total)}</span>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full text-lg h-12" size="lg">
                                Commander
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}
