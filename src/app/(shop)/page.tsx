import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { getMainImage } from "@/lib/utils";
import LandingPageClient from "@/components/landing/landing-client";

export const dynamic = "force-dynamic";

export default async function LandingPage() {
    let allProductsData: any[] = [];
    let mensProductsData: any[] = [];
    let essentialsProducts: any[] = [];
    let editorialProducts: any[] = [];
    let newInProducts: any[] = [];
    let siteSettings = null;
    let homeLayout = null;

    console.log("Fetching Data for Single Page App...");

    try {
        // 1. Fetch ALL products (ordered by newest)
        allProductsData = await db.product.findMany({
            take: 50,
            orderBy: { createdAt: 'desc' },
            include: { colors: true }
        });
        console.log("Fetched Products:", allProductsData.length);

        // 2. Fetch Men's Products (Limit 6 for the grid)
        mensProductsData = await db.product.findMany({
            where: {
                OR: [
                    { category: 'Homme' },
                    { category: 'Qamis' },
                    { name: { contains: 'Homme' } }
                ]
            },
            take: 6,
            orderBy: { createdAt: 'desc' },
            include: { colors: true }
        });

        // 3. Fetch Site Settings (Middle Banner - deprecated, using homeLayout now)
        siteSettings = await db.siteSettings.findFirst();

        // 4. Fetch Home Layout
        homeLayout = await db.homeLayout.findFirst();

        // 5. Fetch "NOS ESSENTIELS" (Strict limit of 4)
        essentialsProducts = await db.product.findMany({
            where: {
                homepageLocation: 'ESSENTIALS',
                status: 'active'
            },
            take: 4,
            orderBy: { createdAt: 'desc' },
            include: { colors: true }
        });

        // 6. Fetch "VESTIAIRE MASCULIN" (Strict limit of 6)
        editorialProducts = await db.product.findMany({
            where: {
                homepageLocation: 'EDITORIAL',
                status: 'active'
            },
            take: 6,
            orderBy: { createdAt: 'desc' },
            include: { colors: true }
        });

        // 7. Fetch "NEW IN" (Unlimited / High Limit)
        newInProducts = await db.product.findMany({
            where: {
                homepageLocation: 'NEW_IN',
                status: 'active'
            },
            take: 50, // High limit to simulate unlimited
            orderBy: { createdAt: 'desc' },
            include: { colors: true }
        });

        // DEBUG: Check if images exist in database
        console.log("=== SERVER DATA DEBUG ===");
        console.log("HomeLayout exists:", !!homeLayout);
        if (homeLayout) {
            console.log("Middle Image exists:", !!homeLayout.middleImage);
            console.log("Middle Image length:", homeLayout.middleImage?.length);
            console.log("Middle Image starts with data:", homeLayout.middleImage?.startsWith('data:'));
            console.log("Split Left Image exists:", !!homeLayout.splitLeftImage);
            console.log("Split Right Image exists:", !!homeLayout.splitRightImage);
        }
        console.log("ESSENTIALS Count:", essentialsProducts.length);
        console.log("EDITORIAL Count:", editorialProducts.length);
        console.log("NEW IN Count:", newInProducts.length);
        console.log("========================");

    } catch (error) {
        console.error("DB_ERROR_CRITICAL:", error);
    }

    // Separate map function to reuse
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
            // Map Colors
            colors: p.colors ? p.colors.map((c: any) => ({ name: c.name, hexCode: c.hexCode })) : [],
            // Pass category/collection for filtering
            category: p.category,
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        }
    };

    const uiProducts = allProductsData.map(mapToUiProduct);
    const uiMensProducts = mensProductsData.map(mapToUiProduct); // Keep as fallback if needed, but we prefer editorialProducts
    const uiEssentialsProducts = essentialsProducts.map(mapToUiProduct);
    const uiEditorialProducts = editorialProducts.map(mapToUiProduct);
    const uiNewInProducts = newInProducts.map(mapToUiProduct);

    return (
        <LandingPageClient
            allProducts={uiProducts}
            mensProducts={uiMensProducts}
            essentialsProducts={uiEssentialsProducts}
            editorialProducts={uiEditorialProducts}
            newInProducts={uiNewInProducts}
            siteSettings={siteSettings}
            homeLayout={homeLayout}
        />
    );
}