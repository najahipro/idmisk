"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useEffect } from "react"
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

import { getColors } from "@/app/admin/settings/actions"

// Categories and Colors will be fetched dynamically

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
    homepageLocation: z.enum(["NONE", "ESSENTIALS", "EDITORIAL", "NEW_IN"]).default("NONE"),
    colors: z.array(z.string()).default([]), // Array of color IDs
    sizes: z.array(z.string()).default([]), // Array of size IDs
    customCategorySlug: z.string().nullish(),
})

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
    initialData?: (ProductFormValues & { id: string, images: string[], colors?: any[], sizes?: any[] }) | null
}

export function ProductForm({ initialData }: ProductFormProps) {
    const router = useRouter()
    const [categories, setCategories] = useState<Array<{ id: string, name: string }>>([])
    const [colors, setColors] = useState<Array<{ id: string, name: string, hexCode: string }>>([])

    const [loadingData, setLoadingData] = useState(true)

    const isEdit = !!initialData
    const title = isEdit ? "Modifier le produit" : "Ajouter un produit"
    const action = isEdit ? "Enregistrer" : "Créer le produit"

    // Fetch categories and colors from database
    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch Categories
                const catResponse = await fetch('/api/admin/categories')
                const catResult = await catResponse.json()
                if (catResult.success && catResult.data) {
                    setCategories(catResult.data)
                }

                // Fetch Colors
                const colorsResult = await getColors()
                if (colorsResult.success && colorsResult.colors) {
                    setColors(colorsResult.colors)
                }
            } catch (error) {
                console.error('Failed to fetch data:', error)
            } finally {
                setLoadingData(false)
            }
        }
        fetchData()
    }, [])

    const defaultValues = initialData ? {
        ...initialData,
        price: parseFloat(String(initialData.price)),
        compareAtPrice: initialData.compareAtPrice ? parseFloat(String(initialData.compareAtPrice)) : 0,
        images: initialData.images || [],
        category: initialData.category || "",
        isFreeShipping: initialData.isFreeShipping || false,
        homepageLocation: (initialData as any).homepageLocation || "NONE",
        // Map initial colors array (objects) to IDs array
        colors: initialData.colors ? initialData.colors.map((c: any) => c.id) : [],
        // Map initial sizes array (objects) to Names array
        sizes: (initialData as any).sizes ? (initialData as any).sizes.map((s: any) => s.name) : [],
    } : {
        name: "",
        description: "",
        price: 0,
        compareAtPrice: 0,
        stock: 0,
        category: "",
        images: [],
        status: "active",
        isFeatured: false,
        isNewArrival: false,
        isFreeShipping: false,
        homepageLocation: "NONE",
        colors: [],
        sizes: [],
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

        // Pass colors as JSON string of IDs
        formData.append("colors", JSON.stringify(values.colors))

        // Pass sizes as JSON string of IDs
        formData.append("sizes", JSON.stringify(values.sizes))

        formData.append("status", values.status)

        formData.append("isFeatured", values.isFeatured ? "on" : "off")
        formData.append("isNewArrival", values.isNewArrival ? "on" : "off")
        formData.append("isFreeShipping", values.isFreeShipping ? "on" : "off")
        formData.append("homepageLocation", values.homepageLocation || "NONE")

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

    // Handle Color Toggle
    const toggleColor = (colorId: string) => {
        const currentColors = form.getValues("colors") || []
        const newColors = currentColors.includes(colorId)
            ? currentColors.filter(id => id !== colorId)
            : [...currentColors, colorId]

        form.setValue("colors", newColors, { shouldDirty: true })
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
                                Le formulaire contient des erreurs.
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
                                                        placeholder="Description..."
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

                            {/* Colors Section */}
                            <Card className="bg-white border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle>Couleurs Disponibles</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="colors"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                                                    {loadingData ? (
                                                        <p className="text-sm text-gray-500 col-span-3">Chargement des couleurs...</p>
                                                    ) : colors.length === 0 ? (
                                                        <div className="col-span-full text-sm text-gray-500">
                                                            Aucune couleur disponible. Ajoutez-en dans les Réglages.
                                                        </div>
                                                    ) : colors.map((color) => {
                                                        const isSelected = (field.value || []).includes(color.id)
                                                        return (
                                                            <div
                                                                key={color.id}
                                                                onClick={() => toggleColor(color.id)}
                                                                className={`
                                                                    cursor-pointer border rounded-lg p-2 flex flex-col items-center gap-2 transition-all
                                                                    ${isSelected ? 'border-black bg-black/5 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}
                                                                `}
                                                            >
                                                                <div
                                                                    className="w-6 h-6 rounded-full border border-black/10"
                                                                    style={{ backgroundColor: color.hexCode }}
                                                                />
                                                                <span className="text-xs font-medium text-center truncate w-full">{color.name}</span>
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            {/* Sizes Section - INLINE CREATION */}
                            <Card className="bg-white border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle>Tailles Disponibles</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="sizes"
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="space-y-3">
                                                    <div className="flex gap-2">
                                                        <Input
                                                            placeholder="Ajouter une taille (ex: XL, 40)..."
                                                            onKeyDown={(e) => {
                                                                if (e.key === 'Enter') {
                                                                    e.preventDefault();
                                                                    const val = e.currentTarget.value.trim().toUpperCase();
                                                                    if (val && !field.value.includes(val)) {
                                                                        field.onChange([...(field.value || []), val]);
                                                                        e.currentTarget.value = "";
                                                                    }
                                                                }
                                                            }}
                                                        />
                                                    </div>

                                                    <div className="flex flex-wrap gap-2">
                                                        {(field.value || []).map((size: string) => (
                                                            <div
                                                                key={size}
                                                                className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                                                            >
                                                                {size}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => field.onChange(field.value.filter((s: string) => s !== size))}
                                                                    className="hover:text-red-300"
                                                                >
                                                                    <Trash className="h-3 w-3" />
                                                                </button>
                                                            </div>
                                                        ))}
                                                        {(field.value || []).length === 0 && (
                                                            <p className="text-sm text-gray-400 italic">Aucune taille sélectionnée.</p>
                                                        )}
                                                    </div>
                                                </div>
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
                                                        {loadingData ? (
                                                            <SelectItem value="_loading" disabled>Chargement...</SelectItem>
                                                        ) : categories.length === 0 ? (
                                                            <SelectItem value="_empty" disabled>Aucune catégorie (Allez dans Réglages)</SelectItem>
                                                        ) : (
                                                            categories.map((cat) => (
                                                                <SelectItem key={cat.id} value={cat.name}>
                                                                    {cat.name}
                                                                </SelectItem>
                                                            ))
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                            </Card>

                            <Card className="bg-white border-border shadow-sm">
                                <CardHeader>
                                    <CardTitle>Emplacement sur l'Accueil</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name="homepageLocation"
                                        render={({ field }) => (
                                            <FormItem>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Choisir..." />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="NONE">Aucun (Par défaut)</SelectItem>
                                                        <SelectItem value="ESSENTIALS">NOS ESSENTIELS</SelectItem>
                                                        <SelectItem value="EDITORIAL">VESTIAIRE MASCULIN</SelectItem>
                                                        <SelectItem value="NEW_IN">NEW IN</SelectItem>
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