import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getMainImage(images: string | null | undefined): string {
    if (!images) return ""
    // Handle comma-separated list
    const defaults = images.split(",")
    return defaults[0].trim() || ""
}
