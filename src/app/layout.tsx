import type { Metadata } from "next";
import { Inter, Playfair_Display, Tajawal } from "next/font/google"; // Import Tajawal
import "./globals.css";
import { CartProvider } from "@/context/cart-context";

import { OrderProvider } from "@/context/order-context";

import { CartSheet } from "@/components/cart/cart-sheet";
import { SessionProvider } from "@/components/auth/session-provider";
import { I18nProvider } from "@/components/i18n-provider";
import { CurrencyProvider } from "@/context/currency-context";
import { Header } from "@/components/landing/header";
import { TopBar } from "@/components/landing/top-bar";
import { Footer } from "@/components/landing/footer";
import { WhatsAppButton } from "@/components/ui/whatsapp-button";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-arabic" });

export const metadata: Metadata = {
    title: "IDMISK - L'élégance Modeste",
    description: "Vente de Hijabs et Accessoires Premium au Maroc",
    icons: {
        icon: '/icon.png',
        apple: '/icon.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={`${inter.variable} ${playfair.variable} ${tajawal.variable} font-sans bg-background text-foreground antialiased`}>
                <I18nProvider>
                    <CurrencyProvider>
                        <SessionProvider>
                            <CartProvider>
                                <OrderProvider>
                                    <div className="flex flex-col min-h-screen">
                                        <TopBar />
                                        <Header />
                                        <main className="flex-1">
                                            {children}
                                        </main>
                                        <Footer />
                                    </div>
                                    <CartSheet />
                                    <WhatsAppButton />
                                </OrderProvider>
                            </CartProvider>
                        </SessionProvider>
                    </CurrencyProvider>
                </I18nProvider>
            </body>
        </html>
    );
}
