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
    categories: any[]
    sizes: any[]
    colors: any[]
}

export function ProductListClient({ initialProducts, categories, sizes, colors }: ProductListClientProps) {
    const searchParams = useSearchParams()

    const [selectedFabric, setSelectedFabric] = useState<string | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [selectedSize, setSelectedSize] = useState<string | null>(null)
    const [selectedColor, setSelectedColor] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState<string | null>(null)

    // Sync state with URL params on mount/update
    useEffect(() => {
        const fabricParam = searchParams.get("fabric")
        const categoryParam = searchParams.get("category")
        const sizeParam = searchParams.get("size")
        const colorParam = searchParams.get("color")
        const searchParam = searchParams.get("search")

        if (fabricParam) setSelectedFabric(fabricParam)
        if (categoryParam) setSelectedCategory(categoryParam)
        if (sizeParam) setSelectedSize(sizeParam)
        else setSelectedSize(null)
        if (colorParam) setSelectedColor(colorParam)
        else setSelectedColor(null)

        if (searchParam) setSearchQuery(searchParam)
        else setSearchQuery(null) // Clear if param removed
    }, [searchParams])

    // Helper: Smart Slugify
    const slugify = (text: string) => {
        return text
            .toString()
            .toLowerCase()
            .trim()
            .normalize("NFD") // Split accents
            .replace(/[\u0300-\u036f]/g, "") // Remove accents
            .replace(/\s+/g, "-") // Replace spaces with -
            .replace(/[^\w\-]+/g, "") // Remove non-word chars
            .replace(/\-\-+/g, "-"); // Replace multiple - with single -
    }

    // Filtering Logic
    const filteredProducts = initialProducts.filter((product) => {
        // Search Filter (Keep Title Search for explicit Search Query ONLY)
        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            const title = product.title.toLowerCase()
            const desc = product.description?.toLowerCase() || ""
            if (!title.includes(query) && !desc.includes(query)) return false
        }

        // Fabric Filter (Legacy Param support, treat as category for strictness if needed, or keep heuristic)
        // User requested STRICT filtering. Let's map fabric param to smart check too if possible.
        // But fabric serves as a "Material" filter. For now, let's keep it simple or merge logic.
        // Actually, user said: "The filter must ONLY check product.category". 
        // So let's try to match fabric against category too.
        if (selectedFabric) {
            const paramSlug = slugify(selectedFabric)
            const paramRaw = selectedFabric.toLowerCase().trim()

            // Allow heuristic for title ONLY for Fabrics if strictly necessary, but user said NO title search.
            // However, "Soie de Médine" might be in title but category is "Hijab". 
            // If category is "Soie de Médine" (as per Admin Dropdown), then strict check works.
            // Let's checks category and customSlug.
            const catSlug = slugify(product.originalCategory || "")
            const customSlug = product.customCategorySlug ? slugify(product.customCategorySlug) : ""
            const titleSlug = slugify(product.title)

            // Exception: Fabrics are often not the main category (which might be Hijab).
            // But usually they are chosen via Dropdown "Soie de Médine".
            // So checking category should be enough.
            if (catSlug !== paramSlug && customSlug !== paramSlug) {
                // Fallback for partial matches (e.g. param "soie" matches cat "soie-de-medine")
                if (!catSlug.includes(paramRaw) && !customSlug.includes(paramRaw)) return false
            }
        }

        // Category Filter (FLEXIBLE & CASE-INSENSITIVE)
        if (selectedCategory) {
            const paramLower = selectedCategory.toLowerCase().trim()
            const catLower = (product.originalCategory || "").toLowerCase().trim()
            const customLower = (product.customCategorySlug || "").toLowerCase().trim()

            // Check if the param is contained in category OR custom slug
            // This handles: "hijab" matching "Hijabs", "pack" matching "Packs", etc.
            const matchesCategory = catLower.includes(paramLower)
            const matchesCustom = customLower.includes(paramLower)

            if (!matchesCategory && !matchesCustom) return false
        }

        // Size Filter
        if (selectedSize) {
            if (!product.sizes || product.sizes.length === 0) return false
            if (!product.sizes.includes(selectedSize)) return false
        }

        // Color Filter
        if (selectedColor) {
            if (!product.colors || product.colors.length === 0) return false
            // selectedColor is the Color ID. product.colors has {name, hexCode} but NOT ID usually in the UI mapped object?
            // Wait, `mapToUiProduct` maps colors to `{ name, hexCode }`. It DOES NOT include ID.
            // We need to fix `mapToUiProduct` in `page.tsx` to include ID if we want to filter by ID.
            // OR we filter by Color Name if we change `ProductFilters` to pass name? 
            // ProductFilters uses ID for key and selection.
            // Let's check `Product` type. `colors?: { name: string; hexCode: string }[]`.

            // Quick fix: Map UI product colors to include ID or filter by name match if possible.
            // But `colors` prop from DB has ID.
            // Let's assume we match by Name if ID is missing? 
            // The Color object in `product-filters` comes from DB `colors` (has ID, name, hex).
            // The `product.colors` comes from UI mapping `p.colors.map(...)`.

            // Let's check `page.tsx` map function. 
            // It maps `p.colors.map((c: any) => ({ name: c.name, hexCode: c.hexCode }))`.
            // ID is missing!

            // Option 1: Update `page.tsx` to include ID in `Product` type and mapping. (Best)
            // Option 2: Filter by name finding the name from `colors` array using `selectedColor` ID.

            // I'll choose Option 2 for now to minimize `Product` type changes if unnecessary, 
            // BUT `Product` type is shared. Adding ID is cleaner.

            // Let's try finding the color name from the `colors` prop passed to this component.
            const selectedColorObj = colors.find((c: any) => c.id === selectedColor)
            if (selectedColorObj) {
                const selectedName = selectedColorObj.name.toLowerCase()
                const hasColor = product.colors.some(c => c.name.toLowerCase() === selectedName)
                if (!hasColor) return false
            }
        }

        return true
    })

    const activeFiltersCount = (selectedFabric ? 1 : 0) + (selectedCategory ? 1 : 0) + (selectedSize ? 1 : 0) + (selectedColor ? 1 : 0)

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
                                    categories={categories}
                                    sizes={sizes}
                                    colors={colors}
                                    selectedSize={selectedSize}
                                    setSelectedSize={setSelectedSize}
                                    selectedColor={selectedColor}
                                    setSelectedColor={setSelectedColor}
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
                            {selectedCategory && (
                                <p className="text-xs text-red-400 mt-2 font-mono">
                                    [DEBUG] Searching for category: "{selectedCategory}" (Normalized: "{selectedCategory.toLowerCase().trim()}")
                                </p>
                            )}
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
