"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ImagePlus, Trash } from "lucide-react"
import Image from "next/image"
import Script from "next/script"
import { CldUploadWidget } from "next-cloudinary"

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string[]) => void
    onRemove: (value: string) => void
    onAdd?: (value: string) => void
    value: string[]
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    onAdd,
    value
}) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
        if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
            console.error("CRITIQUE: NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME est manquant dans .env")
            alert("Configuration manquante : Cloud Name introuvable. Vérifiez votre fichier .env")
        }
    }, [])

    const onUpload = (result: any) => {
        console.log("Cloudinary Upload Result (Full):", result)
        // Check for different event types just in case
        if (result.event !== "success") {
            console.log("Upload event was not success:", result.event)
            return;
        }

        // Robust check for URL
        // @ts-ignore
        const url = result?.info?.secure_url;

        console.log("Upload Success URL extracted:", url)

        if (!url) {
            console.error("CRITICAL: No secure_url found in result info")
            return
        }

        // 🚨 CRITICAL FIX: Check for duplicates BEFORE adding
        if (value.includes(url)) {
            console.warn("⚠️ Duplicate image detected, ignoring:", url)
            return
        }

        if (onAdd) {
            console.log("Calling onAdd with URL:", url)
            onAdd(url)
        } else {
            console.log("Calling onChange with new array:", [...value, url])
            onChange([...value, url])
        }
    };

    const onError = (error: any) => {
        console.error("Cloudinary Widget Error:", error);
        alert("Erreur du widget d'upload: " + (error.statusText || error.message || "Unknown error"));
    }

    if (!isMounted) {
        return null
    }

    return (
        <div>
            <Script
                src="https://widget.cloudinary.com/v2.0/global/all.js"
                strategy="lazyOnload"
                onLoad={() => console.log("Cloudinary Script Loaded via next/script")}
                onError={(e) => console.error("Cloudinary Script Failed to Load", e)}
            />
            <div className="mb-4 flex items-center gap-4 flex-wrap">
                {value.map((url) => {
                    const isVideo = url.match(/\.(mp4|webm|mov)$/i) || url.includes("video") || url.includes("fl_attachment");
                    return (
                        <div key={url} className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-gray-100 border">
                            <div className="z-10 absolute top-2 right-2">
                                <Button type="button" onClick={() => onRemove(url)} variant="destructive" size="icon">
                                    <Trash className="h-4 w-4" />
                                </Button>
                            </div>
                            {isVideo ? (
                                <video
                                    src={url}
                                    className="w-full h-full object-cover"
                                    controls={false}
                                // muted 
                                // autoPlay
                                // loop
                                // Previews usually static or simple
                                />
                            ) : (
                                <Image
                                    fill
                                    className="object-cover"
                                    alt="Image"
                                    src={url}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
            <CldUploadWidget
                uploadPreset="idmisk_preset"
                onSuccess={onUpload}
                onError={onError}
                options={{
                    maxFiles: 10,
                    sources: ['local', 'url', 'camera'],
                    resourceType: 'auto',
                    multiple: true
                }}
            >
                {(result) => {
                    const onClick = () => {
                        console.log("Cloudinary Widget Render Props:", result)
                        if (typeof result?.open === 'function') {
                            result.open()
                        } else {
                            console.error("Cloudinary Widget 'open' function is missing or invalid.", result)
                            alert("Erreur: Le widget de téléchargement n'est pas prêt. Veuillez recharger la page.")
                        }
                    }

                    return (
                        <Button
                            type="button"
                            disabled={disabled}
                            variant="secondary"
                            onClick={onClick}
                        >
                            <ImagePlus className="h-4 w-4 mr-2" />
                            Upload an Image
                        </Button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}
