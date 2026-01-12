"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronRight, Heart, Star, Truck, ShieldCheck, PlayCircle, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductGallery } from "@/components/products/product-gallery"
import { ColorSelector } from "@/components/products/color-selector"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { cn, getMainImage } from "@/lib/utils"
// Import Hooks
import { useCart } from "@/context/cart-context"
import { useCurrency } from "@/context/currency-context"
import { Product } from "@prisma/client"

interface ExtendedProduct extends Omit<Partial<Product>, 'images'> {
    id: string
    name: string
    price: number
    description: string
    images?: string | string[] // Flexible Type
    category: string
    isFeatured?: boolean
    isNewArrival?: boolean
    isFreeShipping?: boolean
    colors?: string
    compareAtPrice?: number | null
}

interface ProductDetailsProps {
    product: ExtendedProduct
    relatedProducts: ExtendedProduct[]
}

export default function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
    const router = useRouter()

    // Global State
    const { addItem } = useCart()
    const { formatPrice } = useCurrency()

    // Local State
    const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined)
    const [quantity, setQuantity] = useState(1)

    // Images handling
    let imageList: string[] = []
    if (Array.isArray(product.images)) {
        imageList = product.images
    } else if (typeof product.images === 'string') {
        try {
            // Try JSON first
            const parsed = JSON.parse(product.images)
            imageList = Array.isArray(parsed) ? parsed : [parsed]
        } catch (e) {
            // Fallback CSV
            imageList = product.images.split(',').map(s => s.trim()).filter(Boolean)
        }
    }

    // Pass normalized list to gallery
    const imagesForGallery = imageList.length > 0 ? imageList : ["/placeholder.jpg"]
    const mainImage = imagesForGallery[0]

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.name, // Prisma uses 'name', context used 'title'
            price: product.price, // Prisma uses 'price' (float)
            image: mainImage,
            quantity: quantity,
            color: selectedColor
        })
    }

    const incrementQuantity = () => setQuantity(prev => prev + 1)
    const decrementQuantity = () => setQuantity(prev => prev > 1 ? prev - 1 : 1)

    return (
        <div className="container mx-auto px-4 md:px-6 py-10 pt-24 min-h-screen">

            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-muted-foreground mb-8">
                <Link href="/" className="hover:text-primary transition-colors">Accueil</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <Link href="/products" className="hover:text-primary transition-colors">Produits</Link>
                <ChevronRight className="h-4 w-4 mx-2" />
                <span className="text-foreground font-medium truncate">{product.name}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                {/* Left Column: Gallery */}
                <div className="space-y-4">
                    <ProductGallery images={product.images || "/placeholder.jpg"} />
                </div>

                {/* Right Column: Info */}
                <div className="flex flex-col">
                    <div className="mb-6">
                        <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight">
                            {product.name}
                        </h1>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
                            {product.compareAtPrice && product.compareAtPrice > product.price && (
                                <span className="text-xl text-muted-foreground line-through">{formatPrice(product.compareAtPrice)}</span>
                            )}
                            {product.isFreeShipping && (
                                <span className="flex items-center gap-1 text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                                    <Truck className="h-3.5 w-3.5" />
                                    Livraison Gratuite
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Shipping Info Block */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3 mb-2">
                            <Truck className="w-5 h-5 text-gray-700" />
                            <span className="font-semibold text-gray-900">Livraison & Paiement</span>
                        </div>

                        {product.isFreeShipping ? (
                            <p className="text-green-600 font-bold flex items-center gap-2">
                                ✅ Livraison Gratuite partout au Maroc !
                            </p>
                        ) : (
                            <div className="text-sm text-gray-600 space-y-1">
                                <div className="flex justify-between">
                                    <span>Casablanca :</span>
                                    <span className="font-bold text-gray-900">20 DH</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Autres villes :</span>
                                    <span className="font-bold text-gray-900">35 DH</span>
                                </div>
                                <p className="text-xs text-gray-500 mt-2 pt-2 border-t">
                                    Paiement à la livraison (Cash on Delivery)
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Colors */}
                    {product.colors && (
                        <div className="mb-6">
                            <ColorSelector options={product.colors} />
                        </div>
                    )}

                    {/* Product Details Accordion */}
                    <Accordion type="single" collapsible className="mb-6">
                        <AccordionItem value="description" className="border-b">
                            <AccordionTrigger className="text-base font-medium hover:no-underline py-4">
                                Description
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {product.description || "Description à venir."}
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="shipping" className="border-b">
                            <AccordionTrigger className="text-base font-medium hover:no-underline py-4">
                                Livraison & Retour
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-3 text-muted-foreground">
                                    <div className="flex items-start gap-2">
                                        <Truck className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-foreground">Livraison partout au Maroc</p>
                                            <p className="text-sm">Délai de livraison : 2-5 jours ouvrables</p>
                                            {product.isFreeShipping && (
                                                <p className="text-sm text-green-600 font-medium mt-1">✓ Livraison gratuite sur ce produit</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <ShieldCheck className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-medium text-foreground">Retours faciles</p>
                                            <p className="text-sm">Retour gratuit sous 14 jours si le produit ne vous convient pas</p>
                                        </div>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Quantity Selector */}
                    <div className="mb-4">
                        <span className="text-sm font-medium text-foreground mb-3 block">Quantité</span>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center border rounded-full">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-l-full hover:bg-transparent"
                                    onClick={decrementQuantity}
                                    disabled={quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">{quantity}</span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-10 w-10 rounded-r-full hover:bg-transparent"
                                    onClick={incrementQuantity}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="sticky bottom-0 left-0 right-0 p-4 md:static md:p-0 bg-background md:bg-transparent border-t md:border-t-0 z-20 space-y-3">
                        <Button
                            onClick={handleAddToCart}
                            size="lg"
                            className="w-full text-lg h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white transition-transform active:scale-[0.98]"
                        >
                            Ajouter au Panier - {formatPrice(product.price)}
                        </Button>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-20 border-t pt-16">
                <h3 className="text-2xl font-serif font-bold mb-8">Vous aimerez aussi</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {relatedProducts.map((item) => (
                        <div key={item.id} className="group cursor-pointer">
                            <Link href={`/products/${item.id}`} className="block">
                                <div className="relative aspect-square bg-muted/20 rounded-sm overflow-hidden mb-3">
                                    <Image
                                        src={getMainImage(item.images) || "/placeholder.jpg"}
                                        alt={item.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{item.name}</h4>
                                <p className="text-sm font-bold mt-1">{formatPrice(item.price)}</p>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    )
}
