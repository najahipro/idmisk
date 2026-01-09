"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight, Play } from "lucide-react"

interface ProductGalleryProps {
    images: string // Comma separated URL string
}

export function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)

    // Parse images string to array
    const mediaList = images ? images.split(",").map(url => url.trim()).filter(Boolean) : []

    // If no images, show placeholder
    if (mediaList.length === 0) {
        return (
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100">
                <Image
                    src="/placeholder.jpg"
                    alt="No image"
                    fill
                    className="object-cover"
                />
            </div>
        )
    }

    const selectedMedia = mediaList[selectedIndex]
    const isVideo = (url: string) => url.match(/\.(mp4|webm)$/i) || url.includes("video")

    return (
        <div className="flex flex-col gap-4">
            {/* Main Viewer */}
            <div className="relative aspect-[4/5] md:aspect-square w-full rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-sm group">
                {isVideo(selectedMedia) ? (
                    <video
                        src={selectedMedia}
                        controls
                        className="w-full h-full object-cover"
                        poster={mediaList.find(url => !isVideo(url))} // Try to find an image as poster
                    />
                ) : (
                    <Image
                        src={selectedMedia}
                        alt={`Product image ${selectedIndex + 1}`}
                        fill
                        className="object-cover"
                        priority
                    />
                )}

                {/* Navigation Arrows (only if multiple) */}
                {mediaList.length > 1 && (
                    <>
                        <button
                            onClick={() => setSelectedIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronLeft className="w-5 h-5 text-gray-900" />
                        </button>
                        <button
                            onClick={() => setSelectedIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <ChevronRight className="w-5 h-5 text-gray-900" />
                        </button>
                    </>
                )}
            </div>

            {/* Thumbnails */}
            {mediaList.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {mediaList.map((url, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedIndex(index)}
                            className={cn(
                                "relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all",
                                selectedIndex === index
                                    ? "border-black ring-1 ring-black/10"
                                    : "border-transparent hover:border-gray-300"
                            )}
                        >
                            {isVideo(url) ? (
                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                    <Play className="w-6 h-6 text-gray-500 fill-current" />
                                </div>
                            ) : (
                                <Image
                                    src={url}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
