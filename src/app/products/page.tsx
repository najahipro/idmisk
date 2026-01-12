import { Suspense } from "react"
import { db } from "@/lib/db"
import { Product } from "@/types/product"
import { getMainImage } from "@/lib/utils"
import { ProductListClient } from "./product-list-client"

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    const productsData = await db.product.findMany({
        orderBy: { createdAt: 'desc' }
    })

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
        colors: [],

        description: p.description,
        originalCategory: p.category,
        collectionName: p.collectionName,
        customCategorySlug: p.customCategorySlug
    })

    const initialProducts = productsData.map(mapToUiProduct)

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <Suspense fallback={<div className="container mx-auto px-4 py-10 text-center">Chargement des produits...</div>}>
                <ProductListClient initialProducts={initialProducts} />
            </Suspense>
        </main>
    )
}
