import { auth } from "@/auth"
import { db } from "@/lib/db"
import { redirect, notFound } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"

export const dynamic = "force-dynamic"

interface ProductEditPageProps {
    params: Promise<{
        productId: string
    }>
}

export default async function ProductEditPage({ params }: ProductEditPageProps) {
    const { productId } = await params

    const product = await db.product.findUnique({
        where: { id: productId },
        include: { colors: true }
    })

    if (!product) {
        return notFound()
    }

    // Format for form
    let images: string[] = []
    try {
        images = JSON.parse(product.images)
    } catch (e) {
        images = product.images ? product.images.split(',') : []
    }

    const formattedProduct = {
        ...product,
        images,
        colors: product.colors ? product.colors.map((c: any) => c.id) : [],
        status: ((product.status === "active" || product.status === "draft") ? product.status : "active") as "active" | "draft",
        compareAtPrice: product.compareAtPrice ?? undefined,
        homepageLocation: ((product.homepageLocation === "NONE" || product.homepageLocation === "ESSENTIALS" || product.homepageLocation === "EDITORIAL" || product.homepageLocation === "NEW_IN") ? product.homepageLocation : "NONE") as "NONE" | "ESSENTIALS" | "EDITORIAL" | "NEW_IN",
        customCategorySlug: product.customCategorySlug ?? undefined,
    }

    return (
        <div className="max-w-6xl mx-auto pb-10" >
            <ProductForm initialData={formattedProduct} />
        </div >
    )
}
