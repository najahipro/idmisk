"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCurrency } from "@/context/currency-context"
import { useCart } from "@/context/cart-context"
import { getMainImage } from "@/lib/utils"

interface ProductDetailsProps {
    product: any
    relatedProducts: any[]
}

export default function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
    const { formatPrice } = useCurrency()
    const { addItem } = useCart()

    const [selectedSize, setSelectedSize] = useState<string>("M")
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)

    // Parse images
    let imagesArray: string[] = []
    if (product.images) {
        try {
            imagesArray = typeof product.images === 'string' ? JSON.parse(product.images) : product.images
        } catch {
            if (typeof product.images === 'string') {
                imagesArray = product.images.split(',').map((img: string) => img.trim())
            }
        }
    }

    const mainImage = imagesArray[selectedImageIndex] || getMainImage(product.images) || "/placeholder.jpg"
    const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"]

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            title: product.name || product.title,
            price: product.priceNum,
            image: mainImage,
            quantity: quantity,
            color: product.colors?.[0]?.name // Default color if available
        })
    }

    return (
        <div className="min-h-screen bg-[#F5F3EB]">
            {/* Two-Column Layout */}
            <div className="max-w-[95%] max-w-screen-2xl mx-auto px-2 md:px-4 py-12 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                    {/* LEFT: Images */}
                    <div className="space-y-4">
                        {/* Main Image */}
                        <div className="aspect-square w-full max-w-[620px] mx-auto relative overflow-hidden bg-gray-100">
                            <Image
                                src={mainImage}
                                alt={product.name || product.title}
                                fill
                                className="object-cover object-center"
                                priority
                            />
                        </div>

                        {/* Thumbnails */}
                        {imagesArray.length > 1 && (
                            <div className="flex gap-2 justify-center flex-wrap max-w-[620px] mx-auto">
                                {imagesArray.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setSelectedImageIndex(idx)}
                                        className={`w-16 h-16 md:w-20 md:h-20 relative overflow-hidden border-2 transition-all ${selectedImageIndex === idx
                                            ? 'border-black'
                                            : 'border-transparent hover:border-gray-400'
                                            }`}
                                    >
                                        <Image
                                            src={img}
                                            alt={`${product.name} - ${idx + 1}`}
                                            fill
                                            className="object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* RIGHT: Product Info */}
                    <div className="space-y-8">
                        {/* Title */}
                        <div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-sans font-thin uppercase tracking-wide text-black leading-tight">
                                {product.name || product.title}
                            </h1>
                        </div>

                        {/* Price */}
                        <div>
                            <p className="text-3xl font-medium text-black">
                                {formatPrice(product.price)}
                            </p>
                        </div>

                        {/* Description */}
                        <div className="prose prose-sm max-w-none">
                            <p className="text-gray-700 leading-relaxed">
                                {product.description || "Découvrez ce produit exceptionnel de notre collection exclusive."}
                            </p>
                        </div>

                        {/* Color Selector */}
                        {(product.colors && product.colors.length > 0) && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-black">
                                    Couleur{product.colors.length > 1 ? 's' : ''}
                                </h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.colors.map((color: any) => (
                                        <div
                                            key={color.name}
                                            className="group relative cursor-pointer"
                                            title={color.name}
                                        >
                                            <div
                                                className={`w-8 h-8 rounded-full border border-black/10 shadow-sm transition-transform hover:scale-110`}
                                                style={{ backgroundColor: color.hexCode }}
                                            />
                                            <span className="w-8 text-[10px] text-center block mt-1 truncate">{color.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-black">
                                Taille
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {availableSizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`w-12 h-12 flex items-center justify-center text-sm font-medium border transition-all ${selectedSize === size
                                            ? 'bg-black text-white border-black'
                                            : 'bg-transparent text-black border-black/20 hover:border-black'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity Selector */}
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-black">
                                Quantité
                            </h3>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 border border-black/20 hover:border-black flex items-center justify-center text-lg"
                                >
                                    −
                                </button>
                                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-10 h-10 border border-black/20 hover:border-black flex items-center justify-center text-lg"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full bg-black text-white py-4 px-8 text-sm font-bold uppercase tracking-widest hover:bg-gray-900 transition-colors"
                        >
                            Ajouter au Panier
                        </button>

                        {/* Additional Info */}
                        <div className="pt-8 border-t border-black/10 space-y-4 text-sm text-gray-600">
                            <p>✓ Livraison gratuite à partir de 500 DH</p>
                            <p>✓ Retours sous 14 jours</p>
                            <p>✓ Paiement sécurisé</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            {relatedProducts.length > 0 && (
                <div className="bg-white py-16 md:py-24">
                    <div className="max-w-[95%] max-w-screen-2xl mx-auto px-2 md:px-4">
                        {/* Section Title */}
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-sans font-thin uppercase tracking-widest text-black">
                                Vous Aimerez Aussi
                            </h2>
                        </div>

                        {/* Related Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                            {relatedProducts.map((relatedProduct) => {
                                const relatedImage = getMainImage(relatedProduct.images) || "/placeholder.jpg"

                                return (
                                    <Link
                                        key={relatedProduct.id}
                                        href={`/products/${relatedProduct.id}`}
                                        className="group block w-full max-w-[620px]"
                                    >
                                        {/* Image */}
                                        <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4 w-full">
                                            <Image
                                                src={relatedImage}
                                                alt={relatedProduct.name || relatedProduct.title}
                                                fill
                                                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                                sizes="(max-width: 768px) 50vw, 300px"
                                            />
                                        </div>

                                        {/* Text Info */}
                                        <div className="text-left space-y-1">
                                            <h3 className="font-medium text-sm md:text-base text-black/90 group-hover:underline underline-offset-4 decoration-black/20 transition-all">
                                                {relatedProduct.name || relatedProduct.title}
                                            </h3>
                                            <p className="font-medium text-sm text-gray-500">
                                                {formatPrice(relatedProduct.price)}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
