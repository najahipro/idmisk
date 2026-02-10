"use client"

import { Product } from "@/types/product"
import { useCurrency } from "@/context/currency-context"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface NewInMarqueeProps {
    products: Product[]
}

export function NewInMarquee({ products }: NewInMarqueeProps) {
    const { formatPrice } = useCurrency()
    // Duplicate products to create seamless loop
    const marqueeProducts = [...products, ...products, ...products]

    return (
        <section className="w-full py-16 bg-[#F5F3EB] overflow-hidden">
            <div className="container mx-auto px-4 mb-10 text-center">
                <h2 className="text-4xl md:text-6xl font-heading font-thin uppercase tracking-tighter">
                    NEW IN
                </h2>
            </div>

            {/* Marquee Container */}
            <div className="relative w-full overflow-hidden group">
                <div className="flex animate-marquee hover:[animation-play-state:paused] w-max">
                    {marqueeProducts.map((product, index) => (
                        <div
                            key={`${product.id}-${index}`}
                            className="w-[280px] md:w-[320px] mx-4 flex-shrink-0 relative group/card cursor-pointer"
                        >
                            <Link href={`/products/${product.id}`}>
                                <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 mb-4">
                                    <Image
                                        src={product.image || "/placeholder.jpg"}
                                        alt={product.title}
                                        fill
                                        className="object-cover object-center transition-transform duration-500 group-hover/card:scale-105"
                                        sizes="300px"
                                    />
                                </div>
                                <div className="text-center space-y-1">
                                    <h3 className="font-light uppercase text-sm tracking-wider text-black">
                                        {product.title}
                                    </h3>
                                    <p className="font-medium text-gray-600 text-sm">
                                        {formatPrice(product.priceNum)}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Discover Button */}
            <div className="text-center mt-12">
                <Link
                    href="/?filter=new-in"
                    className="inline-block border-b border-black pb-1 text-sm font-bold uppercase tracking-widest text-black hover:text-black/70 hover:border-black/70 transition-colors"
                >
                    Découvrir
                </Link>
            </div>

            <style jsx global>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); } /* Move enough to show the next set */
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
            `}</style>
        </section>
    )
}
