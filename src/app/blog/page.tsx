"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { UniversSection } from "@/components/landing/univers-section"

export default function BlogPage() {
    const articles = [
        {
            id: 1,
            title: "Comment choisir le tissu idéal pour votre Hijab ?",
            excerpt: "Soie de Médine, Jersey, Mousseline... Découvrez quel tissu correspond le mieux à votre style et à la saison.",
            image: "/blog/fabric-guide.jpg", // Placeholder path
            date: "12 Jan 2026",
            author: "Amina K."
        },
        {
            id: 2,
            title: "Les tendances Modest Fashion de 2026",
            excerpt: "Couleurs pastels, coupes oversized et superposition : tout ce qu'il faut savoir pour rester élégante cette année.",
            image: "/blog/trends-2026.jpg", // Placeholder path
            date: "05 Jan 2026",
            author: "Sarah B."
        },
        {
            id: 3,
            title: "Guide d'entretien : Soie de Médine vs Crêpe",
            excerpt: "Prolongez la durée de vie de vos hijabs favoris grâce à nos conseils d'entretien experts.",
            image: "/blog/care-guide.jpg", // Placeholder path
            date: "28 Dec 2025",
            author: "Team IDMISK"
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <div className="bg-[#1A3C40] text-white py-16 md:py-24 text-center px-4">
                <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4">Le Journal IDMISK</h1>
                <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                    Inspiration, Conseils et Tendances Modest Fashion.
                </p>
            </div>

            {/* Articles Grid */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <article key={article.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            {/* Image Placeholder */}
                            <div className="relative h-64 bg-gray-200 overflow-hidden">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100 group-hover:scale-105 transition-transform duration-500">
                                    <span className="font-serif italic">[Image: {article.title}]</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {article.date}</span>
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                                </div>

                                <h2 className="text-xl font-bold font-serif mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {article.title}
                                </h2>

                                <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                <Link href="#" className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                                    Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Univers Section */}
            <div className="bg-gray-50 border-t border-gray-100">
                <UniversSection />
            </div>
        </div>
    )
}
