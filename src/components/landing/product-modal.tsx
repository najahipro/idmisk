import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Image from "next/image";

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        name: string;
        price: string;
        description: string;
        features?: string[];
    } | null;
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
    if (!product) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0 h-full">
                    {/* Left Side: Image */}
                    <div className="relative h-[300px] md:h-full bg-muted">
                        <div className="absolute inset-0 flex items-center justify-center text-4xl text-muted-foreground bg-secondary/10">
                            📦
                        </div>
                        {/* <Image src="/placeholder.jpg" alt={product.name} fill className="object-cover" /> */}
                    </div>

                    {/* Right Side: Details */}
                    <div className="p-6 md:p-8 flex flex-col h-full">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-2xl font-bold font-serif">{product.name}</DialogTitle>
                            <DialogDescription className="text-lg font-medium text-primary mt-2">
                                {product.price}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 flex-1">
                            <div>
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">Description</h4>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {product.description}. Profitez de notre qualité premium éprouvée par des milliers de clientes satisfaites.
                                </p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">Détails</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center text-sm">
                                        <span className="w-24 font-medium text-foreground/70">Tissu:</span>
                                        <span>Crêpe Premium</span>
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="w-24 font-medium text-foreground/70">Taille:</span>
                                        <span>Standard (70x180cm)</span>
                                    </li>
                                    <li className="flex items-center text-sm">
                                        <span className="w-24 font-medium text-foreground/70">Origine:</span>
                                        <span>Importation Turquie</span>
                                    </li>
                                </ul>
                            </div>

                            {product.features && (
                                <div>
                                    <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">Inclus</h4>
                                    <ul className="space-y-1">
                                        {product.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-center text-sm text-foreground/80">
                                                <Check className="h-3 w-3 mr-2 text-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t">
                            <Button className="w-full h-12 text-base font-bold bg-primary hover:bg-primary/90">
                                Confirmer la Commande
                            </Button>
                            <p className="text-xs text-center text-muted-foreground mt-3">
                                Livraison gratuite sous 24-48h
                            </p>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
