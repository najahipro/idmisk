import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BLOG_POSTS } from "@/lib/blog-data"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const post = BLOG_POSTS.find((p) => p.slug === slug)
    if (!post) return { title: "Article introuvable" }

    return {
        title: `${post.title} | IDMISK Journal`,
        description: post.excerpt,
    }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const post = BLOG_POSTS.find((p) => p.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Hero Image */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                    <div className="max-w-3xl space-y-4">
                        <div className="flex items-center justify-center gap-4 text-sm text-white/90 font-medium">
                            <span className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                                <Calendar className="w-4 h-4" /> {post.date}
                            </span>
                            <span className="flex items-center gap-1 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                                <User className="w-4 h-4" /> {post.author}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight drop-shadow-lg">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-4xl -mt-10 relative z-10">
                <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 border border-gray-100">

                    {/* Content using dangerouslySetInnerHTML because our data is HTML string */}
                    <div
                        className="prose prose-lg prose-headings:font-serif prose-headings:text-primary prose-a:text-primary prose-a:font-semibold hover:prose-a:underline prose-img:rounded-xl text-gray-600 leading-relaxed max-w-none"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Footer Actions */}
                    <div className="mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-6">
                        <Link href="/journal">
                            <Button variant="outline" className="gap-2">
                                <ArrowLeft className="w-4 h-4" /> Retour au Journal
                            </Button>
                        </Link>

                        <div className="flex items-center gap-4">
                            <span className="text-sm text-muted-foreground font-medium">Partager :</span>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                </div>
            </div>
        </article>
    )
}
