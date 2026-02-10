'use client';

export default function cloudinaryLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
    if (!src.includes('res.cloudinary.com')) {
        return src;
    }
    const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`];
    // Remove existing upload/ prefix if present to avoid double stacking if logic is flawed, 
    // but standard cloudinary url is /upload/v1234/id. 
    // We want to insert params after /upload/.
    // Regex replace is safer.
    return src.replace(/\/upload\//, `/upload/${params.join(',')}/`);
}
