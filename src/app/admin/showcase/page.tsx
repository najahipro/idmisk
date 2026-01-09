"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save, AlertCircle, CheckCircle } from "lucide-react"

export default function AdminShowcasePage() {
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const [config, setConfig] = useState({
        title: "Pastel Blue",
        subtitle: "La Couleur du Mois",
        buttonText: "Acheter ce look",
        buttonLink: "/products/pastel-blue",
        imageLarge: "/id.jpg",
        imageTopRight: "/id.jpg",
        imageBottomRight1: "/id.jpg",
        imageBottomRight2: "/id.jpg"
    })

    useEffect(() => {
        // Load from localStorage
        const saved = localStorage.getItem("idmisk-showcase-config")
        if (saved) {
            try {
                setConfig(JSON.parse(saved))
            } catch (e) {
                console.error("Failed to parse showcase config", e)
            }
        }
        setIsLoading(false)
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setConfig(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSave = () => {
        setIsSaving(true)
        setMessage(null)

        try {
            localStorage.setItem("idmisk-showcase-config", JSON.stringify(config))
            setMessage({ type: 'success', text: "Modifications enregistrées avec succès !" })
            // Auto hide success message
            setTimeout(() => setMessage(null), 3000)
        } catch (e) {
            setMessage({ type: 'error', text: "Erreur lors de l'enregistrement." })
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return <div className="p-8">Chargement...</div>
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Gestion du Moodboard</h1>
            </div>

            {message && (
                <div className={`p-4 rounded-md flex items-center gap-2 ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {message.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
                    {message.text}
                </div>
            )}

            <Card>
                <CardHeader>
                    <CardTitle>Contenu Textuel</CardTitle>
                    <CardDescription>Modifiez les textes affichés sur la grande image principale.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Titre Principal</Label>
                            <Input id="title" name="title" value={config.title} onChange={handleChange} placeholder="ex: Pastel Blue" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subtitle">Sous-titre (Petit)</Label>
                            <Input id="subtitle" name="subtitle" value={config.subtitle} onChange={handleChange} placeholder="ex: La Couleur du Mois" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="buttonText">Texte du Bouton</Label>
                            <Input id="buttonText" name="buttonText" value={config.buttonText} onChange={handleChange} placeholder="ex: Acheter ce look" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="buttonLink">Lien du Bouton</Label>
                            <Input id="buttonLink" name="buttonLink" value={config.buttonLink} onChange={handleChange} placeholder="ex: /products/..." />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Images</CardTitle>
                    <CardDescription>Entrez les URLs des images. Utilisez le gestionnaire de médias pour uploader vos images d'abord.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* Left Side: Large Image */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Image Principale (Gauche)</h3>
                            <div className="space-y-2">
                                <Label htmlFor="imageLarge">URL Image Grande</Label>
                                <Input id="imageLarge" name="imageLarge" value={config.imageLarge} onChange={handleChange} placeholder="/images/..." />
                            </div>
                            {/* Preview */}
                            <div className="aspect-[3/4] md:aspect-auto md:h-[300px] w-full bg-slate-100 rounded-md overflow-hidden relative border">
                                {config.imageLarge ? <img src={config.imageLarge} alt="Preview" className="w-full h-full object-cover" /> : <div className="flex items-center justify-center h-full text-slate-400">Aperçu</div>}
                            </div>
                        </div>

                        {/* Right Side: 3 Grid Images */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg">Grille de Droite</h3>

                            <div className="space-y-2">
                                <Label htmlFor="imageTopRight">Haut Droite (Large)</Label>
                                <Input id="imageTopRight" name="imageTopRight" value={config.imageTopRight} onChange={handleChange} />
                                <div className="h-24 w-full bg-slate-100 rounded-md overflow-hidden border">
                                    {config.imageTopRight && <img src={config.imageTopRight} alt="Preview" className="w-full h-full object-cover" />}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="imageBottomRight1">Bas Droite 1</Label>
                                    <Input id="imageBottomRight1" name="imageBottomRight1" value={config.imageBottomRight1} onChange={handleChange} />
                                    <div className="aspect-square w-full bg-slate-100 rounded-md overflow-hidden border">
                                        {config.imageBottomRight1 && <img src={config.imageBottomRight1} alt="Preview" className="w-full h-full object-cover" />}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="imageBottomRight2">Bas Droite 2</Label>
                                    <Input id="imageBottomRight2" name="imageBottomRight2" value={config.imageBottomRight2} onChange={handleChange} />
                                    <div className="aspect-square w-full bg-slate-100 rounded-md overflow-hidden border">
                                        {config.imageBottomRight2 && <img src={config.imageBottomRight2} alt="Preview" className="w-full h-full object-cover" />}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} className="w-full md:w-auto text-lg px-8">
                    {isSaving ? "Enregistrement..." : <><Save className="mr-2 h-4 w-4" /> Enregistrer les modifications</>}
                </Button>
            </div>
        </div>
    )
}
