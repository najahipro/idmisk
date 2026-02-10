import { db } from "@/lib/db"
import HomeLayoutClient from "@/app/admin/home-layout/home-layout-client"

export const dynamic = "force-dynamic"

export default async function CollectionsHomePage() {
    let homeLayout = null

    try {
        // OPTIMIZED: Select only non-image fields for initial load
        homeLayout = await db.homeLayout.findFirst({
            select: {
                id: true,
                heroTitle: true,
                heroSubtitle: true,
                heroButtonText: true,
                middleTitle: true,
                middleCategory: true,
                splitLeftTitle: true,
                splitLeftCategory: true,
                splitRightTitle: true,
                splitRightCategory: true,
                createdAt: true,
                updatedAt: true,
                // ❌ Exclude Base64 image fields
            }
        })
    } catch (err) {
        console.error("DB Fetch Error (HomeLayout):", err)
    }

    return <HomeLayoutClient initialData={homeLayout} />
}
