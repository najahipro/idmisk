"use client"

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
export function Footer() {
    return (
        <footer className="bg-[#EBE9E4] text-black pt-16 pb-8 border-t border-black/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 mb-16">

                    {/* Column 1: Aide & Informations */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-xl font-bold tracking-wide text-black">
                            Besoin d'aide ?
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <Link href="/contact" className="hover:text-black transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black transition-colors"></span>
                                    Contactez-nous
                                </Link>
                            </li>
                            <li>
                                <Link href="/livraison" className="hover:text-black transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black transition-colors"></span>
                                    Livraison & Paiement
                                </Link>
                            </li>
                            <li>
                                <Link href="/guide-tailles" className="hover:text-black transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black transition-colors"></span>
                                    Guide des Tailles
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-black transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black transition-colors"></span>
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: IDMISK & Partenariat */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-xl font-bold tracking-wide text-black">
                            L'Univers STYLEPSY
                        </h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>
                                <Link href="/qui-sommes-nous" className="hover:text-black transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black transition-colors"></span>
                                    Qui sommes-nous ?
                                </Link>
                            </li>
                            <li>
                                <Link href="/cgv" className="hover:text-black transition-colors flex items-center gap-2 group">
                                    <span className="w-1.5 h-1.5 rounded-full bg-black/20 group-hover:bg-black transition-colors"></span>
                                    Mentions Légales (CGV)
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Newsletter & Socials */}
                    <div className="space-y-6">
                        <h4 className="font-serif text-xl font-bold tracking-wide text-black">
                            Restez Inspirée
                        </h4>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            Recevez nos offres exclusives et nouveautés directement dans votre boîte mail.
                        </p>

                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder="Votre email"
                                className="bg-black/5 border-black/10 text-black placeholder:text-gray-500 focus-visible:ring-black/20 h-11"
                            />
                            <Button className="bg-black text-white hover:bg-zinc-800 h-11 px-6">
                                S'abonner
                            </Button>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {/* Instagram */}
                            <Link href="https://www.instagram.com/idmisk.ma/" target="_blank" rel="noopener noreferrer" className="bg-black/5 hover:bg-black hover:text-white text-black p-2.5 rounded-full transition-all duration-300">
                                <Instagram className="h-5 w-5" />
                            </Link>

                            {/* TikTok */}
                            <Link href="https://www.tiktok.com/@idmisk7" target="_blank" rel="noopener noreferrer" className="bg-black/5 hover:bg-black hover:text-white text-black p-2.5 rounded-full transition-all duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </Link>

                            {/* Pinterest */}
                            <Link href="https://www.pinterest.com/idmisk/_profile/" target="_blank" rel="noopener noreferrer" className="bg-black/5 hover:bg-black hover:text-white text-black p-2.5 rounded-full transition-all duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <path d="M8 20l4-9"></path>
                                    <path d="M10.7 13c.437 1.263 1.43 2 2.55 2 2.07 0 3.75-1.55 3.75-4a5 5 0 1 0-9.7 1.7"></path>
                                </svg>
                            </Link>

                            {/* Facebook */}
                            <Link href="https://www.facebook.com/profile.php?id=61585381544195" target="_blank" rel="noopener noreferrer" className="bg-black/5 hover:bg-black hover:text-white text-black p-2.5 rounded-full transition-all duration-300">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom: Copyright */}
                <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>
                        © {new Date().getFullYear()} STYLEPSY. Tous droits réservés.
                    </p>
                    <div className="flex gap-6">
                        <Link href="/cgv" className="hover:text-black transition-colors">Mentions Légales</Link>
                        <Link href="/politique-de-confidentialite" className="hover:text-black transition-colors">Politique de Confidentialité</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
