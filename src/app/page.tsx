import { HeroCarousel } from "@/components/landing/hero-carousel";
import { ProductCarousel } from "@/components/landing/product-carousel";
import { FeaturesSection } from "@/components/landing/features-section";
import { Moodboard } from "@/components/landing/moodboard";
import { BestSellers } from "@/components/landing/best-sellers";
import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { getMainImage } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
    // 1. Fetch New Arrivals (Manual Selection via showOnHome)
    // The user wants "New Arrivals" to be manually controlled?
    // Request: "Fetch products specifically where showOnHome: true."
    // Request: "Ignore date sorting for the "Hero/Featured" section; respect the user's manual selection." -> Wait.
    // Clarification: 
    // "Update Homepage Logic:
    // Query: Fetch products specifically where showOnHome: true.
    // Display: If isNewArrival is true for a product, the ProductCard MUST display a 'NOUVEAU' badge..."

    // It seems 'showOnHome' drives the 'New Arrivals' section (or generally what is shown).
    // Let's assume the "New Arrivals" carousel should show items with `showOnHome: true`.

    const homeProductsData = await db.product.findMany({
        where: { showOnHome: true },
        orderBy: { createdAt: 'desc' } // Keep sorting by date for valid ordering within the selection
    });

    // 2. Fetch Best Sellers (Featured) -> Keep as is (isFeatured: true)
    const bestSellersData = await db.product.findMany({
        where: { isFeatured: true },
        take: 8
    });

    // Helper to map DB product to UI product
    const mapToUiProduct = (p: any): Product => ({
        id: p.id,
        title: p.name,
        price: `${p.price} DH`,
        priceNum: p.price,
        type: p.category === 'pack' ? 'pack' : 'single',
        image: getMainImage(p.images),
        isNew: p.isNewArrival, // Use Manual Flag
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
            {/* New Arrivals */}
            <ProductCarousel products={newArrivals} />
            <Moodboard />
            {/* Best Sellers */}
            <BestSellers products={bestSellers} />
            <FeaturesSection />
        </div>
    );
}
