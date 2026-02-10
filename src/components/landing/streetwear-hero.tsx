import Link from "next/link";
import Image from "next/image";

interface StreetwearHeroProps {
    heroImage?: string | null
    heroTitle?: string | null
    heroSubtitle?: string | null
    heroButtonText?: string | null
}

export function StreetwearHero({ heroImage, heroTitle, heroSubtitle, heroButtonText }: StreetwearHeroProps) {
    // Use provided data or fallback to defaults
    const image = heroImage || "https://images.unsplash.com/photo-1520013817300-1f4c1cb245ef?q=80&w=1200&auto=format&fit=crop"
    const title = heroTitle || "L'Élégance Modeste"
    const subtitle = heroSubtitle || "Découvrez notre collection exclusive"
    const buttonText = heroButtonText || "Découvrir"

    return (
        <div className="relative w-full h-[90vh] overflow-hidden bg-black">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-20 lg:px-32 w-full">
                <div className="max-w-3xl space-y-6">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-thin uppercase text-white leading-[0.85] tracking-wider">
                        {title}
                    </h1>

                    <p className="text-white/90 text-lg md:text-xl font-light max-w-lg leading-relaxed pt-4">
                        {subtitle}
                    </p>

                    <div className="pt-8">
                        <Link
                            href="/?filter=new-in"
                            className="group inline-flex items-center gap-3 px-10 py-4 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-[#F5F3EB] transition-all duration-300"
                        >
                            {buttonText}
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
