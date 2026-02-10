
import { PrismaClient } from "@prisma/client"
import fs from "fs"
import path from "path"

const db = new PrismaClient()

async function main() {
    console.log("Dumping data from database...")

    // 1. Fetch independent data
    const colors = await db.color.findMany()
    const sizes = await db.size.findMany()
    const categories = await db.category.findMany()

    // 2. Fetch data with relations
    // Products with their Many-to-Many relations
    const products = await db.product.findMany({
        include: {
            colors: true,
            sizes: true
        }
    })

    // 3. Fetch other settings/layouts
    const homeLayouts = await db.homeLayout.findMany()
    const siteSettings = await db.siteSettings.findMany()
    const homeCollections = await db.homeCollection.findMany()
    const homeUnivers = await db.homeUnivers.findMany()
    const menuItems = await db.menuItem.findMany({
        include: { children: true }
    })

    // 4. Construct Data Object
    const data = {
        colors,
        sizes,
        categories,
        products,
        homeLayouts,
        siteSettings,
        homeCollections,
        homeUnivers,
        menuItems
    }

    // 5. Write to file
    const seedDir = path.join(process.cwd(), "prisma", "seeds")
    if (!fs.existsSync(seedDir)) {
        fs.mkdirSync(seedDir, { recursive: true })
    }

    const filePath = path.join(seedDir, "data.json")
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2))

    console.log(`✅ Data dumped to ${filePath}`)
    console.log(`Summary:`)
    console.log(`- Products: ${products.length}`)
    console.log(`- Categories: ${categories.length}`)
    console.log(`- Colors: ${colors.length}`)
    console.log(`- Sizes: ${sizes.length}`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await db.$disconnect()
    })
