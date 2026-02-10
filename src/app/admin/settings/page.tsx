import { db } from "@/lib/db"
import SettingsClient from "./settings-client"
import { getColors } from "./actions"

export const dynamic = "force-dynamic"

export default async function SettingsPage() {
    let categories: any[] = []
    let siteSettings = null
    let colors: any[] = []

    try {
        // Check if category model exists (may not be available until migration runs)
        if (db.category) {
            categories = await db.category.findMany({
                orderBy: { order: 'asc' }
            })
        }

        // Fetch Colors
        const colorsResult = await getColors()
        if (colorsResult.success && colorsResult.colors) {
            colors = colorsResult.colors
        }

        // Fetch site settings (for top bar messages)
        if (db.siteSettings) {
            siteSettings = await db.siteSettings.findFirst()
        }
    } catch (err) {
        console.error("DB Fetch Error (Settings):", err)
    }

    return <SettingsClient initialCategories={categories} initialSettings={siteSettings} initialColors={colors} />
}
