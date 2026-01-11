"use client"

import { useState, useEffect } from "react"
import { getArticles, createArticle, updateArticle, deleteArticle } from "@/actions/articles"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash, Plus } from "lucide-react"
import Image from "next/image"
import { ImageUpload } from "@/components/ui/image-upload"
import { useToast } from "@/components/ui/use-toast"

// Types matching Schema
interface Article {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    image: string
    author: string
    category: string | null
    date: string // Date string from JSON serialization usually
}

const EmptyArticle = {
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    author: "IDMISK Team",
    category: "Actualités"
}

export default function JournalAdminPage() {
    const [articles, setArticles] = useState<Article[]>([])
    const [loading, setLoading] = useState(true)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentArticle, setCurrentArticle] = useState<any>(EmptyArticle)
    const { toast } = useToast()

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const result = await getArticles()
        if (result.articles) {
            setArticles(result.articles as any)
        }
        setLoading(false)
    }

    const handleCreate = () => {
        setCurrentArticle(EmptyArticle)
        setIsEditing(false)
        setIsDialogOpen(true)
    }

    const handleEdit = (article: Article) => {
        setCurrentArticle(article)
        setIsEditing(true)
        setIsDialogOpen(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Voulez-vous vraiment supprimer cet article ?")) return
        const result = await deleteArticle(id)
        if (result.success) {
            toast({ title: "Article supprimé" })
            loadData()
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" })
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = new FormData()
        Object.keys(currentArticle).forEach(key => {
            if (currentArticle[key] !== null) formData.append(key, currentArticle[key])
        })

        let result
        if (isEditing && currentArticle.id) {
            result = await updateArticle(currentArticle.id, formData)
        } else {
            result = await createArticle(formData)
        }

        if (result.success) {
            toast({ title: isEditing ? "Article mis à jour" : "Article créé" })
            setIsDialogOpen(false)
            loadData()
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" })
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Gestion du Journal</h1>
                <Button onClick={handleCreate}>
                    <Plus className="mr-2 h-4 w-4" /> Nouvel Article
                </Button>
            </div>

            <div className="bg-white rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Titre</TableHead>
                            <TableHead>Auteur</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articles.map((article) => (
                            <TableRow key={article.id}>
                                <TableCell>
                                    <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                                        {article.image && <Image src={article.image} alt={article.title} fill className="object-cover" />}
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{article.title}</TableCell>
                                <TableCell>{article.author}</TableCell>
                                <TableCell>{new Date(article.date).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(article)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(article.id)} className="text-red-500 hover:text-red-600">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Modifier l'article" : "Nouvel Article"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Titre</Label>
                                <Input
                                    value={currentArticle.title}
                                    onChange={(e) => setCurrentArticle({ ...currentArticle, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Slug (URL)</Label>
                                <Input
                                    value={currentArticle.slug}
                                    onChange={(e) => setCurrentArticle({ ...currentArticle, slug: e.target.value })}
                                    placeholder="mon-super-article"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Image de couverture</Label>
                            <ImageUpload
                                value={currentArticle.image ? [currentArticle.image] : []}
                                disabled={false}
                                onChange={(url) => { }} // Not needed for single image
                                onRemove={() => setCurrentArticle({ ...currentArticle, image: "" })}
                                onAdd={(url) => setCurrentArticle({ ...currentArticle, image: url })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Auteur</Label>
                                <Input
                                    value={currentArticle.author}
                                    onChange={(e) => setCurrentArticle({ ...currentArticle, author: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Catégorie</Label>
                                <Input
                                    value={currentArticle.category || ""}
                                    onChange={(e) => setCurrentArticle({ ...currentArticle, category: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Extrait (Résumé)</Label>
                            <Textarea
                                value={currentArticle.excerpt}
                                onChange={(e) => setCurrentArticle({ ...currentArticle, excerpt: e.target.value })}
                                className="h-20"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Contenu (HTML/Text)</Label>
                            <Textarea
                                value={currentArticle.content}
                                onChange={(e) => setCurrentArticle({ ...currentArticle, content: e.target.value })}
                                className="h-64"
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-2 pt-4">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                            <Button type="submit">Enregistrer</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
}
