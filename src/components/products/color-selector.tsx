"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { useState } from "react"

interface ColorSelectorProps {
    options: string // Comma separated string e.g. "Rouge, Noir, Blanc"
}

// Map common French color names to Hex
const COLOR_MAP: Record<string, string> = {
    "noir": "#000000",
    "black": "#000000",
    "blanc": "#FFFFFF",
    "white": "#FFFFFF",
    "rouge": "#EF4444",
    "red": "#EF4444",
    "bleu": "#3B82F6",
    "blue": "#3B82F6",
    "bleu clair": "#93C5FD",
    "bleu ciel": "#E0F2FE",
    "bleu marine": "#1E3A8A",
    "vert": "#22C55E",
    "green": "#22C55E",
    "vert olive": "#84CC16",
    "kaki": "#57534E",
    "jaune": "#EAB308",
    "yellow": "#EAB308",
    "orange": "#F97316",
    "rose": "#EC4899",
    "pink": "#EC4899",
    "rose poudré": "#FDF2F8",
    "violet": "#8B5CF6",
    "purple": "#8B5CF6",
    "mauve": "#D8B4FE",
    "gris": "#6B7280",
    "grey": "#6B7280",
    "beige": "#F5F5DC",
    "nude": "#E7D5C9",
    "marron": "#78350F",
    "brown": "#78350F",
    "camel": "#D97706",
    "bordeaux": "#7F1D1D",
    "taupe": "#8B8589",
    "chocolat": "#3E2723",
    "crème": "#FFFDD0",
    "doré": "#FFD700",
    "argent": "#C0C0C0",
}

export function ColorSelector({ options }: ColorSelectorProps) {
    // Parse options
    const colors = options ? options.split(",").map(c => c.trim()).filter(Boolean) : []
    const [selectedColor, setSelectedColor] = useState<string | null>(colors[0] || null)

    if (colors.length === 0) return null

    return (
        <div className="space-y-3">
            <span className="text-sm font-medium text-gray-900">
                Couleur: <span className="text-muted-foreground ml-1">{selectedColor}</span>
            </span>
            <div className="flex flex-wrap gap-2">
                {colors.map((colorName) => {
                    const hex = COLOR_MAP[colorName.toLowerCase()]

                    return (
                        <button
                            key={colorName}
                            onClick={() => setSelectedColor(colorName)}
                            className={cn(
                                "group relative w-10 h-10 rounded-full flex items-center justify-center transition-all",
                                selectedColor === colorName
                                    ? "ring-2 ring-offset-2 ring-black scale-110"
                                    : "ring-1 ring-transparent hover:ring-gray-300 hover:scale-105"
                            )}
                            title={colorName}
                        >
                            {hex ? (
                                <span
                                    className={cn(
                                        "w-full h-full rounded-full border border-gray-200 shadow-sm",
                                        hex.toLowerCase() === "#ffffff" ? "bg-white" : ""
                                    )}
                                    style={{ backgroundColor: hex }}
                                />
                            ) : (
                                // Fallback for unknown colors: Show first 2 letters
                                <span className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 uppercase border border-gray-200">
                                    {colorName.slice(0, 2)}
                                </span>
                            )}

                            {/* Checkmark for selection */}
                            {selectedColor === colorName && (
                                <span className={cn(
                                    "absolute inset-0 flex items-center justify-center pointer-events-none",
                                    hex && ["#ffffff", "#f5f5dc", "#fffdd0"].includes(hex.toLowerCase()) ? "text-black" : "text-white"
                                )}>
                                    <Check className="w-4 h-4 drop-shadow-sm" />
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
