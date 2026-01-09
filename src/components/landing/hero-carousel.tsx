"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroCarousel() {
    return (
        <div className="relative w-full h-[80vh] overflow-hidden">
            {/* Static Hero Image */}
            <Image
                src="/idmisk.jpg"
                alt="IDMISK Collection"
                fill
                className="object-cover"
                priority
            />

            {/* Subtle Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />

            {/* Centered Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 px-4 text-center">
                <div className="flex flex-col items-center gap-8 max-w-4xl">
                    <h1 className="font-serif font-thin text-5xl md:text-7xl text-white tracking-widest select-none drop-shadow-md">
                        IDMISK
                    </h1>

                    <p className="text-white/90 text-lg md:text-2xl font-light tracking-wide max-w-2xl drop-shadow-sm leading-relaxed">
                        L&apos;élégance au quotidien. Découvrez nos tissus premium.
                    </p>

                    <Link href="/products">
                        <Button
                            size="lg"
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm rounded-none px-10 py-7 text-sm uppercase tracking-[0.2em] transition-all hover:scale-105"
                        >
                            Acheter ce look
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}
