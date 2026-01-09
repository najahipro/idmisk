
import { OrderDetails } from "@/components/order/order-details-view"

export type { OrderDetails }

export async function getUserOrders(email: string): Promise<OrderDetails[]> {
    // Simulate database delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
        {
            id: "CMD-2024-001",
            date: "05 Jan 2024",
            total: "450.00 MAD",
            status: "En cours",
            customer: {
                name: "Amina User",
                phone: "0600123456",
                city: "Casablanca",
                address: "123 Rue de la Liberté"
            },
            items: [
                {
                    id: "pack-glow",
                    title: "Pack Glow Ultime",
                    image: "", // Placeholder
                    price: "450.00 MAD",
                    quantity: 1,
                    color: "Rose"
                },
                {
                    id: "serum-vit-c",
                    title: "Sérum Vitamine C",
                    image: "", // Placeholder
                    price: "0.00 MAD",
                    quantity: 1
                }
            ]
        },
        {
            id: "CMD-2023-128",
            date: "28 Dec 2023",
            total: "890.50 MAD",
            status: "Livrée",
            customer: {
                name: "Amina User",
                phone: "0600123456",
                city: "Rabat",
                address: "45 Avenue Hassan II"
            },
            items: [
                {
                    id: "creme-nuit",
                    title: "Crème Nuit Réparatrice",
                    image: "",
                    price: "350.00 MAD",
                    quantity: 2
                },
                {
                    id: "toner",
                    title: "Toner Apaisant",
                    image: "",
                    price: "190.50 MAD",
                    quantity: 1
                }
            ]
        }
    ]
}

// Mock function for guest tracking by phone
export async function getOrderByPhone(phone: string): Promise<OrderDetails | null> {
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Simulate finding an order
    if (phone.includes("0600")) {
        return {
            id: "CMD-GUEST-882",
            date: "03 Jan 2024",
            total: "620.00 MAD",
            status: "Expédié",
            customer: {
                name: "Guest User",
                phone: phone,
                city: "Marrakech",
                address: "Rue Yves Saint Laurent"
            },
            items: [
                {
                    id: "musk-tahara",
                    title: "Musk Tahara",
                    image: "",
                    price: "150.00 MAD",
                    quantity: 3
                },
                {
                    id: "savon-noir",
                    title: "Savon Noir Beldi",
                    image: "",
                    price: "170.00 MAD",
                    quantity: 1
                }
            ]
        }
    }
    return null
}
