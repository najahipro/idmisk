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
        const imagesRaw = formData.get("images") as string
        const category = formData.get("category") as string
        const collectionName = formData.get("collectionName") as string || null
        const status = formData.get("status") as string || "active"

        let images: string[] = []
        try {
            // Try parsing as JSON first (standard from likely updated ProductForm)
            images = JSON.parse(imagesRaw)
        } catch (e) {
            // Fallback: If comma separated string (legacy)
            images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()) : []
        }

        const isFeatured = formData.get("isFeatured") === "on"
        const showOnHome = formData.get("showOnHome") === "on"
        const isNewArrival = formData.get("isNewArrival") === "on"
        const isFreeShipping = formData.get("isFreeShipping") === "on"

        // Handle Colors Relation
        const colorsRaw = formData.get("colors") as string
        let colorIds: string[] = []
        try {
            colorIds = colorsRaw ? JSON.parse(colorsRaw) : []
        } catch (e) {
            console.error("Failed to parse color IDs", e)
        }

        // Handle Sizes Relation
        const sizesRaw = formData.get("sizes") as string
        let sizeIds: string[] = []
        try {
            sizeIds = sizesRaw ? JSON.parse(sizesRaw) : []
        } catch (e) {
            console.error("Failed to parse size IDs", e)
        }

        const homepageLocationRaw = formData.get("homepageLocation") as string
        const homepageLocation = (homepageLocationRaw && homepageLocationRaw !== "NONE") ? homepageLocationRaw : null

        if (!name || isNaN(price) || images.length === 0 || !category) {
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
                images: images.join(','), // CSV for SQLite/Legacy Util compatibility
                category,
                collectionName,
                isFeatured,
                showOnHome,
                isNewArrival,
                isFreeShipping,
                homepageLocation,
                colors: {
                    connect: colorIds.map(id => ({ id }))
                },
                sizes: {
                    connectOrCreate: sizeIds.map(name => ({
                        where: { name },
                        create: { name }
                    }))
                }
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

export async function getProduct(productId: string) {
    try {
        const product = await db.product.findUnique({
            where: { id: productId },
            include: {
                colors: true, // Fetch connected colors
                sizes: true   // Fetch connected sizes
            }
        })
        return { product }
    } catch (error) {
        return { error: "Produit introuvable" }
    }
}

export async function updateProduct(productId: string, formData: FormData) {
    try {
        const name = formData.get("name") as string
        const priceStr = (formData.get("price") as string).replace(',', '.')
        const price = priceStr ? parseFloat(priceStr) : 0

        const compareAtRaw = (formData.get("compareAtPrice") as string)?.replace(',', '.')
        const compareAtPrice = (compareAtRaw && compareAtRaw !== "0") ? parseFloat(compareAtRaw) : null

        const stockRaw = formData.get("stock") as string
        const stock = stockRaw ? parseInt(stockRaw) : 0

        const description = formData.get("description") as string || ""
        const imagesRaw = formData.get("images") as string
        const category = formData.get("category") as string
        const collectionName = formData.get("collectionName") as string || null
        const status = formData.get("status") as string || "active"

        let images: string[] = []
        try {
            images = JSON.parse(imagesRaw)
        } catch (e) {
            images = imagesRaw ? imagesRaw.split(',').map(s => s.trim()) : []
        }

        const isFeatured = formData.get("isFeatured") === "on"
        const showOnHome = formData.get("showOnHome") === "on"
        const isNewArrival = formData.get("isNewArrival") === "on"
        const isFreeShipping = formData.get("isFreeShipping") === "on"

        // Handle Colors Relation Update
        const colorsRaw = formData.get("colors") as string
        let colorIds: string[] = []
        try {
            colorIds = colorsRaw ? JSON.parse(colorsRaw) : []
        } catch (e) {
            console.error("Failed to parse color IDs", e)
        }

        // Handle Sizes Relation Update
        const sizesRaw = formData.get("sizes") as string
        let sizeIds: string[] = []
        try {
            sizeIds = sizesRaw ? JSON.parse(sizesRaw) : []
        } catch (e) {
            console.error("Failed to parse size IDs", e)
        }

        // First disconnect all existing colors, then connect new ones (simplest approach for M-N)
        // Or actually, `set` might work if replacing all. 
        // For Prisma set: { set: [{id: 1}, {id: 2}] } replaces entire relation list. Perfect.

        // Handle Homepage Location
        const homepageLocationRaw = formData.get("homepageLocation") as string
        const homepageLocation = (homepageLocationRaw && homepageLocationRaw !== "NONE") ? homepageLocationRaw : null

        await db.product.update({
            where: { id: productId },
            data: {
                name,
                price,
                compareAtPrice,
                stock,
                status,
                description,
                images: images.join(','),
                category,
                collectionName,
                isFeatured,
                showOnHome,
                isNewArrival,
                isFreeShipping,
                homepageLocation,
                colors: {
                    set: colorIds.map(id => ({ id }))
                },
                sizes: {
                    // Since 'set' doesn't support 'connectOrCreate', we must disconnect all then connectOrCreate
                    // But Prisma update 'sizes' relation with 'set' expects references.
                    // Actually, for M-N with connectOrCreate, it's better to use 'set' to clear and then 'connectOrCreate'.
                    // However, Prisma doesn't support 'connectOrCreate' inside 'set' directly in one go usually for replacement unless using specific syntax.
                    // Easier strategy: Delete all relations first? No, that's manual.
                    // Correct Strategy for Prisma `update`:
                    // 1. disconnect: { name: {} } ?? No, disconnected everything.
                    // Let's use `set: []` to clear, but we can't do that AND `connectOrCreate` in same level sometimes.
                    // Wait, `connectOrCreate` works in `update`.
                    // To replace the entire list:
                    // we can pass `set: []` to clear, then `connectOrCreate`.
                    // But `set` overrides everything.
                    // Better approach:
                    // sizes: {
                    //   set: [], // Disconnect all current
                    //   connectOrCreate: [...] // Add new ones
                    // }
                    set: [], // Clear existing relations
                    connectOrCreate: sizeIds.map(name => ({
                        where: { name },
                        create: { name }
                    }))
                },
                customCategorySlug: formData.get("customCategorySlug") as string || null,
            },
        })

        revalidatePath("/")
        revalidatePath("/admin/products")
        revalidatePath(`/products/${productId}`)
        return { success: true }
    } catch (error: any) {
        console.error("Error updating product:", error)
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