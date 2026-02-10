"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export async function getColors() {
    try {
        const colors = await db.color.findMany({
            orderBy: { name: 'asc' }
        })
        return { success: true, colors }
    } catch (error) {
        console.error("Error fetching colors:", error)
        return { success: false, error: "Failed to fetch colors" }
    }
}

export async function createColor(name: string, hexCode: string) {
    try {
        if (!name || !hexCode) {
            return { success: false, error: "Name and Hex Code are required" }
        }

        const color = await db.color.create({
            data: {
                name,
                hexCode
            }
        })

        revalidatePath("/admin/settings")
        revalidatePath("/admin/products/new")
        revalidatePath("/admin/products/[id]", "page") // Generic revalidate attempt

        return { success: true, color }
    } catch (error) {
        console.error("Error creating color:", error)
        return { success: false, error: "Failed to create color" }
    }
}

export async function deleteColor(id: string) {
    try {
        await db.color.delete({
            where: { id }
        })

        revalidatePath("/admin/settings")
        return { success: true }
    } catch (error) {
        console.error("Error deleting color:", error)
        return { success: false, error: "Failed to delete color" }
    }
}
