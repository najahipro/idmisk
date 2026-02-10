import { db } from "@/lib/db"
import { notFound } from "next/navigation"
import ProductDetails from "@/components/products/product-details"

export const dynamic = "force-dynamic";


interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: ProductPageProps) {
    const { id } = await params

    let product = null;
    let uiProduct: any = null; // Declare uiProduct here
    let relatedProducts: any[] = [];

    try {
        // Fetch main product
        product = await db.product.findUnique({
            where: { id },
            include: { colors: true }
        });

        if (!product) {
            notFound();
        }

        // Transform to UI Product
        let imagesArray: string[] = []
        if (product.images) {
            try {
                imagesArray = typeof product.images === 'string' ? JSON.parse(product.images) : product.images
            } catch {
                if (typeof product.images === 'string') {
                    imagesArray = product.images.split(',').map((img: string) => img.trim())
                }
            }
        }

        uiProduct = {
            id: product.id,
            title: product.name,
            price: product.price.toString() + " DH",
            priceNum: product.price,
            type: product.category === 'pack' ? 'pack' : 'single',
            image: imagesArray[0] || "/placeholder.jpg",
            images: imagesArray,
            description: product.description,
            isNew: product.isNewArrival,
            affiliateEnabled: false,
            salesCount: 0,
            showSalesCount: false,
            rating: 0,
            colors: product.colors ? product.colors.map(c => ({ name: c.name, hexCode: c.hexCode })) : [],
            category: product.category,
            sizes: ['S', 'M', 'L', 'XL', 'XXL']
        };

    } catch (err) {
        console.error("DB Fetch Error (Product: " + id + "):", err);
        // Fallback: If DB is unreachable, we can't show the product, so we show 404
        return notFound();
    }

    // If product was not found inside the try block, notFound() would have been called.
    // So, if we reach here, product (and uiProduct) must exist.

    try {
        // Fetch related products (e.g. same category, excluding current)
        relatedProducts = await db.product.findMany({
            where: {
                category: product.category, // Use the raw product for category
                NOT: { id: product.id } // Use the raw product's ID
            },
            take: 4
        });
    } catch (err) {
        console.error("DB Fetch Error (Related Products):", err);
    }

    return (
        <ProductDetails
            product={uiProduct} // Pass the transformed uiProduct
            relatedProducts={relatedProducts}
        />
    )
}
