import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const data = await request.json()

        const category = await db.category.update({
            where: { id },
            data: {
                name: data.name,
                slug: data.slug,
                order: data.order
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
            { success: false, error: "Failed to update category" },
            { status: 500 }
        )
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params

        await db.category.delete({
            where: { id }
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error("Categories API Error:", error)
        return NextResponse.json(
            { success: false, error: "Failed to delete category" },
            { status: 500 }
        )
    }
}
