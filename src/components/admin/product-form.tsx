"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import * as z from "zod"
import { Plus, Loader2, Save, ArrowLeft, Trash, Truck, AlertCircle } from "lucide-react"
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ImageUpload } from "@/components/ui/image-upload"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

import { addProduct, updateProduct } from "@/actions/products"

const SIMPLE_CATEGORIES = [
    "Hijabs",
    "Khimars",
    "Packs Exclusifs",
    "Accessoires"
];

const formSchema = z.object({
    name: z.string().min(1, "Le nom est requis"),
    description: z.string().min(1, "La description est requise"),
    price: z.coerce.number().min(1, "Le prix est requis"),
    compareAtPrice: z.coerce.number().optional(),
    stock: z.coerce.number().default(0),
    category: z.string().min(1, "La catégorie est requise"),
    images: z.array(z.string()).min(1, "Au moins une image est requise"),
    status: z.enum(["active", "draft"]).default("active"),
    isFeatured: z.boolean().default(false),
    isNewArrival: z.boolean().default(false),
    isFreeShipping: z.boolean().default(false),
    colors: z.string().nullish(),
    customCategorySlug: z.string().nullish(),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
    initialData?: ProductFormValues & { id: string, images: string[] } | null
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()

    const isEdit = !!initialData
    const title = isEdit ? "Modifier le produit" : "Ajouter un produit"
    const action = isEdit ? "Enregistrer" : "Créer le produit"

    const defaultValues = initialData ? {
        ...initialData,
        price: parseFloat(String(initialData.price)),
        compareAtPrice: initialData.compareAtPrice ? parseFloat(String(initialData.compareAtPrice)) : 0,
        images: initialData.images || [],
        category: SIMPLE_CATEGORIES.includes(initialData.category) ? initialData.category : "Hijabs",
        isFreeShipping: initialData.isFreeShipping || false,
    } : {
        name: "",
        description: "",
        price: 0,
        compareAtPrice: 0,
        stock: 0,
        category: "Hijabs",
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

    const { isSubmitting, errors } = form.formState

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

        // Convert null/undefined to empty string to prevent validation errors
        formData.append("collectionName", "")
        formData.append("customCategorySlug", values.customCategorySlug ?? "")

        formData.append("images", JSON.stringify(values.images))
        formData.append("colors", values.colors || "")
        formData.append("status", values.status)

        formData.append("isFeatured", values.isFeatured ? "on" : "off")
        formData.append("isNewArrival", values.isNewArrival ? "on" : "off")
        formData.append("isFreeShipping", values.isFreeShipping ? "on" : "off")

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
                alert("Erreur: " + result.error)
                return
            }

            router.refresh()
            router.push("/admin/products")

        } catch (error) {
            console.error(error)
            alert("Une erreur inattendue est survenue.")
        }
    }

    return (
        <div className="space-y-4">
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

                    {/* ✅ ERROR DETECTIVE: Affiche l'erreur si le bouton est bloqué */}
                    {Object.keys(errors).length > 0 && (
                        <Alert variant="destructive" className="bg-red-50 border-red-200">
                            <AlertCircle className="h-4 w-4 text-red-600" />
                            <AlertTitle className="text-red-800">Attention</AlertTitle>
                            <AlertDescription className="text-red-700">
                                Le formulaire contient des erreurs. Vérifiez les champs suivants :
                                <ul className="list-disc pl-4 mt-2">
                                    {Object.entries(errors).map(([key, error]) => (
                                        <li key={key} className="capitalize">{key}: {error?.message as string}</li>
                                    ))}
                                </ul>
                            </AlertDescription>
                        </Alert>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-2 space-y-6">
                            <Card className="bg-white border-border shadow-sm">
                                <CardContent className="pt-6 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Titre</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Nom du produit" {...field} />
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
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Description détaillée (Utilisez 'Entrée' pour les sauts de ligne)..."
                                                        className="min-h-[150px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* ✅ CARD IMAGES S7I7A (ANTI-DUPLICATE) */}
                            <Card className="bg-white border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle>Images</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="images"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <ImageUpload
                                                        value={field.value || []}
                                                        disabled={isSubmitting}
                                                        onChange={(urls) => field.onChange(urls)}
                                                        onRemove={(url) => {
                                                            field.onChange((field.value || []).filter((current) => current !== url))
                                                        }}
                                                        onAdd={(url) => {
                                                            const current = field.value || []
                                                            if (!current.includes(url)) {
                                                                field.onChange([...current, url])
                                                            }
                                                        }}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle>Prix & Livraison</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="price"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Prix (DH)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="0.00" {...field} />
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
                                                    <FormLabel>Prix Promo (Optionnel)</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" placeholder="0.00" {...field} />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="isFreeShipping"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 bg-green-50">
                                                <div className="space-y-0.5 flex items-center gap-2">
                                                    <Truck className="h-5 w-5 text-green-600" />
                                                    <div>
                                                        <FormLabel className="text-base font-bold text-green-800">Livraison Gratuite</FormLabel>
                                                        <FormDescription className="text-green-700">
                                                            Activer pour offrir la livraison sur ce produit.
                                                        </FormDescription>
                                                    </div>
                                                </div>
                                                <FormControl>
                                                    <Switch
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="data-[state=checked]:bg-green-600"
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>
                        </div>

                        <div className="lg:col-span-1 space-y-6">
                            <Card className="bg-white border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle>Catégorie</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Choisir..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {SIMPLE_CATEGORIES.map((cat) => (
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
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-border shadow-sm">
                                <CardContent className="pt-6 space-y-4">
                                    <FormField
                                        control={form.control}
                                        name="stock"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Stock</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Visibilité</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="active">Publié</SelectItem>
                                                        <SelectItem value="draft">Brouillon</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormItem>
                                        )}
                                    />

                                    <div className="space-y-2 pt-2">
                                        <FormField
                                            control={form.control}
                                            name="isFeatured"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between border-t pt-2">
                                                    <FormLabel className="cursor-pointer font-normal text-sm">Best Seller</FormLabel>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="isNewArrival"
                                            render={({ field }) => (
                                                <FormItem className="flex items-center justify-between border-t pt-2">
                                                    <FormLabel className="cursor-pointer font-normal text-sm">Nouveauté</FormLabel>
                                                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Button type="submit" size="lg" className="w-full bg-black text-white hover:bg-gray-800" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                                {action}
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}