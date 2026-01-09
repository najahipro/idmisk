import Link from "next/link"
import { Button } from "@/components/ui/button" // تأكد أن البوتون تصاوب فالخطوة السابقة
import { ArrowLeft, CheckCircle, DollarSign, Users } from "lucide-react"

export default function AmbassadricePage() {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* 1. Header بسيط باش يرجعو للصفحة الرئيسية */}
            <header className="border-b bg-white/50 backdrop-blur p-4">
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'accueil
                    </Link>
                    <span className="font-serif text-xl font-bold text-primary">IDMISK Partners</span>
                </div>
            </header>

            <main className="flex-1">
                {/* 2. Hero Section */}
                <section className="py-16 md:py-24 text-center bg-secondary/10">
                    <div className="container mx-auto px-4">
                        <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
                            Devenez Ambassadrice IDMISK
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Rejoignez notre programme d'affiliation exclusif. Recommandez nos hijabs de qualité et gagnez des commissions sur chaque vente validée.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="#join-form">
                                <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
                                    Commencer Maintenant
                                </Button>
                            </a>
                        </div>
                    </div>
                </section>

                {/* 3. Avantages (Why join us?) */}
                <section className="py-16 container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-card p-6 rounded-lg border text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <DollarSign className="text-primary h-6 w-6" />
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2">Commissions Attractives</h3>
                            <p className="text-muted-foreground">Gagnez jusqu'à 20 DH par pack vendu. Paiement garanti chaque semaine.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg border text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Users className="text-primary h-6 w-6" />
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2">Communauté Active</h3>
                            <p className="text-muted-foreground">Accédez à notre groupe WhatsApp privé et recevez des conseils pour mieux vendre.</p>
                        </div>
                        <div className="bg-card p-6 rounded-lg border text-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="text-primary h-6 w-6" />
                            </div>
                            <h3 className="font-serif text-xl font-bold mb-2">Suivi Transparent</h3>
                            <p className="text-muted-foreground">Un tableau de bord personnel pour suivre vos clics et vos ventes en temps réel.</p>
                        </div>
                    </div>
                </section>

                {/* 4. Formulaire d'inscription */}
                <section id="join-form" className="py-16 bg-muted/30">
                    <div className="container mx-auto px-4 max-w-md">
                        <div className="bg-white p-8 rounded-xl shadow-sm border">
                            <h2 className="font-serif text-2xl font-bold text-center mb-6">Inscription Gratuite</h2>
                            <form className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-1">Nom Complet</label>
                                    <input type="text" id="name" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/50 outline-none" placeholder="Votre nom" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                                    <input type="email" id="email" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/50 outline-none" placeholder="exemple@gmail.com" required />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium mb-1">Numéro WhatsApp</label>
                                    <input type="tel" id="phone" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/50 outline-none" placeholder="06..." required />
                                </div>
                                <div>
                                    <label htmlFor="instagram" className="block text-sm font-medium mb-1">Lien Instagram / TikTok</label>
                                    <input type="text" id="instagram" className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary/50 outline-none" placeholder="@votre_compte" />
                                </div>

                                <div className="pt-2">
                                    <Button className="w-full bg-primary text-white hover:bg-primary/90">
                                        Envoyer ma candidature
                                    </Button>
                                </div>
                                <p className="text-xs text-center text-muted-foreground mt-4">
                                    En cliquant sur envoyer, vous acceptez nos <Link href="/terms" className="underline">conditions générales</Link>.
                                </p>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}