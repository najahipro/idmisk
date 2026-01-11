"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { z } from "zod"

// Schema Validation
const ArticleSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    slug: z.string().min(1, "Le slug est requis"),
    excerpt: z.string().min(1, "L'extrait est requis"),
    content: z.string().min(1, "Le contenu est requis"),
    image: z.string().min(1, "L'image est requise"),
    author: z.string().min(1, "L'auteur est requis"),
    category: z.string().optional(),
})

export async function getArticles() {
    try {
        const articles = await db.article.findMany({
            orderBy: { date: 'desc' }
        })
        return { articles }
    } catch (error) {
        console.error("Error fetching articles:", error)
        return { error: "Erreur lors du chargement des articles." }
    }
}

export async function getArticle(slug: string) {
    try {
        const article = await db.article.findUnique({
            where: { slug }
        })
        return { article }
    } catch (error) {
        return { error: "Article introuvable." }
    }
}

export async function createArticle(formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            excerpt: formData.get("excerpt"),
            content: formData.get("content"),
            image: formData.get("image"),
            author: formData.get("author"),
            category: formData.get("category"),
        }

        const validatedFields = ArticleSchema.safeParse(rawData)

        if (!validatedFields.success) {
            return { error: "Champs invalides : " + JSON.stringify(validatedFields.error.flatten().fieldErrors) }
        }

        const { title, slug, excerpt, content, image, author, category } = validatedFields.data

        // Check if slug exists
        const existing = await db.article.findUnique({ where: { slug } })
        if (existing) {
            return { error: "Ce slug (URL) existe déjà. Choisissez-en un autre." }
        }

        await db.article.create({
            data: {
                title,
                slug,
                excerpt,
                content,
                image,
                author,
                category: category || "Général",
                date: new Date()
            }
        })

        revalidatePath("/journal")
        revalidatePath("/admin/journal")
        return { success: true }
    } catch (error: any) {
        console.error("Error creating article:", error)
        return { error: `Erreur serveur: ${error.message}` }
    }
}

export async function updateArticle(id: string, formData: FormData) {
    try {
        const rawData = {
            title: formData.get("title"),
            slug: formData.get("slug"),
            excerpt: formData.get("excerpt"),
            content: formData.get("content"),
            image: formData.get("image"),
            author: formData.get("author"),
            category: formData.get("category"),
        }

        const validatedFields = ArticleSchema.safeParse(rawData)

        if (!validatedFields.success) {
            return { error: "Champs invalides." }
        }

        const { title, slug, excerpt, content, image, author, category } = validatedFields.data

        // Check unique slug constraint (exclude current id)
        const existing = await db.article.findFirst({
            where: {
                slug,
                NOT: { id }
            }
        })
        if (existing) {
            return { error: "Ce slug est déjà pris." }
        }

        await db.article.update({
            where: { id },
            data: {
                title,
                slug,
                excerpt,
                content,
                image,
                author,
                category: category || "Général"
            }
        })

        revalidatePath("/journal")
        revalidatePath("/admin/journal")
        revalidatePath(`/journal/${slug}`)
        return { success: true }
    } catch (error: any) {
        return { error: `Erreur serveur: ${error.message}` }
    }
}

export async function deleteArticle(id: string) {
    try {
        await db.article.delete({ where: { id } })
        revalidatePath("/journal")
        revalidatePath("/admin/journal")
        return { success: true }
    } catch (error) {
        return { error: "Impossible de supprimer l'article." }
    }
}
