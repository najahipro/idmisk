import { Ruler, Info, Phone, Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
    title: "Guide des Tailles | IDMISK",
    description: "Guide des tailles et dimensions pour nos Hijabs et articles IDMISK.",
}

export default function SizeGuidePage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">

                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6 text-primary">
                        <Ruler className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Guide des Tailles & Dimensions
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Tout savoir sur les dimensions de nos créations.
                    </p>
                </div>

                <div className="space-y-8">
                    {/* Main Message */}
                    <div className="bg-muted/30 p-8 rounded-xl border border-border">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Shirt className="w-5 h-5" />
                            Chaque collection est unique
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            Chez IDMISK, les dimensions exactes varient selon le tissu (Jersey, Soie de Médine, Crêpe...) et le style du modèle.
                            Par conséquent, nous ne proposons pas de tableau de tailles universel.
                        </p>
                        <div className="bg-background p-4 rounded-lg border border-border/50 flex gap-3">
                            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <p className="text-sm font-medium">
                                Pour connaître la taille précise d'un article, veuillez consulter la section <strong>"Description"</strong> sur la page du produit concerné. Vous y trouverez les mesures exactes (Longueur x Largeur).
                            </p>
                        </div>
                    </div>

                    {/* One Size Note */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-xl border border-border bg-card">
                            <h3 className="font-bold text-lg mb-2">Taille Unique</h3>
                            <p className="text-muted-foreground text-sm">
                                La plupart de nos Hijabs sont conçus en <strong>Taille Unique</strong>. Leurs dimensions généreuses sont étudiées pour s'adapter élégamment à toutes les morphologies et permettre différents styles de drapé.
                            </p>
                        </div>
                        <div className="p-6 rounded-xl border border-border bg-card flex flex-col justify-center">
                            <h3 className="font-bold text-lg mb-2">Besoin d'aide ?</h3>
                            <p className="text-muted-foreground text-sm mb-4">
                                Vous avez un doute sur une longueur ou un rendu porté ?
                            </p>
                            <Link href="https://wa.me/212600000000">
                                <Button variant="outline" className="w-full gap-2">
                                    <Phone className="w-4 h-4" />
                                    Conseil sur WhatsApp
                                </Button>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    )
}
