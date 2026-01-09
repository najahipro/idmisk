"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Lock } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

export function UniversSection() {
    const { t } = useTranslation()

    const collections = [
        {
            id: "hijabs",
            title: "Hijabs Premium",
            status: "active",
            href: "/products",
            image: "/id.jpg", // Using existing placeholder for now
            cta: "Découvrir"
        },
        {
            id: "abayas",
            title: "Abayas & Kimonos",
            status: "locked",
            href: "#",
            color: "bg-[#E6E2D8]", // Soft Beige
            cta: "Bientôt Disponible"
        },
        {
            id: "maman-bebe",
            title: "Maman & Bébé",
            status: "locked",
            href: "#",
            color: "bg-[#D8E2DC]", // Soft Sage
            cta: "Bientôt Disponible"
        },
        {
            id: "nuit",
            title: "Tenues de Nuit",
            status: "locked",
            href: "#",
            color: "bg-[#F2E8E8]", // Soft Rose
            cta: "Bientôt Disponible"
        }
    ]

    return (
        <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
            <div className="flex flex-col items-center mb-12 text-center">
                <span className="text-sm font-medium text-primary tracking-widest uppercase mb-3">
                    Explorer
                </span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                    Nos Univers
                </h2>
                <div className="w-16 h-1 bg-primary mt-6 rounded-full opacity-60"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {collections.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "group relative aspect-[3/4] overflow-hidden rounded-lg border border-border/50",
                            item.status === "active" ? "cursor-pointer" : "cursor-default"
                        )}
                    >
                        {item.status === "active" ? (
                            <Link href={item.href} className="block w-full h-full">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10" />
                                <Image
                                    src={item.image || "/placeholder.jpg"}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                                    <h3 className="text-white text-lg md:text-xl font-serif font-bold mb-2 drop-shadow-md">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-white text-sm font-medium tracking-wide uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        {item.cta} <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div className={cn("w-full h-full flex flex-col items-center justify-center p-6 text-center transition-opacity hover:opacity-90", item.color)}>
                                <div className="absolute top-4 right-4 text-muted-foreground/40">
                                    <Lock className="w-5 h-5" />
                                </div>

                                <h3 className="text-foreground/80 text-lg md:text-xl font-serif font-bold mb-3 z-10">
                                    {item.title}
                                </h3>

                                <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/50 text-muted-foreground text-[10px] uppercase font-bold tracking-wider backdrop-blur-sm border border-white/20">
                                    {t('common.comingSoon', 'Bientôt Disponible')}
                                </span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
