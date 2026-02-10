import { db } from "@/lib/db"
import CategoriesClient from "./categories-client"

export const dynamic = "force-dynamic"

export default async function CategoriesPage() {
    let categories: any[] = []

    try {
        categories = await db.category.findMany({
            orderBy: { order: 'asc' }
        })
    } catch (err) {
        console.error("DB Fetch Error (Categories):", err)
    }

    return <CategoriesClient initialCategories={categories} />
}
