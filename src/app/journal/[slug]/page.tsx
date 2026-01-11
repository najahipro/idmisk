import { getArticle, getArticles } from "@/actions/articles"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from "lucide-react"
import { UniversSection } from "@/components/landing/univers-section"

export const dynamic = "force-dynamic"

interface ArticlePageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: ArticlePageProps) {
    const { slug } = await params
    const { article } = await getArticle(slug)
    if (!article) return { title: "Article introuvable" }

    return {
        title: `${article.title} | IDMISK Journal`,
        description: article.excerpt,
    }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
    const { slug } = await params
    const { article } = await getArticle(slug)

    if (!article) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
                {/* Back Link */}
                <Link href="/journal" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Retour au Journal
                </Link>

                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                            {article.category || "Conseils"}
                        </span>
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(article.date).toLocaleDateString()}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
                        {article.title}
                    </h1>

                    <div className="flex items-center justify-center gap-2">
                        <span className="flex items-center gap-2 font-medium">
                            <User className="w-4 h-4 text-muted-foreground" />
                            {article.author}
                        </span>
                    </div>
                </div>

                {/* Featured Image */}
                <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg mb-12">
                    {article.image && (
                        <Image
                            src={article.image}
                            alt={article.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    )}
                </div>

                {/* Content */}
                <div className="prose prose-lg prose-slate mx-auto max-w-none">
                    {/* Render plain text or simple markdown. 
                        Ideally we'd use a markdown renderer if content is complex. 
                        For now assuming paragraph breaks logic or raw text.
                    */}
                    <div className="whitespace-pre-wrap font-serif text-gray-700 leading-relaxed">
                        {article.content}
                    </div>
                </div>
            </div>

            {/* Footer / Related */}
            <div className="bg-gray-50 border-t border-gray-100 mt-20">
                <UniversSection />
            </div>
        </div>
    )
}
