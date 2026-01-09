import Image from "next/image";

export function GallerySection() {
    const images = Array.from({ length: 6 }).map((_, i) => ({
        id: i,
        alt: `Modèle Hijab IDMISK ${i + 1}`,
        src: `/placeholder-${i + 1}.jpg`, // In a real app, these would be real paths
    }));

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-foreground font-serif">
                        Nos Modèles en Détail
                    </h2>
                    <p className="mt-4 text-foreground/70 md:text-lg max-w-2xl mx-auto">
                        Découvrez la finesse de notre tissu crêpe premium sous toutes ses coutures.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {images.map((image, index) => (
                        <div
                            key={image.id}
                            className={`relative overflow-hidden rounded-xl bg-muted/20 aspect-[3/4] group ${index === 0 || index === 3 ? "md:row-span-2 md:aspect-[3/8]" : ""
                                }`}
                        >
                            <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary/10 group-hover:bg-secondary/20 transition-colors">
                                {/* Placeholder Content */}
                                <div className="text-center p-4">
                                    <span className="text-4xl block mb-2">📸</span>
                                    <span className="text-sm font-medium">{image.alt}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
