"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, RefreshCw } from "lucide-react"

export default function AdminError({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("Admin Panel Error:", error)
    }, [error])

    return (
        <div className="flex items-center justify-center min-h-[60vh] p-4">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <div className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-6 w-6" />
                        <CardTitle>Erreur de Chargement</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Une erreur s'est produite lors du chargement du panneau d'administration.
                        Cela peut être dû à un problème de connexion à la base de données ou à un délai d'attente.
                    </p>

                    {error.message && (
                        <div className="bg-red-50 border border-red-200 rounded p-3">
                            <p className="text-xs font-mono text-red-800">{error.message}</p>
                        </div>
                    )}

                    <div className="flex gap-2">
                        <Button
                            onClick={reset}
                            className="flex-1"
                            variant="default"
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Réessayer
                        </Button>
                        <Button
                            onClick={() => window.location.href = "/admin"}
                            variant="outline"
                            className="flex-1"
                        >
                            Retour au Tableau de Bord
                        </Button>
                    </div>

                    <p className="text-xs text-muted-foreground text-center">
                        Si le problème persiste, vérifiez votre connexion internet ou contactez le support.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
