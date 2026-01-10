"use client"

import Link from "next/link";
import { MainNav } from "@/components/layout/main-nav";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Search, ShoppingBag, User, Truck, LogOut, Package, X, Menu, Phone, Instagram, Facebook } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useSession, signOut } from "next-auth/react";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { useTranslation } from "react-i18next";

export function Header() {
    const { itemCount, setIsOpen } = useCart();
    const { data: session } = useSession();
    const { t } = useTranslation();
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-6">

                {/* === MOBILE MENU TOGGLE (Left) === */}
                <div className="md:hidden mr-4">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="-ml-2">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0">
                            <div className="flex flex-col h-full">
                                {/* Sheet Header */}
                                <div className="p-6 border-b">
                                    <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
                                    <Link href="/" className="font-serif font-bold text-2xl tracking-tighter text-primary">
                                        IDMISK
                                    </Link>
                                </div>

                                {/* Links List */}
                                <nav className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 font-medium text-lg">
                                    <SheetClose asChild>
                                        <Link href="/" className="hover:text-primary transition-colors">
                                            Accueil
                                        </Link>
                                    </SheetClose>

                                    <div className="space-y-4">
                                        <div className="font-bold text-primary">Boutique</div>
                                        <div className="pl-4 flex flex-col gap-3 text-base text-muted-foreground border-l-2 border-gray-100">
                                            <SheetClose asChild>
                                                <Link href="/products" className="block hover:text-black">Tout les produits</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/products?category=soie-de-medine" className="block hover:text-black">Soie de Médine</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/products?category=jersey-luxe" className="block hover:text-black">Jersey Luxe</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/products?category=packs" className="block hover:text-black">Coffrets Cadeaux</Link>
                                            </SheetClose>
                                        </div>
                                    </div>

                                    <SheetClose asChild>
                                        <Link href="/journal" className="hover:text-primary transition-colors">
                                            Journal
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link href="/suivi" className="hover:text-primary transition-colors flex items-center gap-2">
                                            <Truck className="w-5 h-5" /> Suivi de commande
                                        </Link>
                                    </SheetClose>
                                </nav>

                                {/* Bottom Actions */}
                                <div className="p-6 border-t bg-gray-50/50">
                                    {!session?.user ? (
                                        <Button asChild className="w-full mb-4" size="lg">
                                            <Link href="/login">Se connecter</Link>
                                        </Button>
                                    ) : (
                                        <div className="flex items-center gap-3 mb-4 p-3 bg-white rounded-lg border">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={session.user.image || ""} />
                                                <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{session.user.name}</p>
                                                <Link href="/my-orders" className="text-xs text-primary hover:underline">Mes commandes</Link>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex justify-center gap-6 text-muted-foreground">
                                        <Instagram className="w-6 h-6 hover:text-black cursor-pointer" />
                                        <Facebook className="w-6 h-6 hover:text-black cursor-pointer" />
                                        <Phone className="w-6 h-6 hover:text-black cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                {/* 1. Logo (Flex-1 to push center, but on mobile maybe centered?) */}
                <div className="flex-1 md:flex-none">
                    <Link href="/" className="font-serif font-bold text-2xl tracking-tighter text-primary">
                        IDMISK
                    </Link>
                </div>

                {/* 2. Center: Navigation (DESKTOP ONLY) */}
                <nav className="hidden md:flex flex-1 justify-center items-center gap-8 text-sm font-medium tracking-wide">
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
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-border shadow-lg rounded-b-lg p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0 z-50 flex gap-12">
                            <div className="flex-1">
                                <h4 className="font-serif font-bold text-lg mb-4 text-primary">Par Tissu</h4>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li><Link href="/products?category=soie-de-medine" className="hover:text-primary transition-colors block p-1">Soie de Médine</Link></li>
                                    <li><Link href="/products?category=jersey-luxe" className="hover:text-primary transition-colors block p-1">Jersey</Link></li>
                                    <li><Link href="/products?category=crepe-premium" className="hover:text-primary transition-colors block p-1">Crêpe</Link></li>
                                    <li><Link href="/products?category=mousseline" className="hover:text-primary transition-colors block p-1">Mousseline</Link></li>
                                </ul>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-serif font-bold text-lg mb-4 text-primary">Par Style</h4>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li><Link href="/products" className="font-bold hover:text-primary transition-colors block p-1">Tout les produits</Link></li>
                                    <li><Link href="/products?category=hijab" className="hover:text-primary transition-colors block p-1">Hijabs</Link></li>
                                    <li><Link href="/products?category=khimar" className="hover:text-primary transition-colors block p-1">Khimars</Link></li>
                                    <li><Link href="/products?category=packs" className="hover:text-primary transition-colors block p-1">Packs Cadeaux</Link></li>
                                    <li><Link href="/products?category=accessoires" className="hover:text-primary transition-colors block p-1">Accessoires</Link></li>
                                </ul>
                            </div>
                            <div className="flex-1 bg-muted/30 rounded-lg p-4 flex flex-col items-center justify-center text-center group/featured cursor-pointer" onClick={() => router.push('/products?sort=newest')}>
                                <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-md">
                                    {/* Simple decorative placeholder if no specific image is available */}
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

                {/* 3. Right: Icons */}
                <div className="flex-none flex justify-end items-center gap-2 md:gap-4">
                    {/* Expandable Search Bar */}
                    <div className="flex items-center relative">
                        <div
                            className={`
                                overflow-hidden transition-all duration-300 ease-in-out absolute right-0 top-1/2 -translate-y-1/2 bg-background z-20
                                ${isSearchOpen ? "w-[calc(100vw-80px)] md:w-64 opacity-100 pr-2" : "w-0 opacity-0 pointer-events-none"}
                            `}
                        >
                            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                                <Input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Rechercher..."
                                    className="h-9 w-full pr-8 bg-muted/30 border-transparent focus:bg-white focus:border-input rounded-full transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSearchOpen(false);
                                        setSearchQuery("");
                                    }}
                                    className="absolute right-2 text-muted-foreground hover:text-foreground p-1"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </form>
                        </div>

                        <button
                            onClick={() => {
                                if (isSearchOpen && searchQuery.trim()) {
                                    router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
                                    setIsSearchOpen(false);
                                } else {
                                    setIsSearchOpen(!isSearchOpen);
                                }
                            }}
                            className={`relative text-foreground/70 hover:text-primary transition-colors p-2 ${isSearchOpen ? 'text-primary' : ''}`}
                            aria-label="Rechercher"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                    </div>

                    {session?.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="relative h-8 w-8 rounded-full hidden md:flex">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                                        <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-64 p-4 flex flex-col gap-2" align="end" forceMount>
                                <DropdownMenuLabel className="font-normal mb-2">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-base font-bold leading-none">{session.user.name}</p>
                                        <p className="text-xs leading-none text-muted-foreground">
                                            {session.user.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild className="cursor-pointer py-2">
                                    <Link href="/my-orders" className="flex items-center w-full">
                                        <Package className="mr-3 h-4 w-4" />
                                        <span className="font-medium">Mes Commandes</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()} className="text-red-600 focus:text-red-600 cursor-pointer py-2 flex items-center">
                                    <LogOut className="mr-3 h-4 w-4" />
                                    <span className="font-medium">Se déconnecter</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild variant="ghost" size="sm" className="hidden md:flex gap-2">
                            <Link href="/login">
                                <User className="h-5 w-5" />
                                <span>Se connecter</span>
                            </Link>
                        </Button>
                    )}
                    <Link href="/suivi" className="hidden md:flex text-foreground/70 hover:text-primary transition-colors">
                        <Truck className="h-5 w-5" />
                        <span className="sr-only">Suivi de commande</span>
                    </Link>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="relative text-foreground/70 hover:text-primary transition-colors p-2"
                    >
                        <ShoppingBag className="h-5 w-5" />
                        {itemCount > 0 && (
                            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white shadow-sm ring-1 ring-white">
                                {itemCount}
                            </span>
                        )}
                        <span className="sr-only">Panier</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
