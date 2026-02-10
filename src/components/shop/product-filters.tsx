"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductFiltersProps {
    selectedFabric: string | null
    setSelectedFabric: (value: string | null) => void
    selectedCategory: string | null
    setSelectedCategory: (value: string | null) => void
    selectedSize: string | null
    setSelectedSize: (value: string | null) => void
    selectedColor: string | null
    setSelectedColor: (value: string | null) => void
    categories: any[]
    sizes: any[]
    colors: any[]
    inSheet?: boolean
}

export function ProductFilters({
    selectedFabric,
    setSelectedFabric,
    selectedCategory,
    setSelectedCategory,
    selectedSize,
    setSelectedSize,
    selectedColor,
    setSelectedColor,
    categories,
    sizes,
    colors,
    inSheet = false
}: ProductFiltersProps) {

    // Fabrics are still technically hardcoded unless we want to fetch unique collectionNames?
    // User asked to REMOVE "Par Tissu".
    // "Remove: Delete sections like "Par Tissu" or static lists like "Soie de Médine"."
    // So we will remove Fabric filter logic from UI but keep prop if needed for compatibility or remove it.
    // User wants: "Add "Par Catégorie"", "Add "Par Taille"", "Add "Par Couleur"".

    return (
        <div className={cn("flex-shrink-0 space-y-8", inSheet ? "w-full" : "w-full md:w-64")}>

            {/* Mobile Horizontal Scroll - Removing Fabric, Showing Categories */}
            {!inSheet && (
                <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 flex gap-2 scrollbar-hide">
                    <Button
                        variant={selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        className="rounded-full whitespace-nowrap"
                        onClick={() => setSelectedCategory(null)}
                    >
                        Tout
                    </Button>
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={selectedCategory === cat.name ? "default" : "outline"}
                            size="sm"
                            className="rounded-full whitespace-nowrap"
                            onClick={() => setSelectedCategory(cat.name === selectedCategory ? null : cat.name)}
                        >
                            {cat.name}
                        </Button>
                    ))}
                </div>
            )}

            <div className={cn("space-y-8", inSheet ? "block" : "hidden md:block")}>

                {/* 1. Par Catégorie */}
                <div>
                    <h3 className="text-lg font-serif font-bold mb-4">Par Catégorie</h3>
                    <div className="space-y-2 flex flex-col items-start">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.name === selectedCategory ? null : cat.name)}
                                className={cn(
                                    "text-sm hover:text-primary transition-colors text-left flex items-center gap-2",
                                    selectedCategory === cat.name ? "font-bold text-primary" : "text-muted-foreground"
                                )}
                            >
                                <div className={cn("w-4 h-4 border rounded flex items-center justify-center", selectedCategory === cat.name ? "bg-black border-black text-white" : "border-gray-300")}>
                                    {selectedCategory === cat.name && <span className="text-[10px]">✓</span>}
                                </div>
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. Par Taille (New) */}
                <div>
                    <h3 className="text-lg font-serif font-bold mb-4">Par Taille</h3>
                    <div className="flex flex-wrap gap-2">
                        {sizes.map((size) => (
                            <button
                                key={size.id}
                                onClick={() => setSelectedSize(size.name === selectedSize ? null : size.name)}
                                className={cn(
                                    "w-10 h-10 border rounded flex items-center justify-center text-sm transition-all",
                                    selectedSize === size.name ? "bg-black text-white border-black" : "border-gray-200 hover:border-black text-gray-700"
                                )}
                            >
                                {size.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. Par Couleur (New) */}
                <div>
                    <h3 className="text-lg font-serif font-bold mb-4">Par Couleur</h3>
                    <div className="flex flex-wrap gap-2">
                        {colors.map((color) => (
                            <button
                                key={color.id}
                                onClick={() => setSelectedColor(color.id === selectedColor ? null : color.id)}
                                className={cn(
                                    "w-8 h-8 rounded-full border flex items-center justify-center transition-all relative group",
                                    selectedColor === color.id ? "ring-2 ring-offset-2 ring-black border-transparent" : "border-gray-200 hover:scale-110"
                                )}
                                style={{ backgroundColor: color.hexCode }}
                                title={color.name}
                            >
                                {/* Tooltip on hover */}
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10 w-auto">
                                    {color.name}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reset Filter */}
                {(selectedFabric || selectedCategory || selectedSize || selectedColor) && (
                    <button
                        onClick={() => {
                            setSelectedFabric(null);
                            setSelectedCategory(null);
                            setSelectedSize(null);
                            setSelectedColor(null);
                        }}
                        className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                        Réinitialiser les filtres
                    </button>
                )}
            </div>
        </div>
    )
}
