import { auth } from "@/auth"
import { db } from "@/lib/db"
import { ProductsClient, Product } from "@/components/admin/products-client" // We'll create this next
import { getMainImage } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
    // Fetch products from DB
    let dbProducts: any[] = [];
    try {
        dbProducts = await db.product.findMany({
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
        images: p.images,
        isFeatured: p.isFeatured,
        createdAt: p.createdAt
    }))

    return <ProductsClient initialProducts={products} />
}
