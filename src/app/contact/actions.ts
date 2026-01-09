"use server"

import { revalidatePath } from "next/cache"

export type ContactState = {
    message: string
    success?: boolean
    error?: boolean
    errors?: {
        name?: string[]
        email?: string[]
        subject?: string[]
        message?: string[]
    }
}

export async function submitContactForm(prevState: ContactState, formData: FormData): Promise<ContactState> {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const subject = formData.get("subject") as string
    const message = formData.get("message") as string

    // Basic Validation
    const errors: ContactState['errors'] = {}

    if (!name || name.trim().length < 2) {
        errors.name = ["Le nom doit contenir au moins 2 caractères."]
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = ["Veuillez entrer une adresse email valide."]
    }

    if (!subject) {
        errors.subject = ["Veuillez sélectionner un sujet."]
    }

    if (!message || message.trim().length < 10) {
        errors.message = ["Votre message doit contenir au moins 10 caractères."]
    }

    if (Object.keys(errors).length > 0) {
        return {
            message: "Veuillez corriger les erreurs ci-dessous.",
            error: true,
            errors
        }
    }

    // TODO: Connect to Email Service (Resend/Nodemailer) or Database here
    console.log("Contact Form Submitted:", { name, email, subject, message })

    return {
        success: true,
        message: "Merci ! Votre message a bien été envoyé. Nous vous répondrons sous 24h."
    }
}
