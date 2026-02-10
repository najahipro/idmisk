import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
    try {
        const data = await request.json()

        // Check if a layout already exists
        const existing = await db.homeLayout.findFirst()

        let result
        if (existing) {
            // Update existing
            result = await db.homeLayout.update({
                where: { id: existing.id },
                data: {
                    heroImage: data.heroImage || null,
                    heroTitle: data.heroTitle || null,
                    heroSubtitle: data.heroSubtitle || null,
                    heroButtonText: data.heroButtonText || "Découvrir",
                    middleImage: data.middleImage || null,
                    middleTitle: data.middleTitle || null,
                    middleCategory: data.middleCategory || null,
                    splitLeftImage: data.splitLeftImage || null,
                    splitLeftTitle: data.splitLeftTitle || null,
                    splitLeftCategory: data.splitLeftCategory || null,
                    splitRightImage: data.splitRightImage || null,
                    splitRightTitle: data.splitRightTitle || null,
                    splitRightCategory: data.splitRightCategory || null,
                }
            })
        } else {
            // Create new
            result = await db.homeLayout.create({
                data: {
                    heroImage: data.heroImage || null,
                    heroTitle: data.heroTitle || null,
                    heroSubtitle: data.heroSubtitle || null,
                    heroButtonText: data.heroButtonText || "Découvrir",
                    middleImage: data.middleImage || null,
                    middleTitle: data.middleTitle || null,
                    middleCategory: data.middleCategory || null,
                    splitLeftImage: data.splitLeftImage || null,
                    splitLeftTitle: data.splitLeftTitle || null,
                    splitLeftCategory: data.splitLeftCategory || null,
                    splitRightImage: data.splitRightImage || null,
                    splitRightTitle: data.splitRightTitle || null,
                    splitRightCategory: data.splitRightCategory || null,
                }
            })
        }

        return NextResponse.json({ success: true, data: result })
    } catch (error: any) {
        console.error("Home Layout API Error:", error)
        return NextResponse.json(
            { success: false, error: error.message || "Failed to update layout" },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const layout = await db.homeLayout.findFirst()
        return NextResponse.json({ success: true, data: layout })
    } catch (error: any) {
        console.error("Home Layout API Error:", error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}
