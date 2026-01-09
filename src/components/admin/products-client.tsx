"use client"

import { useState } from "react"
import { Trash, RefreshCw, MoreHorizontal, ArrowUpDown, ImageOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/components/admin/product-form"
import { deleteProduct } from "@/actions/products"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { getMainImage } from "@/lib/utils"
// import { Product } from "@prisma/client" // Ideally we import from prisma, but for now we define a compatible type or use any if prisma types aren't generated client side easily in this setup without running generate.
// Let's define a Shape that matches what we expect from the Server Action return.

export type Product = {
    id: string
    name: string
    price: number
    category: string
    images: string
    isFeatured: boolean
    createdAt: Date
}

interface ProductsClientProps {
    initialProducts: Product[]
}

export function ProductsClient({ initialProducts }: ProductsClientProps) {
    const router = useRouter()

    // We can rely on router.refresh() for updates, so purely local state isn't strictly needed for validity 
    // but useful for optimistic UI if we want. For now, let's keep it simple with router refresh.

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
                const image = row.original.images
                const imageUrl = getMainImage(image)

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
        },
        {
            accessorKey: "price",
            header: "Prix",
            cell: ({ row }) => {
                const price = parseFloat(row.getValue("price"))
                // Format currency could be imported but let's simple render
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
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(product.id)}>
                        <Trash className="h-4 w-4" />
                    </Button>
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
                <ProductForm />
            </div>

            {/* SEPARATOR */}
            <Separator className="my-8" />

            {/* SECTION 2: PRODUCT LIST */}
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Liste des Produits</h2>
                <DataTable columns={columns} data={initialProducts} searchKey="name" />
            </div>
        </div>
    )
}
