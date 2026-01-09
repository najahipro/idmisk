import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import { CheckCircle, Package, Truck, Home, MapPin, XCircle } from "lucide-react"
import { cancelOrder } from "@/actions/orders"
import { Button } from "@/components/ui/button" // Ensure this exists or use plain button classes
import { DeleteButton } from "@/components/orders/delete-button"
import { Separator } from "@/components/ui/separator"

export const dynamic = "force-dynamic"

export default async function OrderDetailsPage({ params }: { params: Promise<{ orderId: string }> }) {
    const { orderId } = await params

    const order = await db.order.findUnique({
        where: { id: orderId }
    })

    if (!order) {
        return notFound()
    }

    // Parse items from JSON string
    let items = []
    try {
        items = JSON.parse(order.items)
    } catch (e) {
        console.error("Error parsing items:", e)
        items = []
    }

    const currentStatus = order.status
    const isCancelled = ["CANCELLED", "Annulé"].includes(currentStatus)
    const canCancel = ["PENDING", "En attente", "CONFIRMED", "Confirmé"].includes(currentStatus)

    // Helper for Step Status
    // Logic: 
    // - En attente / Pending -> Step 1 Active
    // - En cours (Processing) -> Step 1, 2 Active
    // - Expédié -> Step 1, 2, 3 Active
    // - Livré -> All Active
    const getStepStatus = (index: number) => {
        if (isCancelled) return "cancelled"

        const steps = ["En attente", "En cours", "Expédié", "Livré"]
        // Map current status to an index
        let statusIndex = 0
        if (currentStatus === "En cours") statusIndex = 1
        if (currentStatus === "Expédié") statusIndex = 2
        if (currentStatus === "Livré") statusIndex = 3

        return index <= statusIndex ? "active" : "inactive"
    }

    const steps = [
        { label: "Confirmé", icon: CheckCircle },
        { label: "En préparation", icon: Package },
        { label: "Expédié", icon: Truck },
        { label: "Livré", icon: Home },
    ]

    return (
        <div className="min-h-screen bg-gray-50/50 py-12">
            <div className="container mx-auto px-4 md:px-6 max-w-6xl">

                {/* 1. Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Détails de la commande</h1>
                        <p className="text-muted-foreground mt-1">
                            Commande #{order.id.slice(0, 8).toUpperCase()} • Passée le {new Date(order.createdAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                    </div>
                    <div>
                        {isCancelled ? (
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-red-100 text-red-700">
                                <XCircle className="w-4 h-4" />
                                Annulée
                            </span>
                        ) : (
                            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-800 border border-yellow-200 shadow-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                                </span>
                                {currentStatus}
                            </span>
                        )}
                    </div>
                </div>

                {/* 2. Timeline Stepper */}
                {!isCancelled && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                        <div className="relative">
                            {/* Lines */}
                            <div className="absolute top-5 left-0 w-full h-1 bg-gray-100 -z-0">
                                {/* Colored Line overlay? Complex to do perfect width without calc, using simpler approach: 
                                    Each step has connecting line to right.
                                */}
                            </div>

                            <div className="flex justify-between relative z-10 w-full">
                                {steps.map((step, idx) => {
                                    const status = getStepStatus(idx)
                                    const isActive = status === 'active'
                                    const Icon = step.icon

                                    return (
                                        <div key={idx} className="flex flex-col items-center flex-1">
                                            {/* Connector Line (Left and Right logic handled by absolute bar usually, but let's stick to simple z-index overlay) */}

                                            <div className={`
                                                w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-300
                                                ${isActive
                                                    ? "bg-emerald-500 border-emerald-100 text-white shadow-md shadow-emerald-200"
                                                    : "bg-white border-gray-100 text-gray-300"}
                                            `}>
                                                <Icon className="w-5 h-5" />
                                            </div>
                                            <span className={`mt-3 text-sm font-medium transition-colors duration-300 ${isActive ? "text-emerald-700" : "text-gray-400"}`}>
                                                {step.label}
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                            {/* Progress Bar Background */}
                            <div className="absolute top-6 left-0 w-full h-1 bg-gray-100 -z-10 rounded-full" />

                            {/* Active Progress Bar - simple approximation based on status */}
                            <div className={`absolute top-6 left-0 h-1 bg-emerald-500 -z-10 rounded-full transition-all duration-500
                                ${currentStatus === 'En attente' ? 'w-[15%]' : ''}
                                ${currentStatus === 'En cours' ? 'w-[50%]' : ''}
                                ${currentStatus === 'Expédié' ? 'w-[85%]' : ''}
                                ${currentStatus === 'Livré' ? 'w-full' : ''}
                            `} />
                        </div>
                    </div>
                )}


                {/* 3. Main Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* LEFT COLUMN: Articles */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/30">
                                <h2 className="font-semibold text-lg text-gray-900">Articles commandés</h2>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {items.map((item: any, idx: number) => (
                                    <div key={idx} className="p-6 flex items-center gap-6 group hover:bg-gray-50/50 transition-colors">
                                        <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={item.image} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{item.name}</h3>
                                            <div className="flex items-center text-sm text-muted-foreground mt-1 gap-4">
                                                <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-gray-900 text-lg">{item.price} DH</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Summary & Actions */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Address Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-gray-400" />
                                Adresse de livraison
                            </h3>
                            <div className="text-sm text-gray-600 space-y-1 pl-7">
                                <p className="font-medium text-gray-900">{order.customerName}</p>
                                <p>{order.address}</p>
                                <p>{order.city}</p>
                                <p className="mt-2 text-gray-500">{order.customerPhone}</p>
                            </div>
                        </div>

                        {/* Summary Card */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                            <h3 className="font-semibold text-gray-900">Résumé</h3>

                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between text-gray-600">
                                    <span>Sous-total</span>
                                    <span>{order.total.toFixed(2)} DH</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Livraison</span>
                                    <span className="text-emerald-600 font-medium">Gratuite</span>
                                </div>
                            </div>

                            <Separator />

                            <div className="flex justify-between items-center">
                                <span className="font-bold text-gray-900 text-lg">Total</span>
                                <span className="font-bold text-2xl text-primary">{order.total.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">DH</span></span>
                            </div>

                            {/* Cancel Button Area */}
                            {canCancel && (
                                <div className="pt-4">
                                    <form action={async () => {
                                        "use server"
                                        await cancelOrder(orderId)
                                    }}>
                                        <DeleteButton />
                                    </form>
                                    <p className="text-xs text-center text-muted-foreground mt-3">
                                        L'annulation est possible tant que la commande n'est pas expédiée.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Help Box */}
                        <div className="bg-blue-50 rounded-xl border border-blue-100 p-4">
                            <p className="text-sm text-blue-800">
                                <strong>Besoin d'aide ?</strong> <br />
                                Contactez notre support via WhatsApp pour toute modification urgente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
