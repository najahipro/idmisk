"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProductCard } from "@/components/landing/product-card"
import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import { ProductFilters } from "@/components/shop/product-filters"
import { useSearchParams } from "next/navigation"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Product } from "@/types/product"

interface ProductListClientProps {
    initialProducts: Product[]
}

export function ProductListClient({ initialProducts }: ProductListClientProps) {
    const searchParams = useSearchParams()

    const [selectedFabric, setSelectedFabric] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string | null>(null)

    // Sync state with URL params on mount/update
    useEffect(() => {
        const fabricParam = searchParams.get("fabric")
        const categoryParam = searchParams.get("category")
        const searchParam = searchParams.get("search")

        if (fabricParam) setSelectedFabric(fabricParam)
        if (categoryParam) setSelectedCategory(categoryParam)
        if (searchParam) setSearchQuery(searchParam)
        else setSearchQuery(null) // Clear if param removed
    }, [searchParams])

    // Filtering Logic
    const filteredProducts = initialProducts.filter((product) => {
        // Search Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            const title = product.title.toLowerCase()
            const desc = product.description?.toLowerCase() || ""

            if (!title.includes(query) && !desc.includes(query)) {
                return false
            }
        }
        // Fabric Filter (Title-based heuristic since no explicit field)
        if (selectedFabric) {
            const fabric = selectedFabric.toLowerCase()
            const title = product.title.toLowerCase()

            if (fabric === 'soie') {
                if (!title.includes('soie') && !title.includes('médine')) return false
            } else if (fabric === 'crepe') {
                if (!title.includes('crêpe') && !title.includes('crepe')) return false
            } else if (fabric === 'lycra-degrade') {
                if (!title.includes('dégradé') && !title.includes('degrade')) return false
            } else if (!title.includes(fabric)) {
                return false
            }
        }

        // Category Filter
        if (selectedCategory) {
            const cat = selectedCategory.toLowerCase()
            const title = product.title.toLowerCase()

            if (cat === 'pack') {
                if (product.type !== 'pack') return false
            } else if (cat === 'hijab') {
                if (product.type === 'pack' || (!title.includes('hijab'))) return false
            } else if (cat === 'khimar') {
                if (!title.includes('khimar')) return false
            } else if (cat === 'accessoire') {
                if (!title.includes('bonnet') && !title.includes('accessoire') && !title.includes('épingle')) return false
            }
        }

        return true
    })

    const activeFiltersCount = (selectedFabric ? 1 : 0) + (selectedCategory ? 1 : 0)

    return (
        <div className="w-full md:px-12">

            {/* Header - Keep readable padding on mobile */}
            <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 border-b pb-6 px-4 md:px-0">
                <div>
                    <div className="flex items-center gap-2 mb-2 text-muted-foreground hover:text-primary transition-colors">
                        <Link href="/" className="flex items-center text-sm">
                            <ArrowLeft className="mr-1 h-4 w-4" />
                            Retour
                        </Link>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                        Toute la Collection
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Découvrez nos hijabs premium et coffrets exclusifs.
                    </p>
                </div>

                <div className="mt-4 md:mt-0 flex items-center gap-4">
                    {/* Filter Button (Sheet Trigger) */}
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" className="gap-2">
                                <SlidersHorizontal className="w-4 h-4" />
                                Filtrer {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                            <SheetHeader>
                                <SheetTitle className="text-left font-serif text-2xl">Filtres</SheetTitle>
                            </SheetHeader>
                            <div className="mt-8">
                                <ProductFilters
                                    selectedFabric={selectedFabric}
                                    setSelectedFabric={setSelectedFabric}
                                    selectedCategory={selectedCategory}
                                    setSelectedCategory={setSelectedCategory}
                                    inSheet={true}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="text-sm text-muted-foreground">
                        {filteredProducts.length} produits trouvés
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                {/* Grid (Full Width) */}
                <div className="flex-1">
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-20 text-muted-foreground flex-1">
                            <p className="text-lg">Aucun résultat trouvé {searchQuery ? `pour "${searchQuery}"` : ""}.</p>
                            <Button variant="link" onClick={() => window.location.href = '/products'} className="mt-2">
                                Voir tous les produits
                            </Button>
                        </div>
                    ) : (
                        /* Update grid: Mobile 2 (Edge-to-Edge), Tablet 3, Desktop 4.
                           Negative margins (-mx-4) to pull grid edge-to-edge on mobile.
                           Width 100% + 2rem to compensate for negative margins. */
                        <div className="-mx-4 w-[calc(100%+2rem)] md:w-full md:mx-0 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 gap-y-6 md:gap-x-6 md:gap-y-10 px-0 md:px-0">
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
