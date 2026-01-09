"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import * as z from "zod"
import { Plus, Loader2, Trash } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/image-upload"

import { addProduct as addProductAction } from "@/actions/products"
// import { toast } from "sonner" 

const CATEGORIES = [
    "Soie de Médine",
    "Jersey Luxe",
    "Crêpe Premium",
    "Mousseline",
    "Packs",
    "Accessoires"
]

const formSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string(),
    price: z.coerce.number().min(1, "Le prix est requis"),
    compareAtPrice: z.coerce.number().optional(),
    stock: z.coerce.number().default(0),
    category: z.string().min(1, "La catégorie est requise"),
    images: z.string().optional(), // Comma separated URLs
    status: z.enum(["active", "draft"]).default("active"),
    isFeatured: z.boolean().default(false),
    isNewArrival: z.boolean().default(false),
    isFreeShipping: z.boolean().default(false),
    colors: z.string().optional(), // Comma separated
})

type ProductFormValues = z.infer<typeof formSchema>

export function ProductForm() {
    const router = useRouter()

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0,
            compareAtPrice: 0,
            stock: 0,
            category: "Soie de Médine",
            images: "",
            status: "active",
            isFeatured: false,
            isNewArrival: false,
            isFreeShipping: false,
            colors: "",
        },
    })

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return null
    }

    const { isSubmitting } = form.formState

    const onSubmit = async (values: ProductFormValues) => {
        console.log("🚀 SUBMITTING DATA:", values)
        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("description", values.description)
        formData.append("price", values.price.toString())

        if (values.compareAtPrice) {
            formData.append("compareAtPrice", values.compareAtPrice.toString())
        }

        formData.append("stock", values.stock.toString())
        formData.append("category", values.category)
        formData.append("images", values.images || "")
        formData.append("colors", values.colors || "")
        formData.append("status", values.status)
        formData.append("isFeatured", values.isFeatured ? "on" : "off")
        formData.append("isNewArrival", values.isNewArrival ? "on" : "off")
        formData.append("isFreeShipping", values.isFreeShipping ? "on" : "off")
        formData.append("isFreeShipping", values.isFreeShipping ? "on" : "off")

        // Map Status to showOnHome logic
        // If Status is Active -> showOnHome is ON (visible)
        const showOnHome = values.status === "active"
        formData.append("showOnHome", showOnHome ? "on" : "off")

        try {
            const result = await addProductAction(formData)

            if (result?.error) {
                console.error("Server Error:", result.error)
                alert(result.error) // Keep alert so user knows, but log it too
                return
            }

            alert("Produit enregistré avec succès !")
            form.reset()
            router.refresh()

        } catch (error) {
            console.error(error)
            alert("Une erreur inattendue est survenue")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("FORM VALIDATION ERRORS:", errors))} className="space-y-8 pb-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* === LEFT COLUMN (2/3) === */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Card 1: Title & Description */}
                        <Card className="bg-white border-border shadow-sm">
                            <CardContent className="pt-6 space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-gray-900">Titre</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Nom du produit" className="border-gray-300 focus-visible:ring-black" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="description"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="font-semibold text-gray-900">Description</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Description détaillée du produit..."
                                                    className="min-h-[200px] border-gray-300 focus-visible:ring-black resize-y"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Card 2: Media */}
                        <Card className="bg-white border-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold text-gray-900">Médias</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="images"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                {field.value ? (
                                                    <div className="relative aspect-video mt-2 rounded-lg overflow-hidden border bg-slate-100">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img
                                                            src={field.value}
                                                            alt="Product Image"
                                                            className="object-cover w-full h-full"
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="destructive"
                                                            size="sm"
                                                            className="absolute top-2 right-2"
                                                            onClick={() => {
                                                                field.onChange("")
                                                                form.setValue("images", "", { shouldValidate: true, shouldDirty: true })
                                                            }}
                                                        >
                                                            <Trash className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="space-y-2">
                                                        <ImageUpload
                                                            value={field.value ? [field.value] : []}
                                                            disabled={isSubmitting}
                                                            onChange={(url) => {
                                                                const latestUrl = Array.isArray(url) ? url[url.length - 1] : url
                                                                console.log("Image Uploaded (Latest):", latestUrl)
                                                                field.onChange(latestUrl)
                                                                form.setValue("images", latestUrl, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
                                                            }}
                                                            onRemove={() => {
                                                                field.onChange("")
                                                                form.setValue("images", "", { shouldValidate: true, shouldDirty: true, shouldTouch: true })
                                                            }}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            size="sm"
                                                            className="mt-2 text-xs w-full border-dashed"
                                                            onClick={() => {
                                                                const fakeUrl = "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg"
                                                                console.log("Forcing Fake Image:", fakeUrl)
                                                                field.onChange(fakeUrl)
                                                                form.setValue("images", fakeUrl, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
                                                            }}
                                                        >
                                                            ⚠️ DEBUG: Force Test Image
                                                        </Button>
                                                        <div className="pt-2">
                                                            <div className="relative">
                                                                <Input
                                                                    placeholder="Ou coller une URL d'image ici..."
                                                                    className="text-xs h-8 pr-8"
                                                                    onChange={(e) => {
                                                                        field.onChange(e.target.value)
                                                                        form.setValue("images", e.target.value, { shouldValidate: true, shouldDirty: true, shouldTouch: true })
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Card 3: Pricing */}
                        <Card className="bg-white border-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold text-gray-900">Prix</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prix (DH)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0.00" className="border-gray-300 focus-visible:ring-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="compareAtPrice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Prix comparé (DH)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="0.00" className="border-gray-300 focus-visible:ring-black" {...field} />
                                                </FormControl>
                                                <FormDescription className="text-xs">Pour afficher une solde</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Card 4: Inventory & Variants */}
                        <Card className="bg-white border-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold text-gray-900">Stocks & Variantes</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="stock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Quantité</FormLabel>
                                                <FormControl>
                                                    <Input type="number" className="border-gray-300 focus-visible:ring-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="colors"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Couleurs</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Rouge, Bleu, Noir..." className="border-gray-300 focus-visible:ring-black" {...field} />
                                                </FormControl>
                                                <FormDescription className="text-xs">Séparez les couleurs par des virgules</FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                    </div>

                    {/* === RIGHT COLUMN (1/3) === */}
                    <div className="lg:col-span-1 space-y-6">

                        {/* Card 5: Status */}
                        <Card className="bg-white border-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold text-gray-900">État du produit</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="border-gray-300 focus:ring-black">
                                                        <SelectValue placeholder="Sélectionner un état" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="active">Actif</SelectItem>
                                                    <SelectItem value="draft">Brouillon</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription className="text-xs mt-2">
                                                Ce produit sera {field.value === 'active' ? 'visible' : 'caché'} sur la boutique.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>

                        {/* Card 6: Organization */}
                        <Card className="bg-white border-border shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold text-gray-900">Organisation</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="category"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Catégorie</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="border-gray-300 focus:ring-black">
                                                        <SelectValue placeholder="Choisir une catégorie" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {CATEGORIES.map((cat) => (
                                                        <SelectItem key={cat} value={cat}>
                                                            {cat}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="space-y-3 pt-2">
                                    <FormField
                                        control={form.control}
                                        name="isNewArrival"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="cursor-pointer font-normal">
                                                        Nouveauté
                                                    </FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isFeatured"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                                                <div className="space-y-0.5">
                                                    <FormLabel className="cursor-pointer font-normal">
                                                        Best Seller
                                                    </FormLabel>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="isFreeShipping"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-4">
                                                <div className="space-y-0.5">
                                                    <FormLabel>Livraison Gratuite</FormLabel>
                                                    <FormDescription className="text-xs">
                                                        التوصيل فابور لهذا المنتج
                                                    </FormDescription>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit Action */}
                        <div className="flex justify-end pt-4">
                            <Button type="submit" size="lg" className="w-full font-bold bg-black hover:bg-gray-800 text-white" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enregistrement...
                                    </>
                                ) : (
                                    <>
                                        <Plus className="mr-2 h-4 w-4" /> Enregistrer
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </Form>
    )
}
