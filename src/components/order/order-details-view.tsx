"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Clock, Truck, Home, AlertCircle, XCircle, ChevronLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from "next/image"

// Define a compatible Order interface for the view
export interface OrderDetails {
    id: string
    date: string
    status: string
    total: string // formatted string or number that can be displayed
    customer: {
        name: string
        phone: string
        city: string
        address: string
    }
    items: {
        id: string
        title: string
        image: string
        price: string
        quantity: number
        color?: string
    }[]
}

interface OrderDetailsViewProps {
    order: OrderDetails
    onCancel?: () => void
    isGuest?: boolean
}

export function OrderDetailsView({ order, onCancel, isGuest = false }: OrderDetailsViewProps) {
    const steps = [
        { label: "Confirmé", value: "En attente", icon: CheckCircle },
        { label: "En préparation", value: "En cours", icon: Clock },
        { label: "Expédié", value: "Expédié", icon: Truck },
        { label: "Livré", value: "Livré", icon: Home },
    ]

    const isCancelled = order.status === "Annulé" || order.status === "Annulée"

    // Maps status to step index
    // Statuses order: En attente -> En cours/En préparation -> Expédié -> Livré
    let currentStepIndex = 0
    const statusLower = order.status.toLowerCase()

    if (statusLower.includes("cours") || statusLower.includes("préparation")) currentStepIndex = 1
    if (statusLower.includes("expédié")) currentStepIndex = 2
    if (statusLower.includes("livré")) currentStepIndex = 3

    // Allow cancellation only if "En attente" or "Confirmé"
    const isCancellable = order.status === "En attente" || order.status === "Confirmé"

    const getStatusColor = (status: string) => {
        const s = status.toLowerCase()
        if (s.includes('attente') || s.includes('confirmé')) return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
        if (s.includes('cours') || s.includes('préparation')) return "bg-blue-100 text-blue-800 hover:bg-blue-100"
        if (s.includes('expédié')) return "bg-purple-100 text-purple-800 hover:bg-purple-100"
        if (s.includes('livré')) return "bg-green-100 text-green-800 hover:bg-green-100"
        if (s.includes('annulé')) return "bg-red-100 text-red-800 hover:bg-red-100"
        return "bg-gray-100 text-gray-800"
    }

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gray-900">
                        {isGuest ? `Suivi de Commande` : `Détails de la commande`}
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2 mt-1">
                        Commande <span className="font-mono font-medium text-foreground">{order.id}</span>
                        <span className="hidden md:inline">•</span>
                        <span>Passée le {order.date}</span>
                    </p>
                </div>
                <div>
                    <Badge className={cn("px-4 py-1.5 text-sm font-medium border-none", getStatusColor(order.status))}>
                        {order.status}
                    </Badge>
                </div>
            </div>

            {/* Stepper Card */}
            <Card className="border-none shadow-md overflow-hidden">
                <CardContent className="p-8">
                    {isCancelled ? (
                        <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
                            <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                                <XCircle className="h-8 w-8" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-red-700">Commande Annulée</h3>
                                <p className="text-muted-foreground mt-1">Cette commande a été annulée et ne sera pas expédiée.</p>
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            {/* Desktop Connector Line */}
                            <div className="hidden md:block absolute top-[24px] left-[10%] right-[10%] h-[3px] bg-gray-100 rounded-full" />
                            {/* Active Progress Line */}
                            <div
                                className="hidden md:block absolute top-[24px] left-[10%] h-[3px] bg-green-500 rounded-full transition-all duration-500"
                                style={{ width: `${currentStepIndex * 30}%` }} // Approx percentage
                            />

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
                                {steps.map((step, idx) => {
                                    const isCompleted = idx <= currentStepIndex
                                    const isCurrent = idx === currentStepIndex
                                    const Icon = step.icon

                                    return (
                                        <div key={step.value} className="flex md:flex-col items-center gap-4 md:gap-4 relative z-10 bg-white md:bg-transparent p-2 md:p-0 rounded-lg">
                                            <div className={cn(
                                                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
                                                isCompleted ? "bg-green-500 text-white shadow-green-200" : "bg-white border-2 border-gray-200 text-gray-300",
                                                isCurrent && "ring-4 ring-green-100 scale-110"
                                            )}>
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div className="md:text-center">
                                                <p className={cn(
                                                    "font-bold text-sm",
                                                    isCompleted ? "text-green-700" : "text-gray-400"
                                                )}>
                                                    {step.label}
                                                </p>
                                                {isCurrent && <p className="text-xs text-green-600 font-medium mt-0.5 animate-pulse">En cours</p>}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left Column: Items */}
                <div className="md:col-span-2 space-y-6">
                    <Card className="border-none shadow-md overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b px-6 py-4">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Badge variant="outline" className="bg-white">{order.items.length}</Badge>
                                Articles commandés
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 p-6 hover:bg-gray-50/50 transition-colors">
                                        <div className="relative h-24 w-24 bg-gray-100 rounded-lg overflow-hidden border shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <Link href={`/products/${item.id}`} className="font-bold text-gray-900 hover:text-primary transition-colors line-clamp-1 mb-1">
                                                {item.title}
                                            </Link>
                                            {item.color && (
                                                <p className="text-sm text-muted-foreground mb-2">Couleur : <span className="font-medium text-foreground">{item.color}</span></p>
                                            )}
                                            <div className="flex items-center gap-3">
                                                <Badge variant="secondary" className="text-xs font-normal">
                                                    Qté: {item.quantity}
                                                </Badge>
                                                <span className="font-bold text-primary">{item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Summary & Actions */}
                <div className="space-y-6">
                    <Card className="border-none shadow-md">
                        <CardHeader className="bg-gray-50/50 border-b px-6 py-4">
                            <CardTitle className="text-lg">Résumé & Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-6">
                            {/* Customer Info */}
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-md shrink-0">
                                        <Home className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase text-muted-foreground mb-1">Livrer à</p>
                                        <p className="font-medium text-sm">{order.customer.name}</p>
                                        <p className="text-sm text-muted-foreground leading-snug mt-0.5">{order.customer.address}</p>
                                        <p className="text-sm text-muted-foreground">{order.customer.city}</p>
                                        <p className="text-sm text-muted-foreground mt-1">{order.customer.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Total */}
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-muted-foreground">Sous-total</span>
                                    <span className="font-medium text-foreground">{order.total}</span>
                                </div>
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-muted-foreground">Livraison</span>
                                    <span className="text-green-600 font-medium text-sm">Gratuite</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-dashed">
                                    <span className="font-bold text-lg">Total</span>
                                    <span className="font-bold text-2xl text-primary">{order.total}</span>
                                </div>
                                <p className="text-xs text-center text-muted-foreground mt-2">Paiement à la livraison</p>
                            </div>

                            {/* Actions */}
                            <div className="pt-2">
                                {isCancellable && onCancel ? (
                                    <Button
                                        variant="destructive"
                                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium shadow-sm transition-all"
                                        onClick={onCancel}
                                    >
                                        Annuler la commande
                                    </Button>
                                ) : (
                                    !isCancelled && (
                                        <div className="bg-gray-100 text-gray-600 text-xs p-3 rounded-md flex items-start gap-2 border border-gray-200">
                                            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-gray-500" />
                                            <span>
                                                {order.status === 'Expédié' || order.status === 'Livré'
                                                    ? "Annulation impossible (Commande expédiée)"
                                                    : "Pour annuler, contactez le support"}
                                            </span>
                                        </div>
                                    )
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Customer Support Teaser */}
                    <div className="text-center">
                        <Link href="/contact" className="text-xs text-muted-foreground underline hover:text-primary">
                            Besoin d'aide avec cette commande ?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
