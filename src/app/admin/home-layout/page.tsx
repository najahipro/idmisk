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
                // Include image fields to ensure they are not wiped out on save
                heroImage: true,
                middleImage: true,
                splitLeftImage: true,
                splitRightImage: true,
            }
        })
    } catch (err) {
        console.error("DB Fetch Error (HomeLayout):", err)
    }

    return <HomeLayoutClient initialData={homeLayout} />
}
