"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@radix-ui/react-label" // Assuming we have Label or just using HTML label

export default function SliderSettingsPage() {
    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Réglages du Slider Homepage</h2>
                <Button>Sauvegarder les modifications</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Configuration Générale</CardTitle>
                    <CardDescription>Gérez le comportement du carrousel d'accueil.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full items-center gap-1.5">
                        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Vitesse de défilement (ms)
                        </label>
                        <Input type="number" placeholder="4000" defaultValue={4000} />
                        <p className="text-[0.8rem] text-muted-foreground">Temps en millisecondes avant le changement de slide auto.</p>
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <div className="h-4 w-4 border rounded bg-primary"></div> {/* Checkbox mock */}
                        <label className="text-sm font-medium leading-none">Activer le défilement automatique</label>
                    </div>

                    <div className="flex items-center space-x-2 border p-4 rounded-md">
                        <div className="h-4 w-4 border rounded bg-primary"></div> {/* Checkbox mock */}
                        <label className="text-sm font-medium leading-none">Boucler à l'infini (Loop)</label>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Images du Slider</CardTitle>
                    <CardDescription>Ajoutez ou supprimez des slides.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border-2 border-dashed rounded-lg p-10 text-center text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                        <p>Glissez-déposez des images ici ou cliquez pour uploader</p>
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="relative aspect-video bg-muted rounded-md overflow-hidden group">
                                {/* Placeholder Image */}
                                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                    <span className="text-2xl opacity-20">Slide {i}</span>
                                </div>
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="destructive" size="sm">Supprimer</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
