"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingBag } from "lucide-react"

export function MainNav() {
    const router = useRouter()

    return (
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <Link href="/" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <span>Accueil</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>

            {/* Mega Menu for Boutique */}
            <div className="group relative flex items-center gap-2 cursor-pointer h-20">
                <Link href="/products" className="hover:text-primary transition-colors flex items-center gap-2">
                    <span>Boutique</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-border shadow-lg rounded-b-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50 flex gap-12 cursor-default">
                    <div className="flex-1">
                        <h4 className="font-serif font-bold text-lg mb-4 text-primary">Par Tissu</h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><Link href="/products?fabric=soie" className="hover:text-primary transition-colors block p-1">Soie de Médine</Link></li>
                            <li><Link href="/products?fabric=jersey" className="hover:text-primary transition-colors block p-1">Jersey</Link></li>
                            <li><Link href="/products?fabric=crepe" className="hover:text-primary transition-colors block p-1">Crêpe</Link></li>
                            <li><Link href="/products?fabric=mousseline" className="hover:text-primary transition-colors block p-1">Mousseline</Link></li>
                        </ul>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-serif font-bold text-lg mb-4 text-primary">Par Style</h4>
                        <ul className="space-y-3 text-muted-foreground">
                            <li><Link href="/products?category=hijab" className="hover:text-primary transition-colors block p-1">Hijabs</Link></li>
                            <li><Link href="/products?category=khimar" className="hover:text-primary transition-colors block p-1">Khimars</Link></li>
                            <li><Link href="/products?category=pack" className="hover:text-primary transition-colors block p-1">Packs Cadeaux</Link></li>
                            <li><Link href="/products?category=accessoire" className="hover:text-primary transition-colors block p-1">Accessoires</Link></li>
                        </ul>
                    </div>
                    <div
                        className="flex-1 bg-muted/30 rounded-lg p-4 flex flex-col items-center justify-center text-center group/featured cursor-pointer hover:bg-muted/50 transition-colors"
                        onClick={() => router.push('/products?sort=newest')}
                    >
                        <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-md">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 group-hover/featured:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center text-primary/20">
                                <ShoppingBag className="w-12 h-12" />
                            </div>
                        </div>
                        <div>
                            <p className="font-serif font-bold text-primary mb-1 group-hover/featured:underline decoration-primary/50 underline-offset-4 transition-all">Nouveautés</p>
                            <span className="text-xs text-muted-foreground">Découvrir la collection</span>
                        </div>
                    </div>
                </div>
            </div>

            <Link href="/journal" className="hover:text-primary transition-colors flex items-center gap-2 group">
                <span>Journal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </Link>
        </nav>
    )
}
