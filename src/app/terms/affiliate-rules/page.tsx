import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Coins } from "lucide-react";

export default function AffiliateRulesPage() {
    return (
        <div className="container mx-auto py-16 px-4 md:px-6 max-w-4xl">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4">Programme Ambassadrice</h1>
                <p className="text-muted-foreground text-lg">Règles et Conditions de Paiement</p>
            </div>

            <div className="space-y-8">
                {/* Introduction */}
                <Card className="bg-white border-primary/20 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <Coins className="h-6 w-6 text-primary" />
                            Comment ça marche ?
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-foreground/80 leading-relaxed">
                        <p>
                            Le programme d'affiliation IDMISK, ou "Taswiq b 3omla", vous permet de gagner de l'argent en recommandant nos hijabs premium.
                            C'est simple : vous partagez votre lien, et vous recevez une commission pour chaque vente <strong>validée</strong>.
                        </p>
                    </CardContent>
                </Card>

                {/* Validation Rules */}
                <Card className="bg-green-50/50 border-green-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-green-800 text-lg flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            Validation des Commissions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-green-900/80">
                        <p className="font-medium">
                            IMPORTANT: La commission n'est calculée qu'après la livraison effective.
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>Le statut de la commande doit passer à <strong>"Livré"</strong>.</li>
                            <li>Si la cliente retourne le produit ou annule, la commission est annulée.</li>
                            <li>Le paiement s'effectue chaque fin de mois pour les commandes livrées.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Anti-Fraud / Ban Policy */}
                <Card className="bg-red-50/50 border-red-200 shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-red-800 text-lg flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5" />
                            Politique Anti-Fraude
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-red-900/80">
                        <p>
                            Toute tentative de fausse commande ou de manipulation du système entraînera :
                        </p>
                        <ul className="list-disc pl-5 space-y-2">
                            <li>L'annulation immédiate de toutes les commissions en attente.</li>
                            <li>Le <strong>bannissement définitif</strong> du compte ambassadrice.</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* Ethical Quote */}
                <div className="mt-16 text-center bg-secondary/10 p-8 rounded-2xl border border-secondary/20">
                    <h3 className="font-serif text-2xl text-primary mb-4" dir="rtl">
                        "أعطوا الأجير أجره قبل أن يجف عرقه"
                    </h3>
                    <p className="text-foreground/80 italic mb-6">
                        "Donnez au salarié son salaire avant que sa sueur ne sèche."
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mx-auto">
                        Chez IDMISK, nous prenons cet engagement au sérieux. Nous nous assurons que chaque ambassadrice soit payée justement et rapidement une fois son travail accompli et validé.
                    </p>
                </div>

                <div className="flex justify-center pt-8">
                    <Button size="lg" asChild>
                        <Link href="/ambassadrice">Je m'inscris au programme</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
