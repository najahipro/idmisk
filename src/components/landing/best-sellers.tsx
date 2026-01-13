"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/landing/product-card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Product } from "@/types/product"

interface BestSellersProps {
    products: Product[]
}

export function BestSellers({ products }: BestSellersProps) {
    // Sort by sales count (descending) and take top 8 for slider
    const bestSellers = [...products]
        .sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0))
        .slice(0, 8)

    return (
        <section className="w-full py-8 bg-muted/10 overflow-hidden">
            <div className="relative px-0 md:px-12">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                        dragFree: true,
                        containScroll: "trimSnaps",
                        skipSnaps: true
                    }}
                    plugins={[]}
                    className="w-full cursor-grab active:cursor-grabbing"
                >
                    <div className="flex items-center justify-center mb-6 relative gap-4 px-4 md:px-0">
                        <CarouselPrevious className="hidden md:flex static translate-y-0 translate-x-0 h-8 w-8 border-0 bg-transparent hover:bg-transparent text-black hover:text-black/70 transition-colors p-0" variant="ghost">
                            <span className="sr-only">Précédent</span>
                        </CarouselPrevious>

                        <h2 className="text-2xl font-light text-black tracking-wide text-center uppercase">
                            Nos Best-Sellers
                        </h2>

                        <CarouselNext className="hidden md:flex static translate-y-0 translate-x-0 h-8 w-8 border-0 bg-transparent hover:bg-transparent text-black hover:text-black/70 transition-colors p-0" variant="ghost">
                            <span className="sr-only">Suivant</span>
                        </CarouselNext>
                    </div>

                    <CarouselContent className="-ml-1 md:-ml-4 px-0 md:px-12">
                        {bestSellers.map((product) => (
                            <CarouselItem key={product.id} className="flex-shrink-0 basis-1/2 min-w-[160px] md:basis-1/3 lg:basis-1/4 pl-1 md:pl-4">
                                <div className="p-1">
                                    <ProductCard product={product} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>

            <div className="mt-12 text-center">
                <Link href="/products">
                    <Button variant="outline" className="h-12 px-8 rounded-full text-lg hover:bg-primary hover:text-white transition-all border-foreground/20">
                        Voir tout les best-sellers
                    </Button>
                </Link>
            </div>
        </section>
    )
}
