"use client"

import { Product } from "@/types/product"
import { StreetwearProductGrid } from "@/components/landing/streetwear-product-grid"
import { NewInMarquee } from "@/components/landing/new-in-marquee"
import { DualCategoryBanner } from "@/components/landing/dual-category-banner"
import Link from "next/link"
import Image from "next/image"
import { MensEditorialGrid } from "@/components/landing/mens-editorial-grid"
import cloudinaryLoader from "@/lib/cloudinary-loader"

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

interface LandingPageClientProps {
    essentialsProducts: Product[]
    editorialProducts: Product[]
    newInProducts: Product[]
    homeLayout: HomeLayout | null
}

export default function LandingPageClient({
    essentialsProducts = [],
    editorialProducts = [],
    newInProducts = [],
    homeLayout
}: LandingPageClientProps) {

    // -- RENDER: HOME VIEW --
    return (
        <div className="flex flex-col font-sans bg-[#F5F3EB] min-h-screen">
            {/* Hero Section - Dynamic from HomeLayout DB */}
            <div className="relative w-full h-[90vh] overflow-hidden bg-black">
                <div className="absolute inset-0 z-0">
                    {homeLayout?.heroImage ? (
                        homeLayout.heroImage.startsWith('data:') ? (
                            <Image
                                src={homeLayout.heroImage}
                                loader={cloudinaryLoader}
                                alt={homeLayout.heroTitle || "Modest Fashion Collection"}
                                fill
                                priority
                                className="object-cover object-center"
                                sizes="100vw"
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
                                href="/products"
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
                            <Image
                                src={homeLayout.middleImage}
                                loader={cloudinaryLoader}
                                alt={homeLayout.middleTitle || "Collection"}
                                fill
                                loading="lazy"
                                className="object-cover object-center"
                                sizes="100vw"
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
                    <Link href={homeLayout?.middleCategory ? `/products?category=${homeLayout.middleCategory}` : "/products?category=soie-de-medine"}>
                        <button className="bg-white text-black px-12 py-4 uppercase font-bold text-sm tracking-widest hover:bg-gray-100 transition-colors">
                            Acheter Maintenant
                        </button>
                    </Link>
                </div>
            </section>

            {/* Men's Editorial Grid */}
            <MensEditorialGrid products={editorialProducts} />

            {/* Creator's Club Banner */}
            <section className="w-full py-20 bg-[#E6E2D6] text-center my-12">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase text-black mb-4">
                        L'Univers STYLEPSY
                    </h2>
                    <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                        Inspirer la modestie à travers une mode éthique et élégante. Rejoignez le mouvement.
                    </p>
                    <Link href="/products">
                        <button className="bg-black text-white px-10 py-3 uppercase font-bold text-sm tracking-widest hover:bg-zinc-800 transition-colors">
                            En Savoir Plus
                        </button>
                    </Link>
                </div>
            </section>

            {/* NEW IN Marquee Section - Unlimited */}
            <NewInMarquee products={newInProducts} />

            {/* Dual Category Banner (La Maison / Accessoires) */}
            <DualCategoryBanner homeLayout={homeLayout} />
        </div>
    )
}
