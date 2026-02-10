"use client"

import { useRef, useState } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface SingleImageUploadProps {
    value: string | null | undefined
    onChange: (value: string) => void
    label: string
    aspectRatio?: string
    height?: string
}

export function SingleImageUpload({
    value,
    onChange,
    label,
    aspectRatio = "aspect-video",
    height = "h-48"
}: SingleImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner une image (JPG, PNG, etc.)')
            return
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('L\'image est trop grande. Maximum 5MB.')
            return
        }

        setIsLoading(true)

        try {
            // Convert to Base64
            const reader = new FileReader()
            reader.onloadend = () => {
                const base64String = reader.result as string
                onChange(base64String)
                setIsLoading(false)
            }
            reader.onerror = () => {
                alert('Erreur lors de la lecture du fichier')
                setIsLoading(false)
            }
            reader.readAsDataURL(file)
        } catch (error) {
            console.error('Upload error:', error)
            alert('Erreur lors du téléchargement')
            setIsLoading(false)
        }
    }

    const handleRemove = () => {
        onChange('')
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            <div className={`relative ${aspectRatio} ${height} w-full border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:border-gray-400 transition-colors`}>
                {value ? (
                    <>
                        <Image
                            src={value}
                            alt={label}
                            fill
                            className="object-cover"
                        />
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg z-10"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </>
                ) : (
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isLoading}
                        className="w-full h-full flex flex-col items-center justify-center text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <Upload className="h-8 w-8 mb-2" />
                        <span className="text-sm font-medium">
                            {isLoading ? 'Chargement...' : 'Cliquer pour choisir une image'}
                        </span>
                        <span className="text-xs text-gray-400 mt-1">JPG, PNG (max 5MB)</span>
                    </button>
                )}
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    )
}
