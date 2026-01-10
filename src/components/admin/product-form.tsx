"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
import * as z from "zod"
import { Plus, Loader2, Trash, Save, ArrowLeft } from "lucide-react"
import { useRouter, useParams } from "next/navigation"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/image-upload"

import { addProduct, updateProduct } from "@/actions/products"

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
    images: z.array(z.string()).min(1, "Au moins une image est requise"),
    status: z.enum(["active", "draft"]).default("active"),
    isFeatured: z.boolean().default(false),
    isNewArrival: z.boolean().default(false),
    isFreeShipping: z.boolean().default(false),
    isFreeShipping: z.boolean().default(false),
    isFreeShipping: z.boolean().default(false),
    colors: z.string().optional(), // Comma separated
    customCategorySlug: z.string().optional(),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
    initialData?: ProductFormValues & { id: string, images: string[] } | null
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const params = useParams()

    // We check if we are in Edit mode
    const isEdit = !!initialData
    const title = isEdit ? "Modifier le produit" : "Ajouter un produit"
    const action = isEdit ? "Enregistrer les modifications" : "Créer le produit"

    const defaultValues = initialData ? {
        ...initialData,
        price: parseFloat(String(initialData.price)),
        compareAtPrice: initialData.compareAtPrice ? parseFloat(String(initialData.compareAtPrice)) : 0,
        images: initialData.images || [],
        customCategorySlug: initialData.customCategorySlug || "",
    } : {
        name: "",
        description: "",
        price: 0,
        compareAtPrice: 0,
        stock: 0,
        category: "Soie de Médine",
        images: [],
        status: "active",
        isFeatured: false,
        isNewArrival: false,
        isFreeShipping: false,
        colors: "",
        customCategorySlug: "",
    }

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        // @ts-ignore
        defaultValues,
    })

    const { isSubmitting } = form.formState

    const onSubmit = async (values: ProductFormValues) => {
        const formData = new FormData()
        formData.append("name", values.name)
        formData.append("description", values.description)
        formData.append("price", values.price.toString())

        if (values.compareAtPrice) {
            formData.append("compareAtPrice", values.compareAtPrice.toString())
        }

        formData.append("stock", values.stock.toString())
        formData.append("category", values.category)
        formData.append("customCategorySlug", values.customCategorySlug || "")

        // Serialiser le tableau d'images en JSON pour l'envoyer proprement
        formData.append("images", JSON.stringify(values.images))

        formData.append("colors", values.colors || "")
        formData.append("status", values.status)
        formData.append("isFeatured", values.isFeatured ? "on" : "off")
        formData.append("isNewArrival", values.isNewArrival ? "on" : "off")
        formData.append("isFreeShipping", values.isFreeShipping ? "on" : "off")

        // Map Status to showOnHome logic
        const showOnHome = values.status === "active"
        formData.append("showOnHome", showOnHome ? "on" : "off")

        try {
            let result;
            if (isEdit && initialData) {
                result = await updateProduct(initialData.id, formData)
            } else {
                result = await addProduct(formData)
            }

            if (result?.error) {
                alert(result.error)
                return
            }

            // Success message could be toast, but alert is fine as per request
            // alert(isEdit ? "Produit modifié !" : "Produit créé !")

            router.refresh()
            router.push("/admin/products")

        } catch (error) {
            console.error(error)
            alert("Une erreur inattendue est survenue")
        }
    }

    return (
        <div className="space-y-4">
            {/* Header with Back Button if Edit */}
            {isEdit && (
                <div className="flex items-center gap-4 mb-4">
                    <Button variant="outline" size="icon" onClick={() => router.push('/admin/products')}>
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <h1 className="text-xl font-bold">{title}</h1>
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
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
                                    <CardTitle className="text-base font-semibold text-gray-900">Médias (Multi-images)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="images"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <ImageUpload
                                                        value={field.value.map((image) => image)}
                                                        disabled={isSubmitting}
                                                        onChange={(newUrl) => {
                                                            field.onChange(newUrl)
                                                        }}
                                                        onAdd={(url) => {
                                                            // Fix for multiple upload race condition:
                                                            // Always fetch the LATEST value from the form store
                                                            const currentImages = form.getValues("images") || [];
                                                            field.onChange([...currentImages, url]);
                                                        }}
                                                        onRemove={(urlToRemove) => {
                                                            field.onChange(field.value.filter((current) => current !== urlToRemove))
                                                        }}
                                                    />
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
                                            {isEdit ? <Save className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />} {action}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}
