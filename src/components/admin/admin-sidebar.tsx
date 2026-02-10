"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Package, ShoppingCart, Settings, LayoutTemplate, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Produits", icon: Package },
    { href: "/admin/collections-home", label: "Layout Manager", icon: LayoutTemplate },
    { href: "/admin/orders", label: "Commandes", icon: ShoppingCart },
    { href: "/admin/settings", label: "Réglages", icon: Settings },
]

export function AdminSidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            {/* Mobile Header with Hamburger */}
            <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white sticky top-0 z-50">
                <h1 className="text-xl font-bold tracking-tight">STYLEPSY ADMIN</h1>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-slate-800">
                    {isOpen ? <X /> : <Menu />}
                </Button>
            </div>

            {/* Sidebar Container */}
            <aside className={`
                fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
            `}>
                <div className="p-6 border-b border-slate-800 hidden md:block">
                    <h1 className="text-xl font-bold tracking-tight">STYLEPSY ADMIN</h1>
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-14 md:mt-0">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`
                                    flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md transition-colors
                                    ${isActive
                                        ? "bg-slate-800 text-white"
                                        : "text-slate-300 hover:bg-slate-800 hover:text-white"}
                                `}
                            >
                                <link.icon className="h-5 w-5" />
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 absolute bottom-0 w-full bg-slate-900">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-white">A</div>
                        <div className="text-sm">
                            <p className="font-medium text-white">Admin</p>
                            <p className="text-xs text-slate-400">admin@stylepsy.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    )
}
