import { Header } from "@/components/landing/header"
import { TopBar } from "@/components/landing/top-bar"
import { Footer } from "@/components/landing/footer"
import { WhatsAppButton } from "@/components/ui/whatsapp-button"
import { CartSheet } from "@/components/cart/cart-sheet"
import { db } from "@/lib/db"
import { getMenuItems } from "@/app/admin/settings/actions"

export default async function ShopLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // Fetch top bar messages from database
    let topBarMessages: string[] = []
    try {
        if (db.siteSettings) {
            const settings = await db.siteSettings.findFirst()
            if (settings) {
                topBarMessages = [
                    settings.topBarMessage1,
                    settings.topBarMessage2,
                    settings.topBarMessage3
                ].filter((msg): msg is string => Boolean(msg && msg.trim()))
            }
        }
    } catch (error) {
        console.error("Failed to fetch site settings:", error)
    }

    // Use default message if no messages in database
    if (topBarMessages.length === 0) {
        topBarMessages = ["Livraison Gratuite partout au Maroc !"]
    }

    // Fetch Menu Items
    let menuItems: any[] = []
    try {
        const menuResult = await getMenuItems()
        if (menuResult.success && menuResult.menuItems) {
            menuItems = menuResult.menuItems
        }
    } catch (error) {
        console.error("Failed to fetch menu items:", error)
    }

    return (
        <div className="flex flex-col min-h-screen">
            <TopBar messages={topBarMessages} />
            <Header menuItems={menuItems} />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            <CartSheet />
            <WhatsAppButton />
        </div>
    )
}
