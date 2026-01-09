"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

interface OrderData {
    customerName: string
    customerEmail: string
    customerPhone: string
    address: string
    city: string
    items: any[]
    total: number
}

export async function placeOrder(orderData: OrderData) {
    const { customerName, customerEmail, customerPhone, address, city, items, total } = orderData

    if (!customerName || !customerPhone || !address || !city || items.length === 0) {
        return { error: "Veuillez remplir tous les champs et ajouter des produits." }
    }

    try {
        const order = await db.order.create({
            data: {
                customerName,
                customerEmail: customerEmail || "", // Handle empty email if necessary
                customerPhone,
                address,
                city,
                items: JSON.stringify(items),
                total,
                status: "En attente" // Default status
            }
        })

        // Fire & Forget Email Notification (Don't await to avoid blocking UI if slow)
        // Actually, for Server Actions, we should await or it might be killed? 
        // Best practice in Next.js Server Actions: await but catch error so it doesn't fail the action.
        try {
            const { sendOrderNotification } = await import("@/lib/mail");
            await sendOrderNotification({
                orderId: order.id,
                customerName: customerName,
                customerEmail: customerEmail || "",
                total: total,
                items: items
            });
        } catch (mailError) {
            console.error("Failed to send order email:", mailError);
            // check if we should notify user? No, order is placed. Just log.
        }

        revalidatePath("/admin/orders")
        return { success: true, orderId: order.id }
    } catch (error) {
        console.error("Error placing order:", error)
        return { error: "Une erreur est survenue lors de la commande." }
    }
}

export async function updateOrderStatus(orderId: string, status: string) {
    try {
        await db.order.update({
            where: { id: orderId },
            data: { status }
        })
        revalidatePath("/admin/orders")
        return { success: true }
    } catch (error) {
        console.error("Error updating status:", error)
        return { error: "Erreur lors de la mise à jour." }
    }
}

export async function cancelOrder(orderId: string) {
    try {
        const order = await db.order.findUnique({
            where: { id: orderId }
        })

        if (!order) {
            return { error: "Commande introuvable." }
        }

        if (["SHIPPED", "DELIVERED", "CANCELLED", "Expédié", "Livré", "Annulé"].includes(order.status)) {
            return { error: "Impossible d'annuler une commande déjà traitée ou annulée." }
        }

        await db.order.update({
            where: { id: orderId },
            data: { status: "Annulé" }
        })

        revalidatePath(`/orders/${orderId}`)
        revalidatePath("/my-orders")
        revalidatePath("/admin/orders")

        return { success: true }
    } catch (error) {
        console.error("Error cancelling order:", error)
        return { error: "Erreur lors de l'annulation." }
    }
}
