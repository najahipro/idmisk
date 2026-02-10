"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

interface Category {
    id: string
    name: string
    slug: string
    order: number
}

interface CategoriesClientProps {
    initialCategories: Category[]
}

export default function CategoriesClient({ initialCategories }: CategoriesClientProps) {
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>(initialCategories)
    const [isAdding, setIsAdding] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [formData, setFormData] = useState({ name: "", slug: "", order: 0 })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
    }

    const handleNameChange = (name: string) => {
        setFormData({
            ...formData,
            name,
            slug: generateSlug(name)
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const url = editingId ? `/api/admin/categories/${editingId}` : "/api/admin/categories"
            const method = editingId ? "PUT" : "POST"

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            if (response.ok) {
                setMessage(`✅ Catégorie ${editingId ? 'modifiée' : 'ajoutée'} avec succès!`)
                setFormData({ name: "", slug: "", order: 0 })
                setIsAdding(false)
                setEditingId(null)
                router.refresh()
            } else {
                const data = await response.json()
                setMessage(`❌ ${data.error || 'Erreur'}`)
            }
        } catch (error) {
            setMessage("❌ Erreur de connexion")
        } finally {
            setLoading(false)
        }
    }

    const handleEdit = (category: Category) => {
        setFormData({
            name: category.name,
            slug: category.slug,
            order: category.order
        })
        setEditingId(category.id)
        setIsAdding(true)
    }

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette catégorie?")) return

        setLoading(true)
        try {
            const response = await fetch(`/api/admin/categories/${id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                setMessage("✅ Catégorie supprimée")
                router.refresh()
            } else {
                setMessage("❌ Erreur lors de la suppression")
            }
        } catch (error) {
            setMessage("❌ Erreur de connexion")
        } finally {
            setLoading(false)
        }
    }

    const handleCancel = () => {
        setIsAdding(false)
        setEditingId(null)
        setFormData({ name: "", slug: "", order: 0 })
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Gestion des Catégories</h1>
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800"
                    >
                        + Ajouter une Catégorie
                    </button>
                )}
            </div>

            {message && (
                <div className={`mb-6 p-4 rounded ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            {/* Add/Edit Form */}
            {isAdding && (
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <h2 className="text-xl font-bold mb-4">
                        {editingId ? 'Modifier la Catégorie' : 'Nouvelle Catégorie'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Nom</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => handleNameChange(e.target.value)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Slug (auto-généré)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Ordre (pour le tri)</label>
                            <input
                                type="number"
                                value={formData.order}
                                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 disabled:opacity-50"
                            >
                                {loading ? "Enregistrement..." : (editingId ? "Modifier" : "Ajouter")}
                            </button>
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="bg-gray-300 text-black px-6 py-2 rounded font-bold hover:bg-gray-400"
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Nom
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Slug
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Ordre
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    Aucune catégorie. Ajoutez-en une pour commencer.
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                                        {category.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {category.slug}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                        {category.order}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="text-blue-600 hover:text-blue-900 mr-4"
                                        >
                                            Modifier
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
