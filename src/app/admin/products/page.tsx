import { db } from "@/lib/db"
import { ProductsClient } from "@/components/admin/products-client" // We'll create this next
import { Product } from "@/context/product-context"
import { getMainImage } from "@/lib/utils"

export const dynamic = "force-dynamic"

export default async function AdminProductsPage() {
    // Fetch products from DB
    const dbProducts = await db.product.findMany({
        orderBy: { createdAt: 'desc' },
    })

    // Map to UI Product type
    const products: Product[] = dbProducts.map((p) => ({
        id: p.id,
        title: p.name,
        price: `${p.price} DH`,
        priceNum: p.price,
        type: p.category === 'pack' ? 'pack' : 'single',
        image: getMainImage(p.images),
        image: getMainImage(p.images),
        isNew: p.isNewArrival, // Use DB flag
        affiliateEnabled: p.isFeatured, // Mapping featured to affiliate/featured toggle
        originalCategory: p.category,
        showOnHome: p.showOnHome,
        isNewArrival: p.isNewArrival, // Pass explicit prop too if needed by form inputs when editing (editing not fully implemented yet but good for state)
        salesCount: 0,
        showSalesCount: false,
        rating: 0
    }))

    return <ProductsClient initialProducts={products} />
}
