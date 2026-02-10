"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { SingleImageUpload } from "@/components/ui/single-image-upload"

interface HomeLayoutData {
    id?: string
    heroImage?: string | null
    heroTitle?: string | null
    heroSubtitle?: string | null
    heroButtonText?: string | null
    middleImage?: string | null
    middleTitle?: string | null
    middleCategory?: string | null
    splitLeftImage?: string | null
    splitLeftTitle?: string | null
    splitLeftCategory?: string | null
    splitRightImage?: string | null
    splitRightTitle?: string | null
    splitRightCategory?: string | null
}

interface HomeLayoutClientProps {
    initialData: HomeLayoutData | null
}

const CATEGORY_OPTIONS = [
    { value: 'new-in', label: 'NEW IN' },
    { value: 'femme', label: 'FEMME' },
    { value: 'homme', label: 'HOMME' },
    { value: 'la-maison', label: 'LA MAISON' },
    { value: 'accessoires', label: 'ACCESSOIRES' },
    { value: 'shop', label: 'SHOP (All Products)' }
]

export default function HomeLayoutClient({ initialData }: HomeLayoutClientProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    const [formData, setFormData] = useState<HomeLayoutData>({
        heroImage: initialData?.heroImage || "",
        heroTitle: initialData?.heroTitle || "L'Élégance Modeste",
        heroSubtitle: initialData?.heroSubtitle || "Découvrez notre collection exclusive",
        heroButtonText: initialData?.heroButtonText || "Découvrir",
        middleImage: initialData?.middleImage || "",
        middleTitle: initialData?.middleTitle || "Soie de Médine",
        middleCategory: initialData?.middleCategory || "femme",
        splitLeftImage: initialData?.splitLeftImage || "",
        splitLeftTitle: initialData?.splitLeftTitle || "La Maison",
        splitLeftCategory: initialData?.splitLeftCategory || "la-maison",
        splitRightImage: initialData?.splitRightImage || "",
        splitRightTitle: initialData?.splitRightTitle || "Accessoires",
        splitRightCategory: initialData?.splitRightCategory || "accessoires",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage("")

        try {
            const response = await fetch("/api/admin/home-layout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            })

            const result = await response.json()

            if (response.ok) {
                setMessage("✅ Layout mis à jour avec succès!")
                router.refresh()
            } else {
                setMessage("❌ Erreur lors de la mise à jour")
            }
        } catch (error) {
            setMessage("❌ Erreur de connexion")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Gestionnaire de la Page d'Accueil</h1>

            {message && (
                <div className={`mb-6 p-4 rounded ${message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-12">

                {/* 1. HERO SECTION */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 border-b pb-3">1. Hero Principal (Haut de Page)</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <SingleImageUpload
                                value={formData.heroImage}
                                onChange={(value) => setFormData({ ...formData, heroImage: value })}
                                label="Image Hero (Paysage 16:9)"
                                aspectRatio="aspect-[16/9]"
                                height="h-48"
                            />
                            <div>
                                <label className="block text-sm font-medium mb-2">Titre</label>
                                <input
                                    type="text"
                                    value={formData.heroTitle || ""}
                                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Sous-titre</label>
                                <input
                                    type="text"
                                    value={formData.heroSubtitle || ""}
                                    onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Texte du Bouton</label>
                                <input
                                    type="text"
                                    value={formData.heroButtonText || ""}
                                    onChange={(e) => setFormData({ ...formData, heroButtonText: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Aperçu</label>
                            <div className="aspect-[16/9] bg-gray-100 rounded overflow-hidden relative">
                                {formData.heroImage ? (
                                    <Image src={formData.heroImage} alt="Hero Preview" fill className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        Aucune image
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. MIDDLE BANNER */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 border-b pb-3">2. Bannière du Milieu</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <SingleImageUpload
                                value={formData.middleImage}
                                onChange={(value) => setFormData({ ...formData, middleImage: value })}
                                label="Image Bannière Milieu (Paysage Large 21:9)"
                                aspectRatio="aspect-[21/9]"
                                height="h-32"
                            />
                            <div>
                                <label className="block text-sm font-medium mb-2">Titre</label>
                                <input
                                    type="text"
                                    value={formData.middleTitle || ""}
                                    onChange={(e) => setFormData({ ...formData, middleTitle: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Catégorie Liée</label>
                                <select
                                    value={formData.middleCategory || ""}
                                    onChange={(e) => setFormData({ ...formData, middleCategory: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    {CATEGORY_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Aperçu</label>
                            <div className="aspect-[21/9] bg-gray-100 rounded overflow-hidden relative">
                                {formData.middleImage ? (
                                    <Image src={formData.middleImage} alt="Middle Preview" fill className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        Aucune image
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3 & 4. SPLIT BANNERS */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 border-b pb-3">3 & 4. Bannières Divisées</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* LEFT */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Gauche (La Maison)</h3>
                            <SingleImageUpload
                                value={formData.splitLeftImage}
                                onChange={(value) => setFormData({ ...formData, splitLeftImage: value })}
                                label="Image Gauche (Portrait Tall 3:4)"
                                aspectRatio="aspect-[3/4]"
                                height="h-64"
                            />
                            <div>
                                <label className="block text-sm font-medium mb-2">Titre</label>
                                <input
                                    type="text"
                                    value={formData.splitLeftTitle || ""}
                                    onChange={(e) => setFormData({ ...formData, splitLeftTitle: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Catégorie Liée</label>
                                <select
                                    value={formData.splitLeftCategory || ""}
                                    onChange={(e) => setFormData({ ...formData, splitLeftCategory: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    {CATEGORY_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg">Droite (Accessoires)</h3>
                            <SingleImageUpload
                                value={formData.splitRightImage}
                                onChange={(value) => setFormData({ ...formData, splitRightImage: value })}
                                label="Image Droite (Portrait Court 3:4)"
                                aspectRatio="aspect-[3/4]"
                                height="h-52"
                            />
                            <div>
                                <label className="block text-sm font-medium mb-2">Titre</label>
                                <input
                                    type="text"
                                    value={formData.splitRightTitle || ""}
                                    onChange={(e) => setFormData({ ...formData, splitRightTitle: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Catégorie Liée</label>
                                <select
                                    value={formData.splitRightCategory || ""}
                                    onChange={(e) => setFormData({ ...formData, splitRightCategory: e.target.value })}
                                    className="w-full border border-gray-300 rounded px-3 py-2"
                                >
                                    {CATEGORY_OPTIONS.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SUBMIT BUTTON */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white px-8 py-3 rounded font-bold hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? "Enregistrement..." : "Enregistrer les Modifications"}
                    </button>
                </div>
            </form>
        </div>
    )
}
