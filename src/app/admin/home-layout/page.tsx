import { db } from "@/lib/db"
import HomeLayoutClient from "./home-layout-client"

export const dynamic = "force-dynamic"

export default async function HomeLayoutPage() {
    let homeLayout = null

    try {
        // OPTIMIZED: Select only non-image fields for initial load
        // Images will be loaded on-demand in the client component
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
                // ❌ Exclude Base64 image fields to reduce payload:
                // heroImage, middleImage, splitLeftImage, splitRightImage
            }
        })
    } catch (err) {
        console.error("DB Fetch Error (HomeLayout):", err)
    }

    return <HomeLayoutClient initialData={homeLayout} />
}
