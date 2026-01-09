"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingBag, Trash2, ArrowLeft, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { useCart } from "@/context/cart-context"
import { useOrder } from "@/context/order-context"

import { useCurrency } from "@/context/currency-context"
import { placeOrder } from "@/actions/orders"

export function CartSheet() {
    const { items, removeItem, updateQuantity, total, isOpen, setIsOpen, clearCart, addItem } = useCart()
    const { addOrder } = useOrder()

    const { formatPrice } = useCurrency()
    const router = useRouter()
    const { data: session } = useSession()

    // UI State
    const [isCheckingOut, setIsCheckingOut] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Form State
    const [formData, setFormData] = useState({
        name: "",
        email: session?.user?.email || "",
        phone: "",
        city: "",
        address: ""
    })

    // Update email if session loads late
    // useEffect(() => {
    //     if (session?.user?.email) {
    //         setFormData(prev => ({ ...prev, email: session.user.email! }))
    //     }
    // }, [session]) 
    // Doing this simply via default state might miss update if session loads after mount. 
    // Better to use default value in Input or effect. 
    // For simplicity let's stick to state but ensure we pass session email if available at submit time.

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setIsCheckingOut(true) // Should be already true if seeing form, but just in case

        // Use Server Action
        const result = await placeOrder({
            customerName: formData.name,
            customerEmail: session?.user?.email || formData.email,
            customerPhone: formData.phone,
            address: formData.address,
            city: formData.city,
            items: items,
            total: total
        })

        if (result.error) {
            alert(result.error)
            return
        }

        if (result.success) {
            setIsSuccess(true)
            clearCart()

            // Redirect to order page after success animation
            setTimeout(() => {
                setIsOpen(false)
                setIsSuccess(false)
                setIsCheckingOut(false)
                setFormData({ name: "", email: "", phone: "", city: "", address: "" })
                // Maybe redirect to a thank you page or order details if implemented
                // router.push(`/commande/${encodeURIComponent(result.orderId)}`)
            }, 1500)
        }
    }

    const closeSheet = () => {
        setIsOpen(false)
        setIsCheckingOut(false)
        setIsSuccess(false)
    }

    return (
        <Sheet open={isOpen} onOpenChange={closeSheet}>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg overflow-y-auto">
                <SheetHeader className="px-1 text-left">
                    <SheetTitle className="flex items-center gap-2">
                        {isSuccess ? (
                            <span className="text-green-600 flex items-center gap-2"><CheckCircle /> Commande Validée</span>
                        ) : isCheckingOut ? (
                            <button onClick={() => setIsCheckingOut(false)} className="flex items-center text-primary hover:underline text-sm font-normal">
                                <ArrowLeft className="mr-1 h-4 w-4" /> Retour
                            </button>
                        ) : (
                            <span className="flex items-center gap-2"><ShoppingBag className="h-5 w-5" /> Mon Panier ({items.length})</span>
                        )}
                    </SheetTitle>
                </SheetHeader>

                {isSuccess ? (
                    <div className="flex flex-col items-center justify-center h-full space-y-4 pr-6">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                            <CheckCircle className="h-10 w-10" />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-center">Merci pour votre commande !</h3>
                        <p className="text-center text-muted-foreground">
                            Nous avons bien reçu votre commande. <br />
                            Nous vous contacterons bientôt pour la livraison.
                        </p>
                        <Button onClick={closeSheet} className="mt-8 rounded-full w-full">
                            Continuer sur le site
                        </Button>
                    </div>
                ) : isCheckingOut ? (
                    <div className="pr-6 mt-6">
                        <h3 className="text-lg font-bold mb-6">Informations de Livraison</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Nom Complet</Label>
                                <Input id="name" name="name" required placeholder="Ex: Amina Benali" value={formData.name} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email {session?.user?.email ? "(Connecté)" : ""}</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Ex: amina@example.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={!!session?.user?.email} // Disable if logged in, utilize session email
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Téléphone</Label>
                                <Input id="phone" name="phone" required placeholder="Ex: 06 12 34 56 78" type="tel" value={formData.phone} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="city">Ville</Label>
                                <Input id="city" name="city" required placeholder="Ex: Casablanca" value={formData.city} onChange={handleInputChange} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Adresse</Label>
                                <Input id="address" name="address" required placeholder="Adresse détaillée" value={formData.address} onChange={handleInputChange} />
                            </div>

                            <div className="pt-6 border-t mt-6">
                                <div className="flex justify-between font-bold text-lg mb-6">
                                    <span>Total à payer</span>
                                    <span>{formatPrice(total)}</span>
                                </div>
                                <Button type="submit" className="w-full h-12 text-lg rounded-full">
                                    Confirmer la Commande
                                </Button>
                                <p className="text-xs text-center text-muted-foreground mt-3">
                                    Paiement à la livraison
                                </p>
                            </div>
                        </form>
                    </div>
                ) : (
                    items.length > 0 ? (
                        <>
                            <div className="flex-1 overflow-y-auto pr-6 my-4">
                                <ul className="space-y-4">
                                    {items.map((item) => (
                                        <li key={`${item.id}-${item.color}`} className="flex py-4 border-b last:border-0 items-center gap-4">
                                            {/* Image */}
                                            <div className="relative h-20 w-20 overflow-hidden rounded-md border border-gray-200 shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex flex-1 flex-col justify-between self-stretch">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{item.title}</h3>
                                                        {item.color && (
                                                            <p className="mt-1 text-xs text-muted-foreground">Couleur: {item.color}</p>
                                                        )}
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeItem(item.id, item.color)}
                                                        className="text-muted-foreground hover:text-red-500 transition-colors -mt-1 -mr-1 p-2"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>

                                                <div className="flex items-end justify-between mt-2">
                                                    {/* Quantity Selector - Left/Bottom */}
                                                    <div className="flex items-center border rounded-full h-8 bg-muted/20">
                                                        <button
                                                            className="w-8 h-full flex items-center justify-center hover:bg-muted text-gray-600 disabled:opacity-30 rounded-l-full transition-colors"
                                                            onClick={() => updateQuantity(item.id, item.color, -1)}
                                                            disabled={item.quantity <= 1}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                                        <button
                                                            className="w-8 h-full flex items-center justify-center hover:bg-muted text-gray-600 rounded-r-full transition-colors"
                                                            onClick={() => updateQuantity(item.id, item.color, 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>

                                                    {/* Total Price - Right/Bottom */}
                                                    <p className="font-bold text-base text-primary">
                                                        {formatPrice(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Upsell Section */}
                            {/* Upsell Section Removed temporarily to fix build dependency */}

                            <div className="border-t border-gray-200 pr-6 pt-4 mb-6">
                                <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                                    <p>Total</p>
                                    <p>{formatPrice(total)}</p>
                                </div>
                                <div className="mt-6">
                                    <Button onClick={() => setIsCheckingOut(true)} className="w-full h-12 text-lg rounded-full">
                                        Commander
                                    </Button>
                                </div>
                                <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
                                    <p>Livraison gratuite & Paiement à la réception</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex h-full flex-col items-center justify-center space-y-2 pr-6">
                            <ShoppingBag className="h-12 w-12 text-gray-300" />
                            <p className="text-lg font-medium text-gray-900">Votre panier est vide</p>
                            <Button variant="link" onClick={() => setIsOpen(false)} className="text-primary">
                                Continuer vos achats &rarr;
                            </Button>
                        </div>
                    )
                )}
            </SheetContent>
        </Sheet>
    )
}
