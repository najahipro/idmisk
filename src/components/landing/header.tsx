"use client"

import Link from "next/link";

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
                                    <Link href="/" className="font-heading font-light text-2xl tracking-wide text-black uppercase">
                                        STYLEPSY
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
                                        <div className="font-bold text-primary text-sm uppercase tracking-widest mb-4">Collection</div>
                                        <div className="pl-4 flex flex-col gap-4 text-base font-light text-black/80 border-l border-gray-100">
                                            <SheetClose asChild>
                                                <Link href="/products?sort=newest" className="block hover:text-black hover:translate-x-1 transition-transform">Nouveautés</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/products?category=femme" className="block hover:text-black hover:translate-x-1 transition-transform">Femme</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/products?category=homme" className="block hover:text-black hover:translate-x-1 transition-transform">Homme</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/products?category=la-maison" className="block hover:text-black hover:translate-x-1 transition-transform">La Maison</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/products?category=accessoires" className="block hover:text-black hover:translate-x-1 transition-transform">Accessoires</Link>
                                            </SheetClose>
                                            <SheetClose asChild>
                                                <Link href="/products" className="block hover:text-black font-medium mt-2 hover:translate-x-1 transition-transform">Tout voir</Link>
                                            </SheetClose>
                                        </div>
                                    </div>
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
                    <Link href="/" className="font-heading font-light text-3xl tracking-wide text-black uppercase">
                        STYLEPSY
                    </Link>
                </div>

                {/* 2. Center: Navigation (DESKTOP ONLY) */}
                <nav className="hidden md:flex flex-1 justify-center items-center gap-8 lg:gap-12 text-[13px] font-normal uppercase tracking-[0.2em] text-black">
                    <Link href="/products?sort=newest" className="relative group hover:text-black/70 transition-colors">
                        <span>New In</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/products?category=femme" className="relative group hover:text-black/70 transition-colors">
                        <span>Femme</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/products?category=homme" className="relative group hover:text-black/70 transition-colors">
                        <span>Homme</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/products?category=la-maison" className="relative group hover:text-black/70 transition-colors">
                        <span>La Maison</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/products?category=accessoires" className="relative group hover:text-black/70 transition-colors">
                        <span>Accessoires</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
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
