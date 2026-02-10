"use client"

import { Product } from "@/types/product"
import { useCurrency } from "@/context/currency-context"
import Image from "next/image"
import Link from "next/link"

interface MensEditorialGridProps {
    products: Product[]
}

export function MensEditorialGrid({ products }: MensEditorialGridProps) {
    const { formatPrice } = useCurrency()

    // Ensure we display exactly 6 products (or fewer if not available)
    const displayProducts = products.slice(0, 6)

    return (
        <section className="w-full py-16 bg-[#F5F3EB]">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <Link href="/?filter=homme" className="group inline-block">
                        <h2 className="text-4xl md:text-5xl font-heading font-thin uppercase tracking-widest text-black mb-2 group-hover:text-black/70 transition-colors">
                            Vestiaire Masculin
                        </h2>
                        <div className="h-[1px] w-0 bg-black transition-all duration-500 group-hover:w-full mx-auto" />
                    </Link>
                </div>

                {/* Editorial 6-Column Grid */}
                <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
                    {displayProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className="group block"
                        >
                            <div className="aspect-[3/4] relative overflow-hidden bg-gray-100 mb-3">
                                <Image
                                    src={product.image || "/placeholder.jpg"}
                                    alt={product.title}
                                    fill
                                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 50vw, 16vw"
                                />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xs font-light uppercase tracking-wider text-black group-hover:underline underline-offset-2 decoration-black/30 truncate px-1">
                                    {product.title}
                                </h3>
                                <p className="text-xs text-gray-500 mt-1">
                                    {formatPrice(product.priceNum)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>

                {displayProducts.length === 0 && (
                    <div className="text-center py-10 text-gray-400 text-sm">
                        Prochainement disponible.
                    </div>
                )}
            </div>
        </section>
    )
}
