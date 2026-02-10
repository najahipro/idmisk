"use client"

import Link from "next/link"
import Image from "next/image"
import { Product } from "@/types/product"
import { useCurrency } from "@/context/currency-context"

interface StreetwearProductGridProps {
    products: Product[]
    title?: string
    columns?: 3 | 4
}

export function StreetwearProductGrid({ products, title = "Streetwear Essentials", columns = 3 }: StreetwearProductGridProps) {
    const { formatPrice } = useCurrency()

    // Determine grid columns class based on prop
    // Mobile is always 2 columns (grid-cols-2) except very small screens which might be 1 but user requested "Mobile: 2 Columns"
    // So we'll force grid-cols-2 on sm and above, or even generic mobile if that's the requirement.
    // Original was: grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
    // Requested "Desktop: 4 Columns". "Mobile: 2 Columns".

    // We will map 3 -> lg:grid-cols-3, 4 -> lg:grid-cols-4
    // And ensure base is grid-cols-2 for mobile as requested.

    const gridClass = columns === 4
        ? "grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-6 md:gap-x-8 md:gap-y-12"
        : "grid grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-6 md:gap-x-8 md:gap-y-12"

    if (!products || products.length === 0) {
        return (
            <section className="w-full py-16 md:py-24 bg-[#F5F3EB]">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-thin uppercase mb-4 tracking-wide">
                        {title}
                    </h2>
                    <p className="text-red-600 font-medium">
                        No products found. (Database might be disconnected or empty)
                    </p>
                </div>
            </section>
        )
    }

    return (
        <section className="w-full py-16 md:py-24 bg-[#F5F3EB]">
            <div className="max-w-[1800px] mx-auto px-4 md:px-12">
                <h2 className="text-3xl md:text-5xl font-heading font-thin uppercase text-center mb-12 tracking-wide">
                    {title}
                </h2>

                <div className={gridClass}>
                    {products.map((product) => (
                        <Link key={product.id} href={`/products/${product.id}`} className="group block">
                            {/* Image Container */}
                            <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 mb-4">
                                <Image
                                    src={product.image || "/placeholder.jpg"}
                                    alt={product.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />

                                {/* Optional: Add a second image reveal on hover if available */}
                                {product.images && product.images.length > 1 && (
                                    <Image
                                        src={product.images[1]}
                                        alt={product.title}
                                        fill
                                        className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="text-center space-y-1">
                                <h3 className="font-light uppercase text-sm md:text-base tracking-wider text-black">
                                    {product.title}
                                </h3>
                                <p className="font-medium text-gray-600 text-sm">
                                    {formatPrice(product.priceNum)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
