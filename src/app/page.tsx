import { HeroCarousel } from "@/components/landing/hero-carousel";
import { ProductCarousel } from "@/components/landing/product-carousel";
import { FeaturesSection } from "@/components/landing/features-section";
import { Moodboard } from "@/components/landing/moodboard";
import { BestSellers } from "@/components/landing/best-sellers";
import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { getMainImage } from "@/lib/utils";

// Correction: Mra wa7da
export const dynamic = "force-dynamic";

export default async function LandingPage() {
    const homeProductsData = await db.product.findMany({
        where: { showOnHome: true },
        orderBy: { createdAt: 'desc' }
    });

    const bestSellersData = await db.product.findMany({
        where: { isFeatured: true },
        take: 8
    });

    const mapToUiProduct = (p: any): Product => ({
        id: p.id,
        title: p.name,
        price: `${p.price} DH`,
        priceNum: p.price,
        type: p.category === 'pack' ? 'pack' : 'single',
        image: getMainImage(p.images),
        isNew: p.isNewArrival,
        affiliateEnabled: false,
        salesCount: 0,
        showSalesCount: false,
        rating: 0,
        colors: []
    });

    const newArrivals = homeProductsData.map(mapToUiProduct);
    const bestSellers = bestSellersData.map(mapToUiProduct);

    return (
        <div className="flex flex-col font-sans">
            <HeroCarousel />
            <ProductCarousel products={newArrivals} />
            <Moodboard />
            <BestSellers products={bestSellers} />
            <FeaturesSection />
        </div>
    );
}