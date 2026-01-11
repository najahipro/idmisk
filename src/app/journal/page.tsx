import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowRight } from "lucide-react"
import { UniversSection } from "@/components/landing/univers-section"
import { getArticles } from "@/actions/articles"

export const dynamic = "force-dynamic"

export const metadata = {
    title: "Le Journal | IDMISK",
    description: "Inspiration, Conseils et Tendances Modest Fashion.",
}

export default async function JournalPage() {
    const { articles } = await getArticles()

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
                {!articles || articles.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-muted-foreground text-lg mb-4">Aucun article publié pour le moment.</p>
                        <p className="text-sm text-gray-400">Revenez bientôt !</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {articles.map((article: any) => (
                            <article key={article.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                                {/* Image */}
                                <div className="relative h-64 bg-gray-200 overflow-hidden">
                                    <Link href={`/journal/${article.slug}`}>
                                        <div className="relative w-full h-full">
                                            {article.image ? (
                                                <Image
                                                    src={article.image}
                                                    alt={article.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">No Image</div>
                                            )}
                                        </div>
                                    </Link>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(article.date).toLocaleDateString()}</span>
                                        <span className="flex items-center gap-1"><User className="w-3 h-3" /> {article.author}</span>
                                    </div>

                                    <Link href={`/journal/${article.slug}`}>
                                        <h2 className="text-xl font-bold font-serif mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                            {article.title}
                                        </h2>
                                    </Link>

                                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                                        {article.excerpt}
                                    </p>

                                    <div className="mt-auto pt-4">
                                        <Link href={`/journal/${article.slug}`} className="inline-flex items-center text-sm font-bold text-primary hover:underline">
                                            Lire la suite <ArrowRight className="w-4 h-4 ml-1" />
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>

            {/* Univers Section */}
            <div className="bg-gray-50 border-t border-gray-100">
                <UniversSection />
            </div>
        </div>
    )
}
