import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] bg-background text-center px-4 space-y-4">
            <h1 className="text-9xl font-serif font-bold text-primary/10 select-none">404</h1>
            <div className="space-y-6 -mt-16 sm:-mt-20">
                <h2 className="text-3xl font-serif font-bold text-foreground">Page Introuvable</h2>
                <p className="text-muted-foreground max-w-[500px] mx-auto text-lg">
                    Oups ! La page que vous cherchez n'existe pas ou a été déplacée.
                </p>
                <Button asChild size="lg" className="rounded-full px-8">
                    <Link href="/">
                        Retour à l'accueil
                    </Link>
                </Button>
            </div>
        </div>
    )
}
