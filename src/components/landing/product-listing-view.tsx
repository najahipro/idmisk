"use client"

import { useState, useMemo } from "react"
import { Product } from "@/types/product"
import { useCurrency } from "@/context/currency-context"
import Image from "next/image"
import Link from "next/link"
import { Filter, X } from "lucide-react"

interface ProductListingViewProps {
    products: Product[]
    title: string
    categories?: string[] // Optional custom categories
}

export function ProductListingView({ products, title, categories: customCategories }: ProductListingViewProps) {
    const { formatPrice } = useCurrency()
    // Changed to array for multiple selection via checkboxes
    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [selectedCategories, setSelectedCategories] = useState<string[]>([])
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

    // -- Derived Data --
    const categories = customCategories || ["Tout voir", "Nouveautés", "Abayas", "Khimars", "Jilbabs", "Robes", "Ensembles"]

    // Sizes to check against
    const allSizes = ["XS", "S", "M", "L", "XL", "XXL"]

    // 1. Calculate Counts for Categories
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        categories.forEach(cat => counts[cat] = 0)

        // Special case for 'Tout voir' - just count all products
        counts['Tout voir'] = products.length

        products.forEach(p => {
            // Skip 'Tout voir' loop
            categories.filter(c => c !== 'Tout voir').forEach(cat => {
                // Check if product matches this category
                // Logic must match how we classified them in LandingPageClient or general classification
                if (p.category === cat ||
                    (p.category && p.category.includes(cat)) ||
                    (p.title && p.title.toLowerCase().includes(cat.toLowerCase()))) {
                    counts[cat]++
                }
            })
        })
        return counts
    }, [products, categories])

    // 2. Calculate Counts for Sizes
    const sizeCounts = useMemo(() => {
        const counts: Record<string, number> = {}
        allSizes.forEach(size => counts[size] = 0)

        products.forEach(p => {
            if (p.sizes && Array.isArray(p.sizes)) {
                p.sizes.forEach(s => {
                    if (counts[s] !== undefined) {
                        counts[s]++
                    } else if (allSizes.includes(s)) {
                        counts[s]++
                    }
                })
            }
        })
        return counts
    }, [products])

    // -- Filter Logic --
    const filteredProducts = useMemo(() => {
        let res = products

        // Filter by Size
        if (selectedSizes.length > 0) {
            res = res.filter(p => p.sizes?.some(s => selectedSizes.includes(s)))
        }

        // Filter by Category
        if (selectedCategories.length > 0 && !selectedCategories.includes('Tout voir')) {
            res = res.filter(p => selectedCategories.some(cat =>
                p.category === cat ||
                (p.category && p.category.includes(cat)) ||
                (p.title && p.title.toLowerCase().includes(cat.toLowerCase()))
            ))
        }

        return res
    }, [products, selectedSizes, selectedCategories])

    const toggleSize = (size: string) => {
        setSelectedSizes(prev =>
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        )
    }

    const toggleCategory = (cat: string) => {
        if (cat === 'Tout voir') {
            // If "Tout voir" is clicked, clear other selections or just set to ["Tout voir"]
            // Let's say it clears others
            setSelectedCategories(['Tout voir'])
            return
        }

        setSelectedCategories(prev => {
            const newSelection = prev.includes(cat)
                ? prev.filter(c => c !== cat)
                : [...prev.filter(c => c !== 'Tout voir'), cat]

            // If empty, maybe default to "Tout voir"? Or just empty (implies all)
            return newSelection
        })
    }

    return (
        <div className="min-h-screen bg-[#F5F3EB] pt-8 md:pt-12 pb-20">
            {/* 1. Page Header */}
            <div className="max-w-[95%] mx-auto px-2 md:px-4 mb-12 md:mb-20 text-center">
                <h1 className="text-5xl md:text-7xl font-heading font-thin uppercase tracking-widest text-black">
                    {title}
                </h1>
            </div>

            <div className="max-w-[95%] max-w-screen-2xl mx-auto px-2 md:px-4 flex flex-col md:flex-row gap-8">
                {/* Mobile Filter Button */}
                <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="md:hidden flex items-center gap-2 border border-black/20 px-4 py-3 uppercase text-sm tracking-widest font-medium w-full justify-center hover:bg-black/5"
                >
                    <Filter className="w-4 h-4" /> Filtres
                </button>

                {/* 2. Sidebar (Filters) - Desktop & Mobile Drawer */}
                <aside className={`
                    fixed inset-0 z-50 bg-[#F5F3EB] p-6 transform transition-transform duration-300 ease-in-out md:relative md:transform-none md:inset-auto md:w-1/5 md:block md:p-0 md:bg-transparent
                    ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    <div className="flex justify-between items-center md:hidden mb-8">
                        <span className="text-xl font-heading font-bold uppercase">Filtres</span>
                        <button onClick={() => setMobileFiltersOpen(false)}>
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Categories (Redesigned with Checkboxes) */}
                    <div className="mb-12">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black/10 pb-2">Catégories</h3>
                        <div className="flex flex-col space-y-3">
                            {categories.map((cat) => {
                                const count = categoryCounts[cat] || 0;
                                const isChecked = selectedCategories.includes(cat) || (selectedCategories.length === 0 && cat === 'Tout voir');
                                const isDisabled = count === 0 && cat !== 'Tout voir';

                                return (
                                    <div
                                        key={cat}
                                        className={`flex items-center justify-between group ${isDisabled ? 'opacity-40 pointer-events-none' : 'cursor-pointer'}`}
                                        onClick={() => !isDisabled && toggleCategory(cat)}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Custom Checkbox Appearance */}
                                            <div className={`w-4 h-4 border border-black flex items-center justify-center transition-colors ${isChecked ? 'bg-black' : 'bg-transparent'}`}>
                                                {isChecked && <div className="w-2 h-2 bg-white" />}
                                            </div>
                                            <span className="text-sm font-medium uppercase tracking-wide">{cat}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 font-light">({count})</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Size Filter (Redesigned with Checkboxes) */}
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6 border-b border-black/10 pb-2">Tailles</h3>
                        <div className="flex flex-col space-y-3">
                            {allSizes.map((size) => {
                                const count = sizeCounts[size] || 0;
                                const isSelected = selectedSizes.includes(size);
                                const isDisabled = count === 0;

                                return (
                                    <div
                                        key={size}
                                        className={`flex items-center justify-between group ${isDisabled ? 'opacity-40 pointer-events-none' : 'cursor-pointer'}`}
                                        onClick={() => !isDisabled && toggleSize(size)}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* Custom Checkbox Appearance */}
                                            <div className={`w-4 h-4 border border-black flex items-center justify-center transition-colors ${isSelected ? 'bg-black' : 'bg-transparent'}`}>
                                                {isSelected && <div className="w-2 h-2 bg-white" />}
                                            </div>
                                            <span className="text-sm font-medium uppercase tracking-wide">{size}</span>
                                        </div>
                                        <span className="text-xs text-gray-500 font-light">({count})</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </aside>

                {/* 3. Product Grid */}
                <main className="w-full md:w-4/5">
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-8 md:gap-x-6 md:gap-y-12 justify-items-center">
                        {filteredProducts.map((product) => (
                            <Link key={product.id} href={`/products/${product.id}`} className="group block w-full max-w-[620px]">
                                {/* Image - Square with max 620px */}
                                <div className="aspect-square relative overflow-hidden bg-gray-100 mb-4 w-full">
                                    <Image
                                        src={product.image || "/placeholder.jpg"}
                                        alt={product.title}
                                        fill
                                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 50vw, 620px"
                                    />
                                    {product.isNew && (
                                        <span className="absolute top-2 right-2 bg-white/90 text-[10px] font-bold px-2 py-1 uppercase tracking-wider backdrop-blur-sm">
                                            Nouveau
                                        </span>
                                    )}
                                </div>

                                {/* Text Info (Redesigned) */}
                                <div className="text-left space-y-1">
                                    <h3 className="font-light text-sm md:text-base text-black/90 group-hover:underline underline-offset-4 decoration-black/20 transition-all">
                                        {product.title}
                                    </h3>
                                    <p className="font-medium text-sm text-gray-500">
                                        {formatPrice(product.priceNum)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20 text-gray-500 font-light">
                            Aucun produit ne correspond à vos filtres.
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}
