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

// ============================================
// SIZE MANAGEMENT
// ============================================

export async function getSizes() {
    try {
        const sizes = await db.size.findMany({
            orderBy: [
                { order: 'asc' },
                { name: 'asc' }
            ]
        })
        return { success: true, sizes }
    } catch (error) {
        console.error("Error fetching sizes:", error)
        return { success: false, error: "Failed to fetch sizes" }
    }
}

export async function createSize(name: string, order?: number) {
    try {
        if (!name) {
            return { success: false, error: "Name is required" }
        }

        const size = await db.size.create({
            data: {
                name,
                order: order ?? null
            }
        })

        revalidatePath("/admin/settings")
        revalidatePath("/admin/products/new")
        revalidatePath("/admin/products/[id]", "page")

        return { success: true, size }
    } catch (error) {
        console.error("Error creating size:", error)
        return { success: false, error: "Failed to create size" }
    }
}

export async function deleteSize(id: string) {
    try {
        await db.size.delete({
            where: { id }
        })

        revalidatePath("/admin/settings")
        return { success: true }
    } catch (error) {
        console.error("Error deleting size:", error)
        return { success: false, error: "Failed to delete size" }
    }
}

// ============================================
// MENU MANAGEMENT
// ============================================

export async function getMenuItems() {
    try {
        const menuItems = await db.menuItem.findMany({
            orderBy: { order: 'asc' },
            include: {
                children: {
                    orderBy: { order: 'asc' }
                }
            }
        })
        return { success: true, menuItems }
    } catch (error) {
        console.error("Error fetching menu items:", error)
        return { success: false, error: "Failed to fetch menu items" }
    }
}

export async function createMenuItem(label: string, link: string) {
    try {
        if (!label) return { success: false, error: "Label is required" }

        // Get max order to append
        const maxOrder = await db.menuItem.findFirst({
            orderBy: { order: 'desc' },
            select: { order: true }
        })
        const newOrder = (maxOrder?.order ?? -1) + 1

        const menuItem = await db.menuItem.create({
            data: {
                label,
                link: link || "#",
                order: newOrder
            }
        })

        revalidatePath("/admin/settings")
        revalidatePath("/") // Update navbar on home
        return { success: true, menuItem }
    } catch (error) {
        console.error("Error creating menu item:", error)
        return { success: false, error: "Failed to create menu item" }
    }
}

export async function deleteMenuItem(id: string) {
    try {
        await db.menuItem.delete({
            where: { id }
        })
        revalidatePath("/admin/settings")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error deleting menu item:", error)
        return { success: false, error: "Failed to delete menu item" }
    }
}

export async function createSubMenuItem(menuItemId: string, label: string, link: string) {
    try {
        if (!label || !menuItemId) return { success: false, error: "Label and Parent Menu are required" }

        const maxOrder = await db.subMenuItem.findFirst({
            where: { menuItemId },
            orderBy: { order: 'desc' },
            select: { order: true }
        })
        const newOrder = (maxOrder?.order ?? -1) + 1

        const subMenuItem = await db.subMenuItem.create({
            data: {
                label,
                link: link || "#",
                menuItemId,
                order: newOrder
            }
        })

        revalidatePath("/admin/settings")
        revalidatePath("/")
        return { success: true, subMenuItem }
    } catch (error) {
        console.error("Error creating sub-menu item:", error)
        return { success: false, error: "Failed to create sub-menu item" }
    }
}

export async function deleteSubMenuItem(id: string) {
    try {
        await db.subMenuItem.delete({
            where: { id }
        })
        revalidatePath("/admin/settings")
        revalidatePath("/")
        return { success: true }
    } catch (error) {
        console.error("Error deleting sub-menu item:", error)
        return { success: false, error: "Failed to delete sub-menu item" }
    }
}
