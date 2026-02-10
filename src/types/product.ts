export type ProductType = 'single' | 'pack';

export interface Product {
    id: string;
    title: string;
    price: string;
    priceNum: number;
    type: ProductType;
    image: string;
    images?: string[]; // Array of all product images for hover swap
    videoUrl?: string;
    colors?: { name: string; hexCode: string }[]; // Updated to match DB
    sizes?: string[]; // Added for filtering UI
    isNew?: boolean;
    description?: string;
    affiliateEnabled: boolean;
    showOnHome?: boolean;
    isNewArrival?: boolean;
    originalCategory?: string; // For Admin display
    collectionName?: string; // Fabric/Collection name (e.g., "Soie de Médine")
    salesCount?: number;
    showSalesCount?: boolean;
    isFreeShipping?: boolean;
    rating?: number; // 0-5
    customCategorySlug?: string;
    category?: string; // Main category for filtering
}
