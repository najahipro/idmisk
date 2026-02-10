import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
    try {
        const data = await request.json()

        // Find existing settings or create new
        const existing = await db.siteSettings.findFirst()

        let result
        if (existing) {
            result = await db.siteSettings.update({
                where: { id: existing.id },
                data: {
                    topBarMessage1: data.topBarMessage1 || null,
                    topBarMessage2: data.topBarMessage2 || null,
                    topBarMessage3: data.topBarMessage3 || null,
                }
            })
        } else {
            result = await db.siteSettings.create({
                data: {
                    topBarMessage1: data.topBarMessage1 || null,
                    topBarMessage2: data.topBarMessage2 || null,
                    topBarMessage3: data.topBarMessage3 || null,
                }
            })
        }

        return NextResponse.json({ success: true, data: result })
    } catch (error: any) {
        console.error("Top Bar Settings API Error:", error)
        return NextResponse.json(
            { success: false, error: error.message || "Failed to update top bar settings" },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const settings = await db.siteSettings.findFirst()
        return NextResponse.json({ success: true, data: settings })
    } catch (error: any) {
        console.error("Failed to fetch settings:", error)
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 }
        )
    }
}
