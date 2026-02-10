import Image from "next/image"
import { Sparkles, Heart, ShieldCheck, HeadphonesIcon } from "lucide-react"

export const metadata = {
    title: "Qui sommes-nous ? | IDMISK",
    description: "Découvrez l'histoire d'IDMISK, l'élégance au quotidien née à Casablanca.",
}

export default function AboutPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 max-w-5xl">

                {/* Hero Section */}
                <div className="text-center mb-16 md:mb-24">
                    <span className="text-sm font-medium tracking-widest text-primary uppercase mb-4 block">À propos</span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground">Notre Histoire</h1>
                    <div className="w-20 h-1 bg-primary/20 mx-auto mt-6 rounded-full" />
                </div>

                {/* Split Section: Image Left / Text Right (Desktop) */}
                <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center mb-24">
                    {/* Image Column */}
                    <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-xl md:order-last">
                        {/* Placeholder for Founder/Team/Hijabs */}
                        <Image
                            src="/id.jpg"
                            alt="L'Univers IDMISK"
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-700"
                            priority
                        />
                        <div className="absolute inset-0 bg-black/10" />
                    </div>

                    {/* Text Column */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4">
                                IDMISK : L'Élégance au Quotidien.
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                                Née au cœur de Casablanca, IDMISK n'est pas seulement une marque de foulards, c'est une promesse. La promesse de ne plus avoir à choisir entre la qualité, le prix et la pudeur.
                            </p>
                        </div>

                        <div>
                            <h3 className="tex-lg font-bold font-serif mb-2 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-primary" /> L'Obsession du Détail
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                                Nous savons à quel point il est difficile de trouver le Hijab parfait : celui qui ne glisse pas, qui est totalement opaque et qui résiste aux lavages. C'est pourquoi nous sélectionnons nous-mêmes nos tissus (Jersey Premium, Soie de Médine) pour vous offrir le meilleur.
                            </p>
                        </div>

                        <div>
                            <h3 className="tex-lg font-bold font-serif mb-2 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-primary" /> Notre Mission
                            </h3>
                            <p className="text-muted-foreground leading-relaxed text-lg text-justify">
                                Notre mission est simple : sublimer la femme marocaine moderne avec des pièces intemporelles, livrées chez vous avec soin.
                            </p>
                        </div>

                        <div className="pt-4">
                            <p className="font-serif italic text-xl text-primary/80">
                                "Parce que vous méritez l'excellence."
                            </p>
                        </div>
                    </div>
                </div>

                {/* Values Section */}
                <div className="bg-muted/30 rounded-2xl p-8 md:p-12 border border-border/50">
                    <div className="grid md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">

                        <div className="px-4 py-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                                <Sparkles className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif font-bold text-lg mb-2">Qualité Premium</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Des tissus rigoureusement sélectionnés pour leur douceur et leur résistance au temps.
                            </p>
                        </div>

                        <div className="px-4 py-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif font-bold text-lg mb-2">Éthique</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Une production respectueuse et une transparence totale sur nos produits.
                            </p>
                        </div>

                        <div className="px-4 py-4">
                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-primary">
                                <HeadphonesIcon className="w-6 h-6" />
                            </div>
                            <h3 className="font-serif font-bold text-lg mb-2">Service Client</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Une équipe disponible et à l'écoute pour vous accompagner dans vos choix.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </main>
    )
}
