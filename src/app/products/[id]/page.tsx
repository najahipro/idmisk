import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import ProductDetails from "@/components/products/product-details"

export const dynamic = "force-dynamic";


interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params

    // Fetch main product
    const product = await db.product.findUnique({
        where: { id }
    })

    if (!product) {
        return notFound()
    }

    // Fetch related products (e.g. same category, excluding current)
    const relatedProducts = await db.product.findMany({
        where: {
            category: product.category,
            NOT: { id: product.id }
        },
        take: 4
    })

    return (
        <ProductDetails
            product={product}
            relatedProducts={relatedProducts}
        />
    )
}
