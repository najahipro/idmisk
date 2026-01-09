"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Plus } from "lucide-react"

export function ProductShowcase() {
    // Hardcoded fresh config to override any broken local storage
    const [config] = useState({
        title: "Blue Mood",
        subtitle: "La Couleur du Mois",
        buttonText: "Acheter ce look",
        mainLink: "/products?fabric=jersey",
        imageLarge: "/id.jpg",
        imageTopRight: "/id.jpg",
        imageBottomRight1: "/id.jpg",
        imageBottomRight2: "/id.jpg",
        hotspots: [
            { id: 1, top: "40%", left: "50%", link: "/products/jersey-premium-bleu", label: "Hijab Jersey Bleu" },
            { id: 2, top: "60%", left: "60%", link: "/products/chemise-satin", label: "Chemise Satin" }
        ]
    })

    // Force clear old broken config
    useEffect(() => {
        localStorage.removeItem("idmisk-showcase-config")
    }, [])

    return (
        <section className="container mx-auto px-4 md:px-6 py-16">
            <h2 className="text-4xl font-serif font-bold text-center md:text-left mb-8">Inspiration</h2>

            {/* Grid Container - Taller on desktop (800px) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-auto md:h-[800px]">

                {/* Large Left Image - With Hotspots */}
                <div className="relative h-[500px] md:h-full w-full overflow-hidden rounded-xl group block">
                    <Image
                        src={config.imageLarge}
                        alt={config.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Hotspots */}
                    {config.hotspots.map((spot) => (
                        <Link
                            key={spot.id}
                            href={spot.link}
                            className="absolute w-8 h-8 -ml-4 -mt-4 bg-white rounded-full flex items-center justify-center shadow-lg z-20 cursor-pointer hover:scale-110 transition-transform animate-pulse hover:animate-none group/spot"
                            style={{ top: spot.top, left: spot.left }}
                            title={spot.label}
                        >
                            <Plus className="w-4 h-4 text-black group-hover/spot:rotate-45 transition-transform" />
                            <span className="sr-only">{spot.label}</span>
                        </Link>
                    ))}

                    {/* Overlay Text */}
                    <Link href={config.mainLink} className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />

                    <div className="absolute bottom-6 left-6 text-white text-left z-10 pointer-events-none">
                        <span className="uppercase tracking-[0.2em] text-xs font-semibold mb-2 block text-white/90">{config.subtitle}</span>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{config.title}</h2>
                        <div className="pointer-events-auto inline-block">
                            <Link href={config.mainLink}>
                                <Button className="bg-white text-black hover:bg-white/90 rounded-full gap-2">
                                    {config.buttonText} <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Side Grid */}
                <div className="grid grid-cols-2 gap-2 h-[500px] md:h-full">

                    {/* Top Right - Link to Crepe */}
                    <Link href="/products?fabric=crepe" className="relative col-span-2 h-full overflow-hidden rounded-xl group block">
                        <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
                        <Image
                            src={config.imageTopRight}
                            alt={`${config.title} Detail 1`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </Link>

                    {/* Bottom Right 1 - Link to Packs */}
                    <Link href="/products?category=pack" className="relative h-full overflow-hidden rounded-xl group block">
                        <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
                        <Image
                            src={config.imageBottomRight1}
                            alt={`${config.title} Detail 2`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </Link>

                    {/* Bottom Right 2 - Link to Accessories (or standard) */}
                    <Link href="/products?category=accessoire" className="relative h-full overflow-hidden rounded-xl group block">
                        <div className="absolute inset-0 z-10 bg-black/0 group-hover:bg-white/10 transition-colors duration-300 pointer-events-none" />
                        <Image
                            src={config.imageBottomRight2}
                            alt={`${config.title} Detail 3`}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </Link>
                </div>
            </div>
        </section>
    )
}
