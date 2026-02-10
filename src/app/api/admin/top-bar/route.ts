import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(request: Request) {
    try {
        const body = await request.text()
        const data = body ? JSON.parse(body) : {}

        console.log("TopBar Update Payload:", data)

        // Ensure db is defined
        if (!db || !db.siteSettings) {
            console.error("Database client or SiteSettings model undefined")
            return NextResponse.json({ success: false, error: "Database configuration error" }, { status: 500 })
        }

        // Find existing settings or create new
        const existing = await db.siteSettings.findFirst()

        let result
        if (existing) {
            console.log("Updating existing settings:", existing.id)
            result = await db.siteSettings.update({
                where: { id: existing.id },
                data: {
                    topBarMessage1: data.topBarMessage1 ?? null,
                    topBarMessage2: data.topBarMessage2 ?? null,
                    topBarMessage3: data.topBarMessage3 ?? null,
                }
            })
        } else {
            console.log("Creating new settings")
            result = await db.siteSettings.create({
                data: {
                    topBarMessage1: data.topBarMessage1 ?? null,
                    topBarMessage2: data.topBarMessage2 ?? null,
                    topBarMessage3: data.topBarMessage3 ?? null,
                }
            })
        }

        console.log("TopBar Update Result:", result)
        return NextResponse.json({ success: true, data: result })
    } catch (error: any) {
        console.error("Top Bar Settings API Error Details:", error)
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
