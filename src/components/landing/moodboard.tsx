import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { cn, getMainImage } from "@/lib/utils"
import { db } from "@/lib/db"

export async function Moodboard() {
    // 1. Fetch Collections from DB
    const collections = await db.homeCollection.findMany({
        orderBy: { order: "asc" }
    })

    // 2. Define fallbacks if DB is empty or partial
    // We expect 4 items. If missing, we use placeholder data.
    const placeholders = [
        { id: "1", title: "Jersey Premium", subtitle: "Confort absolu", imageUrl: "/id.jpg", categoryKey: "Jersey Luxe", order: 1 },
        { id: "2", title: "Soie de Médine", subtitle: "Élégance fluide", imageUrl: "/id.jpg", categoryKey: "Soie de Médine", order: 2 },
        { id: "3", title: "Packs Cadeaux", subtitle: "Le plaisir d'offrir", imageUrl: "/id.jpg", categoryKey: "Packs", order: 3 },
        { id: "4", title: "Nouveautés", subtitle: "Nouvelle collection", imageUrl: "/id.jpg", categoryKey: "newest", order: 4 },
    ]

    // Construct the final grid of 4 items
    const items = [1, 2, 3, 4].map(order => {
        const found = collections.find(c => c.order === order)
        if (found) return found
        return placeholders.find(p => p.order === order)!
    })

    // Helper to generate link based on categoryKey
    const getLink = (key: string) => {
        if (key === "newest") return "/products?sort=newest"
        if (key === "all") return "/products"
        return `/products?category=${encodeURIComponent(key)}`
    }

    // Colors mapping (optional, or just white for all)
    // Layout mapping based on index (0 to 3)
    // Index 0 (Order 1) -> Large (col-span-2 row-span-2)
    // Index 1 (Order 2) -> Normal
    // Index 2 (Order 3) -> Normal
    // Index 3 (Order 4) -> Wide (col-span-2 row-span-1)

    return (
        <section className="container mx-auto px-0 md:px-6 py-8 md:py-12">
            <div className="flex flex-col items-start mb-6 md:mb-12 px-4 md:px-0">
                <span className="text-sm font-medium text-primary tracking-widest uppercase mb-2">
                    Explorer
                </span>
                <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground">
                    Inspiration
                </h2>
            </div>

            {/* Edge-to-Edge Grid on Mobile (gap-1, full width) */}
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-1 md:gap-4 h-auto md:h-[600px]">
                {items.map((item, index) => (
                    <Link
                        key={item.id || index}
                        href={getLink(item.categoryKey)}
                        className={cn(
                            "group relative overflow-hidden bg-muted block",
                            // Mobile: Aspect Video (Full Width Landscape)
                            "aspect-video md:aspect-auto",
                            index === 0 && "md:col-span-2 md:row-span-2", // Slot 1
                            index === 3 && "md:col-span-2 md:row-span-1", // Slot 4
                            (index === 1 || index === 2) && "md:col-span-1 md:row-span-1" // Slots 2 & 3
                        )}
                    >
                        {/* Background Image */}
                        <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${item.imageUrl || "/id.jpg"})` }}
                        />

                        {/* Overlay: Stronger at bottom for text readability - User Requested Specific Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90 transition-opacity" />

                        {/* Content: Centered Text on Mobile for Impact */}
                        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end items-center md:items-start text-center md:text-left">
                            <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 w-full">
                                <p className="text-white/80 text-xs md:text-sm font-medium uppercase tracking-wider mb-1 md:mb-2">
                                    Collection
                                </p>
                                <h3 className="text-white text-3xl md:text-3xl font-serif font-bold flex items-center justify-center md:justify-start gap-2 drop-shadow-lg">
                                    {item.title}
                                    <ArrowUpRight className="hidden md:block w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white" />
                                </h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}
