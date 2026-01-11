"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const UniversSchema = z.object({
    title: z.string().min(1),
    image: z.string().optional(),
    link: z.string().optional(),
    isLocked: z.coerce.boolean(),
})

export async function getUniversList() {
    try {
        // Find existing or seed if empty
        let list = await db.homeUnivers.findMany({
            orderBy: { order: 'asc' }
        })

        if (list.length === 0) {
            // Seed initial data matching hardcoded
            const seedData = [
                { title: "Hijabs Premium", image: "/idmisk.jpg", link: "/products", isLocked: false, order: 1 },
                { title: "Abayas & Kimonos", image: "", link: "#", isLocked: true, order: 2 },
                { title: "Maman & Bébé", image: "", link: "#", isLocked: true, order: 3 },
                { title: "Tenues de Nuit", image: "", link: "#", isLocked: true, order: 4 },
            ]

            for (const item of seedData) {
                await db.homeUnivers.create({ data: item })
            }

            list = await db.homeUnivers.findMany({ orderBy: { order: 'asc' } })
        }

        return { list }
    } catch (error) {
        console.error("Error fetching univers:", error)
        return { error: "Erreur chargement univers." }
    }
}

export async function updateUnivers(id: string, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            // Use existing image if not provided in form (logic usually in component, but safety check here)
            // Actually frontend sends current image if no new file, but here we expect string url
            image: formData.get("image"),
            link: formData.get("link"),
            isLocked: formData.get("isLocked") === "on" || formData.get("isLocked") === "true",
        }

        await db.homeUnivers.update({
            where: { id },
            data: {
                title: rawData.title as string,
                image: rawData.image as string, // Should be URL string
                link: rawData.link as string,
                isLocked: rawData.isLocked
            }
        })

        revalidatePath("/")
        revalidatePath("/admin/univers")
        return { success: true }
    } catch (error: any) {
        return { error: `Erreur update: ${error.message}` }
    }
}
