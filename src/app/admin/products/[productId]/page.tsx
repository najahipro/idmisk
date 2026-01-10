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
        where: { id: productId }
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
        images, // Now passing parsed array
        // Ensure optional fields are handled strings/nulls logic if needed, 
        // but Prisma types should match what we expect mostly.
        // ProductForm expects: initialData: ProductFormValues & { id: string, images: string[] }
        // Prisma Product has: id, name, ..., images: string[], etc.
        // We might need to ensure nulls are handled for optional strings
        colors: product.colors || "",
        status: product.status as "active" | "draft",
    }

    return (
        <div className="max-w-6xl mx-auto pb-10">
            <ProductForm initialData={formattedProduct} />
        </div>
    )
}
