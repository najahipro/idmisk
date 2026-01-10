"use client"

import { useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Star, ShoppingBag } from "lucide-react"
import { useCurrency } from "@/context/currency-context"
import { useTranslation } from "react-i18next"
import { Product } from "@/types/product"
import { useCart } from "@/context/cart-context"

interface ProductCardProps {
    product: Product
}

export function ProductCard({ product }: ProductCardProps) {
    const { currency } = useCurrency()
    const { t } = useTranslation()

    const { addItem } = useCart()
    const { formatPrice } = useCurrency()



    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault() // Prevent navigation
        e.stopPropagation()
        addItem({
            id: product.id,
            title: product.title,
            price: product.priceNum,
            image: product.image || "/id.jpg",
            quantity: 1,
            color: product.colors?.[0]?.name // Default color if available
        })
    }

    return (
        <Link href={`/products/${product.id}`} className="group/card cursor-pointer block h-full bg-transparent">
            <div className="relative !aspect-[2/3] bg-muted/20 overflow-hidden mb-3">
                {product.isNew && (
                    <span className="absolute top-2 left-2 z-10 bg-white text-black text-[10px] uppercase font-bold px-2 py-1 tracking-wider shadow-sm">
                        NOUVEAU
                    </span>
                )}
                {product.type === 'pack' && (
                    <span className="absolute top-2 left-2 z-10 bg-black text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider shadow-sm">
                        Pack
                    </span>
                )}
                <div className="relative w-full h-full bg-gray-100 flex items-center justify-center">
                    {product.image ? (
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center text-gray-300">
                            <div className="w-10 h-10 border-2 border-current rounded-full flex items-center justify-center mb-2">
                                <span className="text-lg font-serif italic">id</span>
                            </div>
                        </div>
                    )}
                </div>
                {/* Fast Add Button - Mobile Only (Visible < md/lg) */}
                <button
                    onClick={handleAddToCart}
                    className="md:hidden absolute bottom-2 right-2 z-20 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    aria-label="Ajouter au panier"
                >
                    <ShoppingBag className="w-4 h-4" />
                </button>

                {/* Quick Buy Button on Hover - Overlay at Bottom - Desktop Only */}
                <div className="hidden md:block absolute inset-x-0 bottom-0 z-20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                    <Button
                        onClick={handleAddToCart}
                        className="w-full bg-white text-black hover:bg-white/90 text-[10px] uppercase tracking-widest font-medium py-3 h-auto rounded-none border-t border-black/5 shadow-none"
                    >
                        Achat Rapide
                    </Button>
                </div>
            </div>
            <div className="bg-background pt-2 text-center">
                <div className="flex flex-col items-center">
                    <div className="space-y-1 w-full flex flex-col items-center">
                        <div className="flex flex-col gap-1 items-center">
                            {(product.rating || 0) > 0 && (
                                <div className="flex gap-0.5 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < Math.round(product.rating || 0) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground/20"}`}
                                        />
                                    ))}
                                </div>
                            )}
                            <h3 className="text-sm font-medium text-black group-hover/card:text-black/70 transition-colors leading-tight line-clamp-2">
                                {product.title}
                            </h3>
                        </div>
                        <p className="text-sm font-medium text-black/80">{formatPrice(product.priceNum)}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}
