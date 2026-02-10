import { auth } from "@/auth"
import { db } from "@/lib/db"
import { ProductsClient, Product } from "@/components/admin/products-client" // We'll create this next
import { getMainImage } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
    // Fetch products from DB - OPTIMIZED: Exclude heavy images field
    let dbProducts: any[] = [];
    try {
        dbProducts = await db.product.findMany({
            select: {
                id: true,
                name: true,
                price: true,
                category: true,
                isFeatured: true,
                createdAt: true,
                // ❌ DO NOT SELECT images field here - it contains Base64 data
                // Images will be loaded on-demand when editing individual products
            },
            orderBy: { createdAt: 'desc' },
        });
    } catch (error) {
        console.error("Admin Products DB Error:", error);
    }

    // Map to UI Product type
    const products: Product[] = dbProducts.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        images: "", // Empty string since we don't need images in list view
        isFeatured: p.isFeatured,
        createdAt: p.createdAt
    }))

    return <ProductsClient initialProducts={products} />
}
