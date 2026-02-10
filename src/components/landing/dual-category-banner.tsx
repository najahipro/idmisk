"use client"

import Link from "next/link"
import Image from "next/image"

interface HomeLayout {
    splitLeftImage?: string | null
    splitLeftTitle?: string | null
    splitLeftCategory?: string | null
    splitRightImage?: string | null
    splitRightTitle?: string | null
    splitRightCategory?: string | null
}

interface DualCategoryBannerProps {
    homeLayout?: HomeLayout | null
}

export function DualCategoryBanner({ homeLayout }: DualCategoryBannerProps) {
    // Fallback to defaults if no homeLayout data
    const leftImage = homeLayout?.splitLeftImage || "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?q=80&w=1200&auto=format&fit=crop"
    const leftTitle = homeLayout?.splitLeftTitle || "La Maison"
    const leftLink = `/?filter=${homeLayout?.splitLeftCategory || 'la-maison'}`

    const rightImage = homeLayout?.splitRightImage || "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=800&auto=format&fit=crop"
    const rightTitle = homeLayout?.splitRightTitle || "Accessoires"
    const rightLink = `/?filter=${homeLayout?.splitRightCategory || 'accessoires'}`

    return (
        <section className="w-full bg-white px-2 py-8 md:py-16">
            <div className="flex flex-row items-start gap-4 max-w-[1800px] mx-auto">

                {/* Left Column: LA MAISON (620px height - 58% width) */}
                <Link href={leftLink} className="block w-[58%] relative group overflow-hidden">
                    <div className="relative h-[620px] w-full">
                        {homeLayout?.splitLeftImage ? (
                            homeLayout.splitLeftImage.startsWith('data:') ? (
                                <img
                                    src={homeLayout.splitLeftImage}
                                    alt={leftTitle}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                                />
                            ) : (
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-red-500 text-white text-xl font-bold">
                                    ❌ LEFT IMAGE INVALID
                                </div>
                            )
                        ) : (
                            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-red-500 text-white text-xl font-bold">
                                ❌ LEFT IMAGE MISSING
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />

                        {/* Text Overlay - Bottom Left */}
                        <div className="absolute bottom-8 left-6 md:bottom-16 md:left-12 text-white z-10 pr-4">
                            <p className="text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase mb-2 md:mb-4 opacity-90">
                                Collection Intérieure
                            </p>
                            <h2 className="text-4xl md:text-7xl lg:text-8xl font-heading font-thin uppercase tracking-tight mb-4 md:mb-8 leading-[0.9]">
                                {leftTitle}
                            </h2>
                            <button className="hidden md:inline-block bg-white text-black px-6 py-2 md:px-8 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-colors duration-300">
                                Découvrir
                            </button>
                        </div>
                    </div>
                </Link>

                {/* Right Column: ACCESSOIRES (500px height - 40% width) */}
                <Link href={rightLink} className="block w-[40%] relative group">
                    <div className="relative h-[500px] w-full overflow-hidden mb-4">
                        {homeLayout?.splitRightImage ? (
                            homeLayout.splitRightImage.startsWith('data:') ? (
                                <img
                                    src={homeLayout.splitRightImage}
                                    alt={rightTitle}
                                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                                />
                            ) : (
                                <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-red-500 text-white text-xl font-bold">
                                    ❌ RIGHT IMAGE INVALID
                                </div>
                            )
                        ) : (
                            <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-red-500 text-white text-xl font-bold">
                                ❌ RIGHT IMAGE MISSING
                            </div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </div>

                    {/* Text Below Image */}
                    <div className="text-left md:text-center pl-2 md:pl-0">
                        <h2 className="text-2xl md:text-5xl font-heading font-thin uppercase tracking-[0.1em] text-black mb-2">
                            {rightTitle}
                        </h2>
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest border-b border-black pb-1 group-hover:text-gray-600 group-hover:border-gray-600 transition-colors">
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>
        </section>
    )
}
