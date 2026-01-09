"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"

export function DeleteButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            variant="destructive"
            className="w-full sm:w-auto gap-2"
            disabled={pending}
            onClick={(e) => {
                if (!confirm("Êtes-vous sûr de vouloir annuler cette commande ? Cette action est irréversible.")) {
                    e.preventDefault()
                }
            }}
        >
            <XCircle className="w-4 h-4" />
            {pending ? "Annulation..." : "Annuler ma commande"}
        </Button>
    )
}
