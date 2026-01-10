import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getMainImage(images: string | string[] | null | undefined): string {
    if (!images) return ""

    if (Array.isArray(images)) {
        return images[0] || ""
    }

    // Handle comma-separated list or JSON string
    if (images.trim().startsWith("[")) {
        try {
            const parsed = JSON.parse(images);
            if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
        } catch (e) { }
    }

    const defaults = images.split(",")
    return defaults[0].trim() || ""
}
