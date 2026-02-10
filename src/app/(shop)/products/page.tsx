import { Suspense } from "react"
import { db } from "@/lib/db"
import { Product } from "@/types/product"
import { getMainImage } from "@/lib/utils"
import { ProductListClient } from "./product-list-client"

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
    const [productsData, categoriesData, sizesData, colorsData] = await Promise.all([
        db.product.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                colors: true,
                sizes: true
            }
        }),
        db.category.findMany({ orderBy: { order: 'asc' } }),
        db.size.findMany({ orderBy: { order: 'asc' } }),
        db.color.findMany({ orderBy: { name: 'asc' } })
    ])

    const mapToUiProduct = (p: any): Product => {
        // Parse images array from JSON string or comma-separated string
        let imagesArray: string[] = []
        if (p.images) {
            try {
                imagesArray = typeof p.images === 'string' ? JSON.parse(p.images) : p.images
            } catch {
                // Fallback for comma-separated string
                imagesArray = p.images.split(',').map((img: string) => img.trim())
            }
        }

        return {
            id: p.id,
            title: p.name,
            price: `${p.price} DH`,
            priceNum: p.price,
            type: p.category === 'pack' ? 'pack' : 'single',
            image: getMainImage(p.images),
            images: imagesArray, // Full array for hover swap
            isNew: p.isNewArrival,
            affiliateEnabled: false,
            salesCount: 0,
            showSalesCount: false,
            rating: 0,
            colors: [],

            description: p.description,
            originalCategory: p.category,
            collectionName: p.collectionName,
            customCategorySlug: p.customCategorySlug,
            sizes: p.sizes ? p.sizes.map((s: any) => s.name) : []
        }
    }

    const initialProducts = productsData.map(mapToUiProduct)

    return (
        <main className="min-h-screen bg-background pt-24 pb-20">
            <Suspense fallback={<div className="container mx-auto px-4 py-10 text-center">Chargement des produits...</div>}>
                <Suspense fallback={<div className="container mx-auto px-4 py-10 text-center">Chargement des produits...</div>}>
                    <ProductListClient
                        initialProducts={initialProducts}
                        categories={categoriesData}
                        sizes={sizesData}
                        colors={colorsData}
                    />
                </Suspense>
            </Suspense>
        </main>
    )
}
