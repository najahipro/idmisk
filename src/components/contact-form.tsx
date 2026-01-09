"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { submitContactForm, ContactState } from "@/app/contact/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Send } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const initialState: ContactState = {
    message: "",
}

function SubmitButton() {
    const { pending } = useFormStatus()

    return (
        <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/90 h-12 uppercase tracking-wide text-sm font-medium"
            disabled={pending}
        >
            {pending ? (
                <span className="flex items-center gap-2">
                    Envoi en cours...
                </span>
            ) : (
                <span className="flex items-center gap-2">
                    Envoyer <Send className="w-4 h-4 ml-1" />
                </span>
            )}
        </Button>
    )
}

export function ContactForm() {
    const [state, formAction] = useActionState(submitContactForm, initialState)

    return (
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-border/50">
            <h2 className="text-2xl font-serif font-bold mb-6">Envoyez-nous un message</h2>

            {state.success && (
                <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Succès !</AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}

            {state.error && (
                <Alert className="mb-6 bg-red-50 text-red-800 border-red-200" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Erreur</AlertTitle>
                    <AlertDescription>
                        {state.message}
                    </AlertDescription>
                </Alert>
            )}

            <form action={formAction} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Votre nom"
                            required
                            className={state.errors?.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {state.errors?.name && (
                            <p className="text-xs text-red-500">{state.errors.name[0]}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="votre@email.com"
                            required
                            className={state.errors?.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                        />
                        {state.errors?.email && (
                            <p className="text-xs text-red-500">{state.errors.email[0]}</p>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <select
                        id="subject"
                        name="subject"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        required
                    >
                        <option value="" disabled selected>Sélectionnez un sujet</option>
                        <option value="commande">Question sur ma commande</option>
                        <option value="produit">Question sur un produit</option>
                        <option value="retour">Retour & Échange</option>
                        <option value="collaboration">Collaboration / Presse</option>
                        <option value="autre">Autre</option>
                    </select>
                    {state.errors?.subject && (
                        <p className="text-xs text-red-500">{state.errors.subject[0]}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="Comment pouvons-nous vous aider ?"
                        className={`min-h-[150px] ${state.errors?.message ? "border-red-500 focus-visible:ring-red-500" : ""}`}
                        required
                    />
                    {state.errors?.message && (
                        <p className="text-xs text-red-500">{state.errors.message[0]}</p>
                    )}
                </div>

                <SubmitButton />
            </form>
        </div>
    )
}
