"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProductFiltersProps {
    selectedFabric: string | null
    setSelectedFabric: (value: string | null) => void
    selectedCategory: string | null
    setSelectedCategory: (value: string | null) => void
    inSheet?: boolean
}

export function ProductFilters({
    selectedFabric,
    setSelectedFabric,
    selectedCategory,
    setSelectedCategory,
    inSheet = false
}: ProductFiltersProps) {

    const fabrics = [
        { id: "soie", label: "Soie de Médine" },
        { id: "jersey", label: "Jersey" },
        { id: "crepe", label: "Crêpe" },
        { id: "mousseline", label: "Mousseline" },
        { id: "lycra", label: "Lycra" },
        { id: "lycra-degrade", label: "Lycra Dégradé" },
    ]

    const categories = [
        { id: "hijab", label: "Hijabs" },
        { id: "khimar", label: "Khimars" },
        { id: "pack", label: "Packs Exclusifs" },
        { id: "accessoire", label: "Accessoires" },
    ]

    return (
        <div className={cn("flex-shrink-0 space-y-8", inSheet ? "w-full" : "w-full md:w-64")}>
            {/* Mobile View: Horizontal Scroll - Hide if inSheet */}
            {!inSheet && (
                <div className="md:hidden overflow-x-auto pb-4 -mx-4 px-4 flex gap-2 scrollbar-hide">
                    <Button
                        variant={selectedFabric === null && selectedCategory === null ? "default" : "outline"}
                        size="sm"
                        className="rounded-full whitespace-nowrap"
                        onClick={() => { setSelectedFabric(null); setSelectedCategory(null); }}
                    >
                        Tout
                    </Button>
                    {categories.map((cat) => (
                        <Button
                            key={cat.id}
                            variant={selectedCategory === cat.id ? "default" : "outline"}
                            size="sm"
                            className="rounded-full whitespace-nowrap"
                            onClick={() => {
                                setSelectedCategory(cat.id === selectedCategory ? null : cat.id)
                                setSelectedFabric(null)
                            }}
                        >
                            {cat.label}
                        </Button>
                    ))}
                    {fabrics.map((fabric) => (
                        <Button
                            key={fabric.id}
                            variant={selectedFabric === fabric.id ? "default" : "outline"}
                            size="sm"
                            className="rounded-full whitespace-nowrap"
                            onClick={() => {
                                setSelectedFabric(fabric.id === selectedFabric ? null : fabric.id)
                            }}
                        >
                            {fabric.label}
                        </Button>
                    ))}
                </div>
            )}

            {/* Vertical View: Sidebar Sections - Show always if inSheet, else only md:block */}
            <div className={cn("space-y-8", inSheet ? "block" : "hidden md:block")}>
                {/* Section 1: Par Tissu */}
                <div>
                    <h3 className="text-lg font-serif font-bold mb-4">Par Tissu</h3>
                    <div className="space-y-2 flex flex-col items-start">
                        {fabrics.map((fabric) => (
                            <button
                                key={fabric.id}
                                onClick={() => setSelectedFabric(fabric.id === selectedFabric ? null : fabric.id)}
                                className={cn(
                                    "text-sm hover:text-primary transition-colors text-left",
                                    selectedFabric === fabric.id ? "font-bold text-primary underline underline-offset-4" : "text-muted-foreground"
                                )}
                            >
                                {fabric.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Section 2: Par Catégorie */}
                <div>
                    <h3 className="text-lg font-serif font-bold mb-4">Par Catégorie</h3>
                    <div className="space-y-2 flex flex-col items-start">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id === selectedCategory ? null : cat.id)}
                                className={cn(
                                    "text-sm hover:text-primary transition-colors text-left",
                                    selectedCategory === cat.id ? "font-bold text-primary underline underline-offset-4" : "text-muted-foreground"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Reset Filter */}
                {(selectedFabric || selectedCategory) && (
                    <button
                        onClick={() => { setSelectedFabric(null); setSelectedCategory(null); }}
                        className="text-xs text-muted-foreground hover:text-foreground underline"
                    >
                        Réinitialiser les filtres
                    </button>
                )}
            </div>
        </div>
    )
}
