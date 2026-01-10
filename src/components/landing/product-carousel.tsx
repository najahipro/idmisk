"use client"

import * as React from "react"
import { ProductCard } from "./product-card"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useCurrency } from "@/context/currency-context"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Product } from "@/types/product"

interface ProductCarouselProps {
  products: Product[]
}

export function ProductCarousel({ products }: ProductCarouselProps) {
  const { formatPrice } = useCurrency()

  if (!products || products.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        Chargement de la collection...
      </div>
    )
  }

  return (
    <section className="w-full py-8 md:py-12 overflow-hidden" id="hijabs">
      {/* Header moved inside Carousel for layout control */}

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

            <h2 className="text-3xl font-thin text-black tracking-wide text-center uppercase">
              Nos Hijabs
            </h2>

            <CarouselNext className="hidden md:flex static translate-y-0 translate-x-0 h-8 w-8 border-0 bg-transparent hover:bg-transparent text-black hover:text-black/70 transition-colors p-0" variant="ghost">
              <span className="sr-only">Suivant</span>
            </CarouselNext>
          </div>

          <CarouselContent className="-ml-1 md:-ml-4 px-0 md:px-12">
            {products.map((product) => (
              <CarouselItem key={product.id} className="basis-1/2 md:basis-1/3 lg:basis-1/4 pl-1 md:pl-4">
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
          <Button className="h-12 px-8 rounded-full text-lg shadow-md hover:shadow-lg transition-all">
            Voir toute la collection
          </Button>
        </Link>
      </div>
    </section>
  )
}
