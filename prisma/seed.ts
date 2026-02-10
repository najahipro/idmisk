
import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const db = new PrismaClient()

async function main() {
    console.log("🌱 Starting Seeding...")

    const filePath = path.join(process.cwd(), "prisma", "seeds", "data.json")

    if (!fs.existsSync(filePath)) {
        console.error("❌ No data file found at prisma/seeds/data.json. Run 'npm run db:dump' first!")
        process.exit(1)
    }

    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"))

    // 1. Seed Independent Tables (Colors, Sizes, Categories)
    console.log("Seeding Colors...")
    for (const color of data.colors) {
        await db.color.upsert({
            where: { id: color.id },
            update: { ...color, products: undefined }, // Exclude relations in direct update
            create: { ...color, products: undefined }
        })
    }

    console.log("Seeding Sizes...")
    for (const size of data.sizes) {
        await db.size.upsert({
            where: { id: size.id },
            update: { ...size, products: undefined },
            create: { ...size, products: undefined }
        })
    }

    console.log("Seeding Categories...")
    for (const cat of data.categories) {
        await db.category.upsert({
            where: { id: cat.id },
            update: cat,
            create: cat
        })
    }

    // 2. Seed Products (and connect relations)
    console.log("Seeding Products...")
    for (const product of data.products) {
        const { colors, sizes, ...productData } = product

        // Prepare connections
        const colorIds = colors?.map((c: any) => ({ id: c.id })) || []
        const sizeIds = sizes?.map((s: any) => ({ id: s.id })) || []

        await db.product.upsert({
            where: { id: product.id },
            update: {
                ...productData,
                colors: { set: colorIds },
                sizes: { set: sizeIds }
            },
            create: {
                ...productData,
                colors: { connect: colorIds },
                sizes: { connect: sizeIds }
            }
        })
    }

    // 3. Seed Others
    console.log("Seeding Site Settings...")
    for (const setting of data.siteSettings) {
        await db.siteSettings.upsert({
            where: { id: setting.id },
            update: setting,
            create: setting
        })
    }

    console.log("Seeding Home Layouts...")
    for (const layout of data.homeLayouts) {
        await db.homeLayout.upsert({
            where: { id: layout.id },
            update: layout,
            create: layout
        })
    }

    console.log("Seeding Home Collections...")
    for (const col of data.homeCollections) {
        await db.homeCollection.upsert({
            where: { id: col.id },
            update: col,
            create: col
        })
    }

    console.log("Seeding Home Univers...")
    for (const uni of data.homeUnivers) {
        await db.homeUnivers.upsert({
            where: { id: uni.id },
            update: uni,
            create: uni
        })
    }

    console.log("Seeding Menu Items...")
    for (const item of data.menuItems) {
        const { children, ...itemData } = item

        // Upsert Parent
        await db.menuItem.upsert({
            where: { id: item.id },
            update: itemData,
            create: itemData
        })

        // Upsert Children
        if (children && children.length > 0) {
            for (const child of children) {
                await db.subMenuItem.upsert({
                    where: { id: child.id },
                    update: child,
                    create: child
                })
            }
        }
    }

    console.log("✅ Seeding completed!")
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await db.$disconnect()
    })
