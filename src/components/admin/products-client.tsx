"use client"

import { useState } from "react"
import { Trash, RefreshCw, ArrowUpDown, ImageOff, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"
import { deleteProduct } from "@/actions/products"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

// 1. Ha ch-chkel d-Produit kifach kay-ji mn Server
export type Product = {
    id: string
    name: string
    price: number
    category: string
    images: string | string[]
    isFeatured: boolean
    createdAt: Date
}

interface ProductsClientProps {
    initialProducts: Product[]
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
    const router = useRouter()

    const handleDelete = async (id: string) => {
        if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) return
        try {
            await deleteProduct(id)
            router.refresh()
        } catch (error) {
            alert("Erreur lors de la suppression")
        }
    }

    const columns: ColumnDef<Product>[] = [
        {
            accessorKey: "images",
            header: "Image",
            cell: ({ row }) => {
                const images = row.original.images
                let imageUrl = ""

                // 2. Hna kan-3aljo t-tsawer kifma kanou (Array awla String)
                if (Array.isArray(images) && images.length > 0) {
                    imageUrl = images[0]
                } else if (typeof images === 'string') {
                    imageUrl = images.split(',')[0]
                }

                return (
                    <div className="relative h-12 w-12 rounded overflow-hidden bg-muted border">
                        {imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={imageUrl}
                                alt={row.original.name}
                                className="object-cover w-full h-full"
                            />
                        ) : (
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                <ImageOff className="h-4 w-4" />
                            </div>
                        )}
                    </div>
                )
            }
        },
        {
            accessorKey: "name",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Nom
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                )
            },
        },
        {
            accessorKey: "category",
            header: "Catégorie",
            cell: ({ row }) => {
                const category = row.original.category

                // 3. 🚨 HNA KAN L-MOJRIM! Daba zdt Categories Jdad
                const validCategories = [
                    // Qdam
                    "Hijabs", "Khimars", "Packs", "Accessoires",
                    // Jdad (Unified)
                    "Hijab Soie de Médine", "Hijab Jersey Luxe", "Hijab Crêpe Premium", "Hijab Mousseline",
                    "Khimar Simple", "Khimar 3 Voiles",
                    "Pack Exclusif", "Nouveauté", "Best Seller"
                ]

                const isLegacy = !validCategories.includes(category)

                return (
                    <div className="flex items-center gap-2">
                        <span className={isLegacy ? "text-orange-600 font-medium" : "text-gray-900 font-medium"}>
                            {category}
                        </span>
                        {isLegacy && (
                            <span className="text-[10px] bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded uppercase font-bold">
                                Legacy
                            </span>
                        )}
                    </div>
                )
            }
        },
        {
            accessorKey: "price",
            header: "Prix",
            cell: ({ row }) => {
                const price = parseFloat(row.getValue("price"))
                return <div className="font-medium">{price} DH</div>
            }
        },
        {
            accessorKey: "isFeatured",
            header: "Best Seller",
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.original.isFeatured ? "★" : ""}
                </div>
            )
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const product = row.original
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/admin/products/${product.id}`)}>
                            <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                            <Trash className="h-4 w-4" />
                        </Button>
                    </div>
                )
            }
        }
    ]

    return (
        <div className="space-y-10 max-w-6xl mx-auto pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Gestion des Produits</h1>
                <Button variant="outline" size="sm" onClick={() => router.refresh()}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Rafraîchir
                </Button>
            </div>

            {/* SECTION 1: ADD PRODUCT FORM */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-bold">Ajouter un produit</h2>
                    <span className="text-muted-foreground text-sm uppercase tracking-wider bg-muted px-2 py-0.5 rounded">Nouveau</span>
                </div>
                {/* 4. Hna kan-3iyyto 3la l-Formulaire li sll7ti qbila */}
                <ProductForm />
            </div>

            {/* SEPARATOR */}
            <Separator className="my-8" />

            {/* SECTION 2: PRODUCT LIST */}
            <div className="bg-white p-6 rounded-lg shadow-sm border space-y-4">
                <h2 className="text-2xl font-bold">Liste des Produits</h2>
                <DataTable columns={columns} data={initialProducts} searchKey="name" />
            </div>
        </div>
    )
}