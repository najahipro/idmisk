import type { Metadata } from "next";
import { Inter, Tajawal, Oswald } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/cart-context";
import { OrderProvider } from "@/context/order-context";
import { CartSheet } from "@/components/cart/cart-sheet";
import { SessionProvider } from "@/components/auth/session-provider";
import { I18nProvider } from "@/components/i18n-provider";
import { CurrencyProvider } from "@/context/currency-context";
import { StoreLayout } from "@/components/layout/store-layout";
import { Toaster } from "@/components/ui/toaster";
import { db } from "@/lib/db";

// 1. هنا زدنا المكتبة ديال جوجل أناليتكس
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const tajawal = Tajawal({ subsets: ["arabic"], weight: ["400", "500", "700"], variable: "--font-arabic" });

export const metadata: Metadata = {
    title: "STYLEPSY - L'élégance Modeste",
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
            <body className={`${inter.variable} ${oswald.variable} ${tajawal.variable} font-sans bg-background text-foreground antialiased`}>
                <I18nProvider>
                    <CurrencyProvider>
                        <SessionProvider>
                            <CartProvider>
                                <OrderProvider>
                                    {children}
                                    <Toaster />
                                </OrderProvider>
                            </CartProvider>
                        </SessionProvider>
                    </CurrencyProvider>
                </I18nProvider>
                <GoogleAnalytics gaId="G-XXXXXXXXXX" />
            </body>
        </html>
    );
}