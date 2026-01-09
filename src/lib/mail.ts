import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Default sender for testing domain
const FROM_EMAIL = 'onboarding@resend.dev';
// For testing, we generally redirect everything to the admin if the domain isn't verified.
// Ideally, the user sets ADMIN_EMAIL in .env
const ADMIN_EMAIL = process.env.STORE_OWNER_EMAIL || 'idmisk.contact@gmail.com'; // Fallback if not set

interface OrderEmailProps {
    orderId: string;
    customerName: string;
    customerEmail: string;
    total: number;
    items: any[];
}

export async function sendOrderNotification({
    orderId,
    customerName,
    customerEmail, // We'll send to this unless in test mode restrictions
    total,
    items
}: OrderEmailProps) {
    try {
        console.log("SENDING EMAILS via Resend...");

        // 1. Admin Notification
        await resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL,
            subject: `🔔 Nouvelle Commande #${orderId.slice(0, 8)} - ${total} DH`,
            html: `
                <h1>Nouvelle Commande Reçue !</h1>
                <p><strong>Client:</strong> ${customerName}</p>
                <p><strong>Email:</strong> ${customerEmail}</p>
                <p><strong>Total:</strong> ${total} DH</p>
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/admin/orders">Voir la commande</a>
            `
        });

        // 2. Customer Confirmation
        // NOTE: In "Testing" mode on Resend, you can ONLY send to your own authenticated email.
        // So we might need to send this to ADMIN_EMAIL as well but labeled as "Customer Copy" 
        // until the domain is verified.

        // Let's try sending to customer. If it fails (due to restrictions), catch it.
        // But for this task, the user said "send ALL emails to the Admin's email for now".

        await resend.emails.send({
            from: FROM_EMAIL,
            to: ADMIN_EMAIL, // REDIRECTED TO ADMIN FOR TESTING
            subject: `✅ [COPY FOR CLIENT] Merci pour votre commande ${customerName} !`,
            html: `
                <h1>Merci pour votre commande !</h1>
                <p>Bonjour ${customerName},</p>
                <p>Nous avons bien reçu votre commande chez IDMISK.</p>
                <p><strong>Total:</strong> ${total} DH</p>
                <p>Nous vous contacterons bientôt pour la livraison.</p>
            `
        });

        console.log("Emails sent successfully.");
        return { success: true };

    } catch (error) {
        console.error("Resend Email Error:", error);
        return { success: false, error };
    }
}
