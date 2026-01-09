
import { ProductCard } from "./product-card"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Product } from "@/types/product"
import { useTranslation } from "react-i18next"

interface ProductGridProps {
    products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
    const { t } = useTranslation()

    return (
        <section className="container mx-auto px-4 md:px-6 py-8" id="hijabs">
            <div className="flex flex-col items-center mb-6">
                <h2 className="text-2xl font-light text-black text-center uppercase tracking-wide">
                    {t("nav.shop")}
                </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="mt-16 text-center">
                <Link href="/products">
                    <Button className="h-12 px-8 rounded-full text-lg shadow-md hover:shadow-lg transition-all">
                        {t("common.seeCollection")}
                    </Button>
                </Link>
            </div>
        </section>
    )
}