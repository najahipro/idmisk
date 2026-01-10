"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getHomeCollections() {
    try {
        const collections = await db.homeCollection.findMany({
            orderBy: { order: "asc" },
        })
        return collections
    } catch (error) {
        console.error("Error fetching home collections:", error)
        return []
    }
}

export async function upsertHomeCollection(formData: FormData) {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const imageUrl = formData.get("imageUrl") as string
    const categoryKey = formData.get("categoryKey") as string
    const customUrl = formData.get("customUrl") as string
    const order = parseInt(formData.get("order") as string)

    console.log("Upserting Collection:", {
        id, title, imageUrl, categoryKey, order
    })

    try {
        if (id) {
            await db.homeCollection.update({
                where: { id },
                data: {
                    title,
                    imageUrl,
                    categoryKey,
                    order,
                },
            })
        } else {
            await db.homeCollection.create({
                data: {
                    title,
                    imageUrl,
                    categoryKey,
                    order,
                },
            })
        }

        revalidatePath("/")
        revalidatePath("/admin/collections-home")
        return { success: true }
    } catch (error) {
        console.error("Error updating home collection:", error)
        return { error: "Erreur lors de la mise à jour." }
    }
}
