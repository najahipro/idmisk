export type ProductType = 'single' | 'pack';

export interface Product {
    id: string;
    title: string;
    price: string;
    priceNum: number;
    type: ProductType;
    image: string;
    videoUrl?: string;
    colors?: { name: string; hex: string }[];
    isNew?: boolean;
    description?: string;
    affiliateEnabled: boolean;
    showOnHome?: boolean;
    isNewArrival?: boolean;
    originalCategory?: string; // For Admin display
    salesCount?: number;
    showSalesCount?: boolean;
    isFreeShipping?: boolean;
    rating?: number; // 0-5
}
