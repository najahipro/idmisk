import { db } from "@/lib/db"
import HomeLayoutClient from "./home-layout-client"

export const dynamic = "force-dynamic"

export default async function HomeLayoutPage() {
    let homeLayout = null

    try {
        // Try to fetch existing layout
        homeLayout = await db.homeLayout.findFirst()

        // If no layout exists, we'll create a default one in the client
    } catch (err) {
        console.error("DB Fetch Error (HomeLayout):", err)
    }

    return <HomeLayoutClient initialData={homeLayout} />
}
