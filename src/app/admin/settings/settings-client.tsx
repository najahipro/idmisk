"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Save } from "lucide-react"

import { createColor, deleteColor } from "./actions"

interface Category {
    id: string
    name: string
    slug: string
    order: number
}

interface Color {
    id: string
    name: string
    hexCode: string
}

interface SiteSettings {
    id?: string
    middleBannerImage?: string | null
    middleBannerTitle?: string | null
    middleBannerLink?: string | null
    topBarMessage1?: string | null
    topBarMessage2?: string | null
    topBarMessage3?: string | null
}

interface SettingsClientProps {
    initialCategories: Category[]
    initialSettings: SiteSettings | null
    initialColors: Color[]
}

export default function SettingsClient({ initialCategories, initialSettings, initialColors }: SettingsClientProps) {
    const router = useRouter()

    // Categories State
    const [categories, setCategories] = useState<Category[]>(initialCategories)
    const [newCategoryName, setNewCategoryName] = useState("")

    // Colors State
    const [colors, setColors] = useState<Color[]>(initialColors)
    const [newColorName, setNewColorName] = useState("")
    const [newColorHex, setNewColorHex] = useState("#000000")

    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    // Top Bar Messages - Initialize from database
    const [topBarMessage1, setTopBarMessage1] = useState(initialSettings?.topBarMessage1 || "Livraison gratuite à partir de 500 DH")
    const [topBarMessage2, setTopBarMessage2] = useState(initialSettings?.topBarMessage2 || "Retours sous 14 jours")
    const [topBarMessage3, setTopBarMessage3] = useState(initialSettings?.topBarMessage3 || "Paiement sécurisé")

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "")
    }

    const handleAddCategory = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newCategoryName.trim()) return

        setLoading(true)
        setMessage("")

        try {
            const response = await fetch("/api/admin/categories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: newCategoryName,
                    slug: generateSlug(newCategoryName),
                    order: categories.length
                })
            })

            if (response.ok) {
                setMessage("✅ Catégorie ajoutée avec succès!")
                setNewCategoryName("")
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

    const handleDeleteCategory = async (id: string) => {
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

    const handleAddColor = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newColorName.trim() || !newColorHex) return

        setLoading(true)
        setMessage("")

        const result = await createColor(newColorName, newColorHex)

        if (result.success) {
            setMessage("✅ Couleur ajoutée avec succès!")
            setNewColorName("")
            setNewColorHex("#000000")
            // Optimistic update or wait for refresh? Refresh is safer for ID
            router.refresh()
        } else {
            setMessage(`❌ ${result.error || 'Erreur lors de l\'ajout de la couleur'}`)
        }
        setLoading(false)
    }

    const handleDeleteColor = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer cette couleur?")) return

        setLoading(true)
        const result = await deleteColor(id)

        if (result.success) {
            setMessage("✅ Couleur supprimée")
            router.refresh()
        } else {
            setMessage(`❌ ${result.error || 'Erreur lors de la suppression'}`)
        }
        setLoading(false)
    }

    const handleSaveTopBar = async () => {
        setLoading(true)
        setMessage("")

        try {
            const response = await fetch("/api/admin/top-bar", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topBarMessage1,
                    topBarMessage2,
                    topBarMessage3
                })
            })

            const result = await response.json()

            if (response.ok) {
                setMessage("✅ Messages de la barre d'annonce sauvegardés!")
                router.refresh()
            } else {
                setMessage("❌ Erreur lors de la sauvegarde")
            }
        } catch (error) {
            setMessage("❌ Erreur de connexion")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Réglages</h1>

            {message && (
                <div className={`mb-6 p-4 rounded ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <div className="space-y-8">
                {/* SECTION A: CATEGORY MANAGEMENT */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 border-b pb-3">Gestion des Catégories</h2>

                    {/* Add Category Form */}
                    <form onSubmit={handleAddCategory} className="mb-6">
                        <div className="flex gap-4">
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Nom de la nouvelle catégorie (ex: Robes, Chemises)"
                                className="flex-1 border border-gray-300 rounded px-4 py-2"
                            />
                            <button
                                type="submit"
                                disabled={loading || !newCategoryName.trim()}
                                className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
                            >
                                <Plus className="h-4 w-4" />
                                Ajouter
                            </button>
                        </div>
                    </form>

                    {/* Categories List */}
                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-700 mb-3">Catégories existantes:</h3>
                        {categories.length === 0 ? (
                            <p className="text-gray-500 italic">Aucune catégorie. Ajoutez-en une ci-dessus.</p>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {categories.map((category) => (
                                    <div
                                        key={category.id}
                                        className="flex items-center justify-between border border-gray-200 rounded px-4 py-3 bg-gray-50"
                                    >
                                        <div>
                                            <span className="font-medium">{category.name}</span>
                                            <span className="text-xs text-gray-500 ml-2">({category.slug})</span>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteCategory(category.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* SECTION B: COLOR MANAGEMENT */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 border-b pb-3">Gestion des Couleurs</h2>

                    {/* Add Color Form */}
                    <form onSubmit={handleAddColor} className="mb-6">
                        <div className="flex gap-4 items-end">
                            <div className="flex-1">
                                <label className="block text-sm font-medium mb-1">Nom de la couleur</label>
                                <input
                                    type="text"
                                    value={newColorName}
                                    onChange={(e) => setNewColorName(e.target.value)}
                                    placeholder="Ex: Bordeaux, Ciel..."
                                    className="w-full border border-gray-300 rounded px-4 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Code Hex</label>
                                <div className="flex items-center gap-2 border border-gray-300 rounded px-2 py-1 h-[42px]">
                                    <input
                                        type="color"
                                        value={newColorHex}
                                        onChange={(e) => setNewColorHex(e.target.value)}
                                        className="w-8 h-8 cursor-pointer border-none p-0 bg-transparent"
                                    />
                                    <span className="text-sm font-mono">{newColorHex}</span>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading || !newColorName.trim()}
                                className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2 h-[42px]"
                            >
                                <Plus className="h-4 w-4" />
                                Ajouter
                            </button>
                        </div>
                    </form>

                    {/* Colors List */}
                    <div className="space-y-2">
                        <h3 className="font-medium text-gray-700 mb-3">Couleurs existantes:</h3>
                        {colors.length === 0 ? (
                            <p className="text-gray-500 italic">Aucune couleur définie. Ajoutez-en une ci-dessus.</p>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                {colors.map((color) => (
                                    <div
                                        key={color.id}
                                        className="flex items-center justify-between border border-gray-200 rounded px-3 py-2 bg-gray-50"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-4 h-4 rounded-full border border-black/10"
                                                style={{ backgroundColor: color.hexCode }}
                                            />
                                            <span className="font-medium text-sm">{color.name}</span>
                                        </div>
                                        <button
                                            onClick={() => handleDeleteColor(color.id)}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* SECTION C: TOP BAR MESSAGES */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 border-b pb-3">Barre d'Annonce (Top Bar)</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Message 1</label>
                            <input
                                type="text"
                                value={topBarMessage1}
                                onChange={(e) => setTopBarMessage1(e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                                placeholder="Ex: Livraison gratuite à partir de 500 DH"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Message 2</label>
                            <input
                                type="text"
                                value={topBarMessage2}
                                onChange={(e) => setTopBarMessage2(e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                                placeholder="Ex: Retours sous 14 jours"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Message 3</label>
                            <input
                                type="text"
                                value={topBarMessage3}
                                onChange={(e) => setTopBarMessage3(e.target.value)}
                                className="w-full border border-gray-300 rounded px-4 py-2"
                                placeholder="Ex: Paiement sécurisé"
                            />
                        </div>

                        <button
                            onClick={handleSaveTopBar}
                            disabled={loading}
                            className="bg-black text-white px-6 py-2 rounded font-bold hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
                        >
                            <Save className="h-4 w-4" />
                            Sauvegarder les Messages
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
