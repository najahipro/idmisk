"use client"

import { useState, useEffect } from "react"
import { getUniversList, updateUnivers } from "@/actions/univers"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Unlock, Upload } from "lucide-react"
import Image from "next/image"
import { ImageUpload } from "@/components/ui/image-upload" // Assuming this component exists from ProductForm
import { useToast } from "@/components/ui/use-toast" // Assuming useToast exists

// Types
interface UniversItem {
    id: string
    title: string
    image: string
    link: string | null
    isLocked: boolean
    order: number
}

export default function UniversAdminPage() {
    const [universList, setUniversList] = useState<UniversItem[]>([])
    const [loading, setLoading] = useState(true)
    const [editingItem, setEditingItem] = useState<UniversItem | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const { toast } = useToast()

    // Load Data
    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        setLoading(true)
        const result = await getUniversList()
        if (result.list) {
            setUniversList(result.list)
        }
        setLoading(false)
    }

    // Handle Edit
    const handleEditClick = (item: UniversItem) => {
        setEditingItem(item)
        setIsDialogOpen(true)
    }

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingItem) return

        const formData = new FormData()
        formData.append("title", editingItem.title)
        formData.append("image", editingItem.image)
        formData.append("link", editingItem.link || "")
        formData.append("isLocked", String(editingItem.isLocked))

        const result = await updateUnivers(editingItem.id, formData)

        if (result.success) {
            toast({ title: "Mise à jour réussie" })
            setIsDialogOpen(false)
            loadData() // Reload to see changes
        } else {
            toast({ title: "Erreur", description: result.error, variant: "destructive" })
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Gestion Nos Univers</h1>
                {/* Seed button usually not needed if auto-seeded, but maybe check count */}
            </div>

            {loading ? (
                <div>Chargement...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {universList.map((item) => (
                        <Card key={item.id} className="overflow-hidden group relative">
                            <div className="aspect-[3/4] relative bg-gray-100">
                                {item.image ? (
                                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-muted-foreground">Aucune image</div>
                                )}
                                <div className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-2">
                                    {item.isLocked ? <Lock className="w-4 h-4 text-red-500" /> : <Unlock className="w-4 h-4 text-green-500" />}
                                </div>
                            </div>
                            <CardContent className="p-4 space-y-2">
                                <h3 className="font-serif font-bold text-lg">{item.title}</h3>
                                <div className="text-xs text-muted-foreground truncate">
                                    Lien: {item.link || "Aucun"}
                                </div>
                                <Button onClick={() => handleEditClick(item)} variant="outline" size="sm" className="w-full">
                                    Modifier
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Edit Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Modifier l'Univers</DialogTitle>
                    </DialogHeader>
                    {editingItem && (
                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Image de couverture</Label>
                                {/* Reusing ImageUpload. Assuming it takes (url) => setUrl. 
                                    If ImageUpload component supports single string, great. 
                                    Otherwise adapting logic. 
                                    Usually ImageUpload returns an array or single string.
                                */}
                                <ImageUpload
                                    value={editingItem.image ? [editingItem.image] : []}
                                    disabled={false}
                                    onChange={(url) => { }} // Not used for single image replacement
                                    onRemove={() => setEditingItem({ ...editingItem, image: "" })}
                                    onAdd={(url) => setEditingItem({ ...editingItem, image: url })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Titre</Label>
                                <Input
                                    value={editingItem.title}
                                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Lien de redirection (ex: /products?category=abayas)</Label>
                                <Input
                                    value={editingItem.link || ""}
                                    onChange={(e) => setEditingItem({ ...editingItem, link: e.target.value })}
                                />
                            </div>

                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="space-y-0.5">
                                    <Label>Verrouillé (Bientôt Disponible)</Label>
                                    <p className="text-xs text-muted-foreground">Si activé, le lien est désactivé et l'icône cadenas apparaît.</p>
                                </div>
                                <Switch
                                    checked={editingItem.isLocked}
                                    onCheckedChange={(checked) => setEditingItem({ ...editingItem, isLocked: checked })}
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-4">
                                <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Annuler</Button>
                                <Button type="submit">Enregistrer</Button>
                            </div>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    )
}
