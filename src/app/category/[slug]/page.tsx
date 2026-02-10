
import { db } from "@/lib/db";
import { Product } from "@/types/product";
import { getMainImage } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/landing/product-card";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

interface CategoryPageProps {
    params: {
        slug: string;
    };
}

// Metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const slug = params.slug;

    // Attempt to find category
    const category = await db.category.findUnique({
        where: { slug: slug },
    });

    if (!category) {
        return {
            title: "Catégorie Introuvable | IDMISK",
        };
    }

    return {
        title: `${category.name} | IDMISK`,
        description: `Découvrez notre collection ${category.name}.`,
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = params;

    // 1. Find the Category
    const category = await db.category.findUnique({
        where: { slug },
    });

    if (!category) {
        // Fallback: Check if user manually typed a category that exists as a string in Product but not in Category table?
        // Or normalized check?
        // For now, strict slug match is best.
        // If not found, show friendly message or notFound()
        // The user requested: "friendly 'Category Not Found' message (NOT a generic 404)"
        // So we return a UI, not notFound().
        return (
            <div className="container mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-4xl font-serif mb-4">Catégorie Introuvable</h1>
                <p className="text-gray-500 mb-8">Nous ne trouvons pas la catégorie "{slug}".</p>
                <Link href="/products">
                    <button className="bg-black text-white px-8 py-3 uppercase text-sm font-bold tracking-widest hover:bg-gray-800 transition-colors">
                        Voir tous nos produits
                    </button>
                </Link>
            </div>
        );
    }

    // 2. Fetch Products
    // We match Product.category (String) with Category.name (String) OR Product.customCategorySlug
    const productsData = await db.product.findMany({
        where: {
            OR: [
                { category: category.name },
                { customCategorySlug: slug }
            ],
            status: "active",
        },
        orderBy: { createdAt: "desc" },
        include: { colors: true },
    });

    // 3. Transform to UI Product
    const mapToUiProduct = (p: any): Product => {
        let imagesArray: string[] = []
        if (p.images) {
            try {
                imagesArray = typeof p.images === 'string' ? JSON.parse(p.images) : p.images
            } catch {
                if (typeof p.images === 'string') {
                    imagesArray = p.images.split(',').map((img: string) => img.trim())
                }
            }
        }

        return {
            id: p.id,
            title: p.title || p.name,
            price: typeof p.price === 'string' ? p.price : `${p.price} DH`,
            priceNum: p.priceNum || p.price,
            type: p.category === 'pack' ? 'pack' : 'single',
            image: p.image || getMainImage(p.images),
            images: imagesArray,
            isNew: p.isNewArrival,
            affiliateEnabled: false,
            salesCount: 0,
            showSalesCount: false,
            rating: 0,
            colors: p.colors ? p.colors.map((c: any) => ({ name: c.name, hexCode: c.hexCode })) : [],
            category: p.category,
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        }
    };

    const products = productsData.map(mapToUiProduct);

    return (
        <div className="min-h-screen bg-background pt-24 pb-20">
            <div className="container mx-auto px-4 md:px-12">
                {/* Header */}
                <div className="mb-10 text-center md:text-left border-b pb-6">
                    <Link href="/" className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-4 transition-colors">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Retour à l'accueil
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-heading font-bold uppercase tracking-wide">
                        {category.name}
                    </h1>
                    <p className="text-gray-500 mt-2">
                        {products.length} produit{products.length > 1 ? "s" : ""} trouvé{products.length > 1 ? "s" : ""}
                    </p>
                </div>

                {/* Product Grid */}
                {products.length === 0 ? (
                    <div className="py-20 text-center">
                        <p className="text-xl text-gray-400 font-light italic mb-6">
                            Cette collection est vide pour le moment.
                        </p>
                        <Link href="/products">
                            <span className="border-b border-black pb-1 text-sm font-bold uppercase tracking-widest cursor-pointer hover:opacity-70">
                                Voir toutes les collections
                            </span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-8 md:gap-y-12">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
