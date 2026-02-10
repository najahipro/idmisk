"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Product } from "@/types/product"
import { StreetwearHero } from "@/components/landing/streetwear-hero"
import { StreetwearProductGrid } from "@/components/landing/streetwear-product-grid"
import { NewInMarquee } from "@/components/landing/new-in-marquee"
import { DualCategoryBanner } from "@/components/landing/dual-category-banner"
import { ProductListingView } from "@/components/landing/product-listing-view"
import Image from "next/image"
import Link from "next/link"

interface SiteSettings {
    middleBannerImage?: string | null
    middleBannerTitle?: string | null
    middleBannerLink?: string | null
}

interface HomeLayout {
    heroImage?: string | null
    heroTitle?: string | null
    heroSubtitle?: string | null
    heroButtonText?: string | null
    middleImage?: string | null
    middleTitle?: string | null
    middleCategory?: string | null
    splitLeftImage?: string | null
    splitLeftTitle?: string | null
    splitLeftCategory?: string | null
    splitRightImage?: string | null
    splitRightTitle?: string | null
    splitRightCategory?: string | null
}

import { MensEditorialGrid } from "@/components/landing/mens-editorial-grid"

interface LandingPageClientProps {
    allProducts: Product[]
    mensProducts?: Product[]
    essentialsProducts?: Product[]
    editorialProducts?: Product[]
    newInProducts?: Product[]
    siteSettings: SiteSettings | null
    homeLayout: HomeLayout | null
}

export default function LandingPageClient({
    allProducts,
    mensProducts = [],
    essentialsProducts = [],
    editorialProducts = [],
    newInProducts = [],
    siteSettings,
    homeLayout
}: LandingPageClientProps) {
    const searchParams = useSearchParams()
    const filter = searchParams.get('filter')?.toLowerCase() || 'home'

    // -- VIEW LOGIC --
    // We derive the view from the URL 'filter' param.
    // ... (rest of logic)

    const getFilteredProducts = () => {
        let filtered = [...allProducts]

        switch (filter) {
            case 'new-in':
                return filtered.filter(p => p.isNew)
            case 'femme':
                return filtered.filter(p =>
                    p.category === 'Hijabs' ||
                    p.category === 'Khimars' ||
                    p.category === 'Abayas' ||
                    p.category === 'Robes' ||
                    p.title.toLowerCase().includes('femme') ||
                    p.title.toLowerCase().includes('hijab') ||
                    p.title.toLowerCase().includes('khimar')
                )
            case 'homme':
                return filtered.filter(p =>
                    p.category === 'Homme' ||
                    p.title.toLowerCase().includes('homme')
                )
            case 'accessoires':
                return filtered.filter(p => p.category === 'Accessoires' || p.category === 'Packs')
            case 'la-maison':
                return filtered.filter(p => p.category === 'Maison')
            case 'shop':
                return filtered
            default:
                return filtered
        }
    }

    const filteredProducts = getFilteredProducts()

    // -- RENDER: HOME VIEW --
    if (filter === 'home') {
        const legacy = allProducts.slice(4, 8) // Using this as fallback for "new collection" if needed, but we typically replace it

        return (
            <div className="flex flex-col font-sans bg-[#F5F3EB] min-h-screen">
                {/* Hero Section - Dynamic from HomeLayout DB */}
                <div className="relative w-full h-[90vh] overflow-hidden bg-black">
                    <div className="absolute inset-0 z-0">
                        {homeLayout?.heroImage ? (
                            homeLayout.heroImage.startsWith('data:') ? (
                                <img
                                    src={homeLayout.heroImage}
                                    alt={homeLayout.heroTitle || "Modest Fashion Collection"}
                                    className="absolute inset-0 w-full h-full object-cover object-center"
                                />
                            ) : (
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-red-500 text-white text-2xl font-bold">
                                    ❌ HERO IMAGE INVALID (Not Base64)
                                </div>
                            )
                        ) : (
                            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-red-500 text-white text-2xl font-bold">
                                ❌ HERO IMAGE MISSING - Upload in Admin
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                    </div>

                    <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 lg:px-32 w-full">
                        <div className="max-w-3xl space-y-6">
                            <p className="text-white/80 uppercase tracking-[0.2em] text-sm font-medium mb-2">
                                Nouvelle Collection
                            </p>
                            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold uppercase text-white leading-[0.85] tracking-tighter">
                                {homeLayout?.heroTitle || "L'Élégance"} <br /> {homeLayout?.heroTitle ? "" : "Modeste"}
                            </h1>
                            <p className="text-white/90 text-lg md:text-xl font-light max-w-lg leading-relaxed pt-4">
                                {homeLayout?.heroSubtitle || "Découvrez notre sélection exclusive de hijabs et kimonos. Une alliance parfaite entre pudeur et modernité."}
                            </p>
                            <div className="pt-8">
                                <Link
                                    href="/?filter=shop"
                                    className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-[#F5F3EB] transition-all duration-300"
                                >
                                    {homeLayout?.heroButtonText || "Découvrir"}
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <StreetwearProductGrid products={essentialsProducts} title="NOS ESSENTIELS" columns={4} />

                {/* Mid-page Banner - Dynamic from HomeLayout DB */}
                <section className="w-full h-[80vh] relative overflow-hidden">
                    <div className="absolute inset-0">
                        {homeLayout?.middleImage ? (
                            homeLayout.middleImage.startsWith('data:') ? (
                                <img
                                    src={homeLayout.middleImage}
                                    alt={homeLayout.middleTitle || "Collection"}
                                    className="w-full h-full object-cover object-center"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-red-500 text-white text-2xl font-bold">
                                    ❌ IMAGE DATA INVALID (Not Base64)
                                </div>
                            )
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-red-500 text-white text-2xl font-bold">
                                ❌ IMAGE MISSING - No middleImage in database
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/30" />
                    </div>
                    <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6 z-10">
                        <p className="text-sm uppercase tracking-[0.3em] mb-4 font-medium text-white/90">
                            Collection Exclusive
                        </p>
                        <h2 className="text-6xl md:text-8xl font-heading font-bold uppercase mb-10 drop-shadow-xl">
                            {homeLayout?.middleTitle || "Soie de Médine"}
                        </h2>
                        <Link href={homeLayout?.middleCategory ? `/?filter=${homeLayout.middleCategory}` : "/?filter=femme"}>
                            <button className="bg-white text-black px-12 py-4 uppercase font-bold text-sm tracking-widest hover:bg-gray-100 transition-colors">
                                Acheter Maintenant
                            </button>
                        </Link>
                    </div>
                </section>

                {/* REPLACED: Simple Grid -> Men's Editorial Grid */}
                {/* STRICT 6 items from 'EDITORIAL' location, falling back to general men's products if empty */}
                <MensEditorialGrid products={editorialProducts.length > 0 ? editorialProducts : mensProducts} />

                {/* Creator's Club Banner */}
                <section className="w-full py-20 bg-[#E6E2D6] text-center my-12">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase text-black mb-4">
                            L'Univers STYLEPSY
                        </h2>
                        <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                            Inspirer la modestie à travers une mode éthique et élégante. Rejoignez le mouvement.
                        </p>
                        <Link href="/?filter=shop">
                            <button className="bg-black text-white px-10 py-3 uppercase font-bold text-sm tracking-widest hover:bg-zinc-800 transition-colors">
                                En Savoir Plus
                            </button>
                        </Link>
                    </div>
                </section>

                {/* NEW IN Marquee Section - Unlimited */}
                <NewInMarquee products={newInProducts.length > 0 ? newInProducts : allProducts.slice(0, 10)} />

                {/* Dual Category Banner (La Maison / Accessoires) */}
                <DualCategoryBanner homeLayout={homeLayout} />
            </div>
        )
    }

    // -- RENDER: CATEGORY VIEW (Instant Switch) --
    let viewTitle = "Collection"
    let subCategories = ["Tout voir", "Nouveautés"]

    if (filter === 'new-in') {
        viewTitle = "NOUVEAUTÉS";
        subCategories = ["Tout voir", "Cette semaine", "Mois dernier"];
    }
    if (filter === 'femme') {
        viewTitle = "VESTIAIRE FÉMININ";
        subCategories = ["Tout voir", "Abayas", "Khimars", "Robes", "Ensembles", "Jilbabs"];
    }
    if (filter === 'homme') {
        viewTitle = "VESTIAIRE MASCULIN";
        subCategories = ["Tout voir", "Qamis", "Ensembles", "Pantalons", "Chemises", "Capes"];
    }
    if (filter === 'la-maison') {
        viewTitle = "LA MAISON";
        subCategories = ["Tout voir", "Parfums", "Décoration", "Tapis", "Encens"];
    }
    if (filter === 'accessoires') {
        viewTitle = "ACCESSOIRES";
        subCategories = ["Tout voir", "Bijoux", "Sacs", "Foulards", "Cagoules"];
    }
    if (filter === 'shop') {
        viewTitle = "LA BOUTIQUE";
        subCategories = ["Tout voir", "Femme", "Homme", "Enfants", "Accessoires", "Maison"];
    }

    return (
        <ProductListingView products={filteredProducts} title={viewTitle} categories={subCategories} />
    )
}
