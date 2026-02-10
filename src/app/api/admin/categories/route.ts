import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
    try {
        const categories = await db.category.findMany({
            orderBy: { order: 'asc' }
        })
        return NextResponse.json({ success: true, data: categories })
    } catch (error: any) {
        console.error("Categories API Error:", error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json()

        const category = await db.category.create({
            data: {
                name: data.name,
                slug: data.slug,
                order: data.order || 0
            }
        })

        return NextResponse.json({ success: true, data: category })
    } catch (error: any) {
        console.error("Categories API Error:", error)

        if (error.code === 'P2002') {
            return NextResponse.json(
                { success: false, error: "Une catégorie avec ce nom ou slug existe déjà" },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: false, error: error.message || "Failed to create category" },
            { status: 500 }
        )
    }
}
