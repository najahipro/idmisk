import { ContactForm } from "@/components/contact-form"
import { Mail, MapPin, Phone, Instagram, Facebook } from "lucide-react"

export const metadata = {
    title: "Contactez-nous | IDMISK",
    description: "Contactez l'équipe IDMISK pour toute question sur nos hijabs, vos commandes ou pour une collaboration à Casablanca, Maroc.",
}

export default function ContactPage() {
    return (
        <main className="min-h-screen pt-24 pb-20 bg-muted/20">
            <div className="container mx-auto px-4 md:px-6">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                        Contactez-nous
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Une question sur nos produits ou votre commande ? Notre équipe est à votre écoute du lundi au samedi.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Column: Contact Info */}
                    <div className="lg:col-span-5 space-y-10">
                        {/* Info Cards */}
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">WhatsApp</h3>
                                    <p className="text-muted-foreground mb-2">Service client rapide</p>
                                    <a href="https://wa.me/212600000000" className="text-primary font-medium hover:underline">
                                        +212 6 XX XX XX XX
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Email</h3>
                                    <p className="text-muted-foreground mb-2">Pour toute demande formelle</p>
                                    <a href="mailto:contact@idmisk.com" className="text-primary font-medium hover:underline">
                                        contact@idmisk.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg mb-1">Siège</h3>
                                    <p className="text-muted-foreground">
                                        Casablanca, Maroc<br />
                                        Livraison dans tout le royaume
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Social Proof / Trust */}
                        <div className="pt-8 border-t">
                            <h3 className="font-serif font-bold text-xl mb-4">Suivez-nous</h3>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-foreground hover:text-primary transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href="#" className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-foreground hover:text-primary transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="lg:col-span-7">
                        <ContactForm />
                    </div>

                </div>
            </div>
        </main>
    )
}
