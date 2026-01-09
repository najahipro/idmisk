import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AffiliateBanner() {
    return (
        <section className="bg-primary text-white py-12">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                            Devenez Ambassadrice IDMISK
                        </h2>
                        <p className="text-primary-foreground/90 md:text-lg max-w-xl">
                            Rejoignez notre communauté, partagez nos valeurs et gagnez de l'argent en recommandant nos produits de qualité.
                        </p>
                    </div>
                    <Link
                        href="/ambassadrice"
                        className="inline-flex h-12 items-center justify-center rounded-full bg-white text-primary px-8 text-sm font-bold shadow-lg transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                    >
                        Rejoindre le programme
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
