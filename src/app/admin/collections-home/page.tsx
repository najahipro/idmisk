import { CollectionManager } from "@/components/admin/collection-manager"
import { getHomeCollections } from "@/actions/collections"

export default async function CollectionsHomePage() {
    const collections = await getHomeCollections()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">Collections (Accueil)</h1>
            </div>

            <p className="text-muted-foreground">
                Gérez les 4 images de la grille d'inspiration sur la page d'accueil.
            </p>

            <CollectionManager initialCollections={collections} />
        </div>
    )
}
