"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function addProduct(formData: FormData) {
    try {
        console.log("Starting addProduct action...")
        const rawUpdates = Object.fromEntries(formData.entries())
        console.log("Raw form data:", rawUpdates)

        const name = formData.get("name") as string
        const priceStr = (formData.get("price") as string).replace(',', '.')
        const price = priceStr ? parseFloat(priceStr) : 0

        const compareAtRaw = (formData.get("compareAtPrice") as string)?.replace(',', '.')
        const compareAtPrice = (compareAtRaw && compareAtRaw !== "0") ? parseFloat(compareAtRaw) : null

        const stockRaw = formData.get("stock") as string
        const stock = stockRaw ? parseInt(stockRaw) : 0

        const description = formData.get("description") as string || ""
        const images = formData.get("images") as string
        const category = formData.get("category") as string
        const status = formData.get("status") as string || "active"

        const isFeatured = formData.get("isFeatured") === "on"
        const showOnHome = formData.get("showOnHome") === "on"
        const isNewArrival = formData.get("isNewArrival") === "on"
        const isFreeShipping = formData.get("isFreeShipping") === "on"
        const colors = formData.get("colors") as string

        if (!name || isNaN(price) || !images || !category) {
            console.log("Validation failed:", { name, price, images, category })
            return { error: "Champs requis manquants: Nom, Prix, Images ou Catégorie." }
        }

        console.log("Creating product in DB...")
        const newProduct = await db.product.create({
            data: {
                name,
                price,
                compareAtPrice,
                stock,
                status,
                description,
                images,
                category,
                isFeatured,
                showOnHome,
                isNewArrival,
                isFreeShipping,
                colors,
            },
        })
        console.log("Product created ID:", newProduct.id)

        revalidatePath("/")
        revalidatePath("/admin/products")
        return { success: true }

    } catch (error: any) {
        console.error("Error creating product:", error)
        return { error: `Erreur serveur: ${error.message}` }
    }
}

export async function deleteProduct(productId: string) {
    if (!productId) return { error: "ID invalide" }

    try {
        await db.product.delete({
            where: { id: productId }
        })

        revalidatePath("/")
        revalidatePath("/admin/products")
        return { success: true }
    } catch (error) {
        console.error("Error deleting product:", error)
        return { error: "Erreur lors de la suppression." }
    }
}