"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/image-upload"
import { upsertHomeCollection } from "@/actions/collections"
import { Loader2, Save, Trash } from "lucide-react"

// Available categories for filtering
const CATEGORIES = [
    { label: "Soie de Médine", value: "Soie de Médine" },
    { label: "Jersey Luxe", value: "Jersey Luxe" },
    { label: "Crêpe Premium", value: "Crêpe Premium" },
    { label: "Mousseline", value: "Mousseline" },
    { label: "Hijabs (Tout)", value: "hijab" },
    { label: "Khimars", value: "khimar" },
    { label: "Abayas", value: "abaya" },
    { label: "Packs", value: "Packs" },
    { label: "Accessoires", value: "Accessoires" },
    { label: "Toutes les catégories", value: "all" },
    { label: "Nouveautés (Tri)", value: "newest" }, // Special handle for URL
]

interface Collection {
    id: string
    title: string
    imageUrl: string
    categoryKey: string
    order: number
}

interface CollectionManagerProps {
    initialCollections: Collection[]
}

export function CollectionManager({ initialCollections }: CollectionManagerProps) {
    const router = useRouter()
    const [loadingMap, setLoadingMap] = useState<Record<number, boolean>>({})

    // We expect 4 slots. If data exists, use it. Else empty placeholders.
    const slots = [1, 2, 3, 4]

    const getCollectionForSlot = (order: number) => {
        return initialCollections.find(c => c.order === order) || {
            id: "",
            title: "",
            imageUrl: "",
            categoryKey: "",
            order: order
        }
    }

    const handleSave = async (order: number, data: Partial<Collection>) => {
        setLoadingMap(prev => ({ ...prev, [order]: true }))

        const existing = getCollectionForSlot(order)
        const formData = new FormData()
        if (existing.id) formData.append("id", existing.id)

        formData.append("title", data.title || existing.title || "")
        formData.append("imageUrl", data.imageUrl || existing.imageUrl || "")
        formData.append("categoryKey", data.categoryKey || existing.categoryKey || "")
        formData.append("order", order.toString())

        try {
            await upsertHomeCollection(formData)
            router.refresh()
            // Optionally show toast
        } catch (error) {
            console.error(error)
            alert("Erreur")
        } finally {
            setLoadingMap(prev => ({ ...prev, [order]: false }))
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {slots.map((order) => {
                const collection = getCollectionForSlot(order)
                return (
                    <CollectionCard
                        key={order}
                        order={order}
                        collection={collection}
                        onSave={(data) => handleSave(order, data)}
                        loading={loadingMap[order]}
                    />
                )
            })}
        </div>
    )
}

function CollectionCard({ order, collection, onSave, loading }: {
    order: number,
    collection: any,
    onSave: (data: any) => void,
    loading: boolean
}) {
    const [title, setTitle] = useState(collection.title)
    const [imageUrl, setImageUrl] = useState(collection.imageUrl)
    const [categoryKey, setCategoryKey] = useState(collection.categoryKey)

    // Update state when prop changes (if DB updates in background, though router.refresh handles this)
    // We rely on initial state for simplicity, assuming page reload on save or router.refresh re-renders the component tree.

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSave({ title, imageUrl, categoryKey })
    }

    return (
        <Card className="h-full flex flex-col shadow-md overflow-hidden bg-white/50 backdrop-blur-sm">
            <CardHeader className="bg-slate-50 border-b pb-4">
                <CardTitle className="flex items-center justify-between">
                    <span>Slot #{order}</span>
                    {imageUrl && <span className="text-xs font-normal px-2 py-1 bg-green-100 text-green-700 rounded-full">Active</span>}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 p-6">
                <div className="space-y-3">
                    <Label className="text-base font-semibold">Image de couverture</Label>
                    <div className="bg-slate-50 p-4 rounded-lg border border-dashed border-slate-300">
                        {imageUrl ? (
                            <div className="relative aspect-video rounded-lg overflow-hidden border bg-white shadow-sm group">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={imageUrl}
                                    alt="Preview"
                                    className="object-cover w-full h-full text-xs text-muted-foreground"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => setImageUrl("")}
                                    >
                                        <Trash className="w-4 h-4 mr-2" />
                                        Supprimer
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <ImageUpload
                                    value={imageUrl ? [imageUrl] : []}
                                    onChange={(url) => {
                                        if (Array.isArray(url) && url.length > 0) {
                                            setImageUrl(url[url.length - 1])
                                        } else if (typeof url === 'string') {
                                            setImageUrl(url)
                                        }
                                    }}
                                    onRemove={() => setImageUrl("")}
                                    disabled={loading}
                                />
                                <div className="mt-2 text-left">
                                    <Label className="text-xs text-muted-foreground">Ou coller une URL :</Label>
                                    <Input
                                        placeholder="https://..."
                                        value={imageUrl}
                                        onChange={(e) => setImageUrl(e.target.value)}
                                        className="h-8 text-xs mt-1"
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground text-center mt-2">
                                    JPG, WEBP (Vertical pour slots 2/3, Horizontal pour 1/4)
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-base font-semibold">Titre de la collection</Label>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Nouveautés, Soie de Médine..."
                        className="h-10"
                    />
                </div>

                <div className="space-y-3">
                    <Label className="text-base font-semibold">Lien de redirection</Label>
                    <Select value={categoryKey} onValueChange={setCategoryKey}>
                        <SelectTrigger className="h-10">
                            <SelectValue placeholder="Choisir une catégorie..." />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map(cat => (
                                <SelectItem key={cat.value} value={cat.value}>
                                    {cat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="pt-6 mt-auto">
                    <Button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full bg-black hover:bg-gray-800 text-white font-bold py-6 text-lg"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5 mr-2" />}
                        Enregistrer Slot #{order}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
