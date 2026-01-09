"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function CollectionsGrid() {
    const collections = [
        {
            id: "hijabs",
            title: "Hijabs Premium",
            href: "/products",
            image: "/id.jpg", // Using existing placeholder
            description: "Découvrez notre collection de hijabs premium en soie de Médine et crêpe."
        },
        {
            id: "abayas",
            title: "Abayas & Kimonos",
            href: "#",
            color: "bg-[#E6E2D8]", // Soft Beige
            description: "L'élégance modeste pour toutes les occasions."
        },
        {
            id: "packs",
            title: "Packs Exclusifs",
            href: "#",
            color: "bg-[#D8E2DC]", // Soft Sage
            description: "Nos meilleures offres de packs pour économiser."
        },
        {
            id: "accessoires",
            title: "Accessoires",
            href: "#",
            color: "bg-[#F2E8E8]", // Soft Rose
            description: "Bonnets, épingles et accessoires essentiels."
        }
    ]

    return (
        <section className="container mx-auto px-4 md:px-6 py-12">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-center">Nos Collections</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {collections.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className="group relative block !aspect-[2/3] overflow-hidden bg-gray-100 border hover:shadow-lg transition-all cursor-pointer"
                    >
                        {item.image ? (
                            <>
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                            </>
                        ) : (
                            <div className={cn("w-full h-full flex flex-col items-center justify-center p-6 text-center", item.color)}>
                                {/* Placeholder visuals can go here */}
                            </div>
                        )}

                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white z-10">
                            <h3 className={cn(
                                "text-2xl font-light font-serif mb-2 uppercase tracking-widest",
                                !item.image && "text-black"
                            )}>
                                {item.title}
                            </h3>
                            <p className={cn(
                                "text-sm mb-4 line-clamp-2 font-light tracking-wide",
                                !item.image ? "text-gray-900" : "text-gray-100"
                            )}>
                                {item.description}
                            </p>
                            <div className={cn(
                                "flex items-center gap-2 text-xs font-medium uppercase tracking-widest",
                                !item.image ? "text-black" : "text-white"
                            )}>
                                Voir la collection <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
