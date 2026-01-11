import Link from "next/link";
import { LayoutDashboard, Package, Image as ImageIcon, ShoppingCart, Settings, LayoutTemplate } from "lucide-react";

const sidebarLinks = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/products", label: "Produits", icon: Package },
    { href: "/admin/univers", label: "Univers (Accueil)", icon: LayoutTemplate },
    { href: "/admin/journal", label: "Journal (Blog)", icon: LayoutDashboard },
    { href: "/admin/collections-home", label: "Collections Home", icon: LayoutTemplate },
    { href: "/admin/orders", label: "Commandes", icon: ShoppingCart },
    // { href: "/admin/settings", label: "Réglages", icon: Settings },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-xl font-bold tracking-tight">IDMISK ADMIN</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {sidebarLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-md hover:bg-slate-800 transition-colors text-slate-300 hover:text-white"
                        >
                            <link.icon className="h-5 w-5" />
                            {link.label}
                        </Link>
                    ))}
                </nav>
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center font-bold text-white">A</div>
                        <div className="text-sm">
                            <p className="font-medium text-white">Admin</p>
                            <p className="text-xs text-slate-400">admin@idmisk.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-slate-50 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
