"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Lock, Image as ImageIcon } from "lucide-react"
// import { useTranslation } from "react-i18next" // Keeping translation if needed, but simplifying for now
import { cn } from "@/lib/utils"
// import { getUniversList } from "@/actions/univers" // We need to fetch data. Since this is a client component, we should fetch via useEffect or make it server component.
// Best approach: Make it Async Server Component if possible, but it's used in Home Page. 
// Let's keep it clean: We will inline the fetch here if it was a Server Component, but page.tsx imports it.
// The file is currently "use client". Let's try to keep it client for animations or switch to Server Component.
// The existing file has "use client". Let's check parent page. 
// Actually, simple solution: Use an inner async component or just fetch in client effect for now to match current architecture quickly.
// However, Actions are callable from Client Components.

import { useEffect, useState } from "react"
import { getUniversList } from "@/actions/univers"

interface UniversItem {
    id: string
    title: string
    image: string
    link: string | null
    isLocked: boolean
    order: number
}

export function UniversSection() {
    // const { t } = useTranslation() 
    const [items, setItems] = useState<UniversItem[]>([])

    useEffect(() => {
        getUniversList().then(res => {
            if (res.list) setItems(res.list)
        })
    }, [])

    // If empty (loading), maybe show skeleton or nothing? Or keeping initial static as fallback?
    // Let's show nothing until loaded or skeleton.
    if (items.length === 0) return null

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
                {items.map((item) => (
                    <div
                        key={item.id}
                        className={cn(
                            "group relative aspect-[3/4] overflow-hidden rounded-lg border border-border/50",
                            !item.isLocked ? "cursor-pointer" : "cursor-default"
                        )}
                    >
                        {!item.isLocked ? (
                            <Link href={item.link || "#"} className="block w-full h-full">
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10" />
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <ImageIcon className="w-10 h-10 text-gray-400 opacity-50" />
                                    </div>
                                )}

                                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                                    <h3 className="text-white text-lg md:text-xl font-serif font-bold mb-2 drop-shadow-md">
                                        {item.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-white text-sm font-medium tracking-wide uppercase opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        Découvrir <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            /* Locked State - Using a soft BG color or Image with blur/overlay */
                            <div className={cn("w-full h-full flex flex-col items-center justify-center p-6 text-center transition-opacity hover:opacity-90 bg-gray-100")}>
                                {item.image && (
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover opacity-50 grayscale"
                                    />
                                )}
                                <div className="absolute top-4 right-4 text-muted-foreground/60 z-30">
                                    <Lock className="w-5 h-5" />
                                </div>

                                <div className="z-10 relative">
                                    <h3 className="text-foreground/80 text-lg md:text-xl font-serif font-bold mb-3">
                                        {item.title}
                                    </h3>

                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/50 text-muted-foreground text-[10px] uppercase font-bold tracking-wider backdrop-blur-sm border border-white/20">
                                        Bientôt Disponible
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}
