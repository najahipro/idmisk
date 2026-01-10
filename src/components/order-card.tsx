"use client"

import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { Package, Truck, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useCurrency } from "@/context/currency-context"

// Define a type that matches the Prisma Order structure + parsed items
export interface OrderType {
    id: string
    createdAt: Date
    status: string
    total: number
    items: string // JSON string
    customerName: string
    customerPhone: string
    address: string
    city: string
}

import Link from "next/link" // Ensure Link is imported if not already

interface OrderCardProps {
    order: OrderType
    href?: string
}

export function OrderCard({ order, href }: OrderCardProps) {
    const { formatPrice } = useCurrency()
    const [isExpanded, setIsExpanded] = useState(false)


    // Parse items safely
    let items: any[] = []
    try {
        items = JSON.parse(order.items)
    } catch (e) {
        items = []
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "livré": return "bg-green-100 text-green-800 border-green-200"
            case "expédié": return "bg-blue-100 text-blue-800 border-blue-200"
            case "annulé": return "bg-red-100 text-red-800 border-red-200"
            case "en cours": return "bg-orange-100 text-orange-800 border-orange-200"
            default: return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status.toLowerCase()) {
            case "livré": return <CheckCircle className="w-4 h-4" />
            case "expédié": return <Truck className="w-4 h-4" />
            case "annulé": return <XCircle className="w-4 h-4" />
            default: return <Clock className="w-4 h-4" />
        }
    }

    return (
        <Card className={cn("overflow-hidden border-2 hover:border-black/5 transition-all duration-300 relative group", href && "hover:border-primary/50 cursor-pointer")}>
            {href && <Link href={href} className="absolute inset-0 z-0" />}
            <CardHeader className="bg-gray-50/50 p-6 relative z-10 pointer-events-none">
                {/* Reposition pointer events for interactive children if needed, but header usually just text. 
                    Actually, if we want whole card clickable, easiest is overlay. 
                    Interactive children need z-10 + relative.
                */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-lg">Commande #{order.id.slice(0, 8)}</span>
                            <Badge variant="outline" className={cn("flex items-center gap-1.5", getStatusColor(order.status))}>
                                {getStatusIcon(order.status)}
                                {order.status}
                            </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5" />
                            {format(new Date(order.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-2xl font-serif font-bold">{formatPrice(order.total)}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="p-6 space-y-4">
                    {/* Items Preview (First item) */}
                    <div className="flex items-start gap-4">
                        <div className="relative w-20 h-24 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border">
                            {items[0]?.image ? (
                                <Image
                                    src={items[0].image}
                                    alt={items[0].title || "Produit"}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-xs text-muted-foreground">Img</div>
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-medium text-base mb-1 line-clamp-2">{items[0]?.title || "Produit inconnu"}</h4>
                            <p className="text-sm text-muted-foreground mb-2">
                                {items[0]?.quantity} x {formatPrice(items[0]?.price)}
                                {items[0]?.color && <span className="ml-2">• {items[0].color}</span>}
                            </p>
                        </div>
                    </div>

                    {items.length > 1 && (
                        <>
                            {isExpanded && (
                                <div className="space-y-4 pt-4 border-t animate-in slide-in-from-top-2 duration-200">
                                    {items.slice(1).map((item: any, idx: number) => (
                                        <div key={idx} className="flex items-start gap-4">
                                            <div className="relative w-16 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0 border">
                                                {item.image && (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-medium text-sm mb-1">{item.title}</h4>
                                                <p className="text-xs text-muted-foreground">
                                                    {item.quantity} x {formatPrice(item.price)}
                                                    {item.color && <span className="ml-2">• {item.color}</span>}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Button
                                variant="ghost"
                                size="sm"
                                className="w-full text-muted-foreground h-8 mt-2 relative z-10"
                                onClick={(e) => {
                                    e.preventDefault() // prevent link navigation
                                    e.stopPropagation()
                                    setIsExpanded(!isExpanded)
                                }}
                            >
                                {isExpanded ? (
                                    <span className="flex items-center gap-1">Voir moins <ChevronUp className="w-3 h-3" /></span>
                                ) : (
                                    <span className="flex items-center gap-1">Voir {items.length - 1} autres articles <ChevronDown className="w-3 h-3" /></span>
                                )}
                            </Button>
                        </>
                    )}
                </div>

                <Separator />

                <div className="p-6 bg-gray-50/30 flex flex-col sm:flex-row justify-between gap-4 text-sm">
                    <div>
                        <p className="font-medium mb-1 flex items-center gap-2"><Truck className="w-4 h-4" /> Livraison</p>
                        <p className="text-muted-foreground">{order.address}, {order.city}</p>
                    </div>
                    <div>
                        <p className="font-medium mb-1">Client</p>
                        <p className="text-muted-foreground">{order.customerName} ({order.customerPhone})</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
