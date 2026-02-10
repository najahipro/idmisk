import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { getMainImage } from "@/lib/utils";
import LandingPageClient from "@/components/landing/landing-client";
import { getHomeLayout } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
    let essentialsProducts: any[] = [];
    let editorialProducts: any[] = [];
    let newInProducts: any[] = [];
    let homeLayout = null;

    console.log("Fetching Optimized Home Data...");

    try {
        // 1. Fetch Home Layout (Cached)
        homeLayout = await getHomeLayout();

        // 2. Fetch "NOS ESSENTIELS" (Strict limit of 4)
        essentialsProducts = await db.product.findMany({
            where: {
                homepageLocation: 'ESSENTIALS',
                status: 'active'
            },
            take: 4,
            orderBy: { createdAt: 'desc' },
            include: { colors: true }
        });

        // 3. Fetch "VESTIAIRE MASCULIN" (Strict limit of 6)
        editorialProducts = await db.product.findMany({
            where: {
                homepageLocation: 'EDITORIAL',
                status: 'active'
            },
            take: 6,
            orderBy: { createdAt: 'desc' },
            include: { colors: true }
        });

        // 4. Fetch "NEW IN" (Moderate limit for marquee)
        newInProducts = await db.product.findMany({
            where: {
                homepageLocation: 'NEW_IN',
                status: 'active'
            },
            take: 20,
            orderBy: { createdAt: 'desc' },
            include: { colors: true }
        });

    } catch (error) {
        console.error("DB_ERROR_CRITICAL:", error);
    }

    // Reuse map function
    const mapToUiProduct = (p: any): Product => {
        let imagesArray: string[] = []
        if (p.images) {
            try {
                imagesArray = typeof p.images === 'string' ? JSON.parse(p.images) : p.images
            } catch {
                if (typeof p.images === 'string') {
                    imagesArray = p.images.split(',').map((img: string) => img.trim())
                }
            }
        }

        return {
            id: p.id,
            title: p.title || p.name,
            price: typeof p.price === 'string' ? p.price : `${p.price} DH`,
            priceNum: p.priceNum || p.price,
            type: p.category === 'pack' ? 'pack' : 'single',
            image: p.image || getMainImage(p.images),
            images: imagesArray,
            isNew: p.isNewArrival,
            affiliateEnabled: false,
            salesCount: 0,
            showSalesCount: false,
            rating: 0,
            colors: p.colors ? p.colors.map((c: any) => ({ name: c.name, hexCode: c.hexCode })) : [],
            category: p.category,
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        }
    };

    const uiEssentialsProducts = essentialsProducts.map(mapToUiProduct);
    const uiEditorialProducts = editorialProducts.map(mapToUiProduct);
    const uiNewInProducts = newInProducts.map(mapToUiProduct);

    return (
        <LandingPageClient
            essentialsProducts={uiEssentialsProducts}
            editorialProducts={uiEditorialProducts}
            newInProducts={uiNewInProducts}
            homeLayout={homeLayout}
        />
    );
}