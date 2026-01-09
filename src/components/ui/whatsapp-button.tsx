"use client"

import Link from "next/link"
import { Phone, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function WhatsAppButton() {
    const [isVisible, setIsVisible] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false) // Start hidden

    useEffect(() => {
        // Show button after a small delay
        const timer = setTimeout(() => setIsVisible(true), 1500)

        // Show tooltip a bit later to grab attention
        const tooltipTimer = setTimeout(() => setShowTooltip(true), 3000)

        // Make button bounce periodically
        const bounceInterval = setInterval(() => {
            const btn = document.getElementById('whatsapp-btn')
            if (btn) {
                btn.classList.add('animate-bounce')
                setTimeout(() => btn.classList.remove('animate-bounce'), 2000)
            }
        }, 10000)

        return () => {
            clearTimeout(timer)
            clearTimeout(tooltipTimer)
            clearInterval(bounceInterval)
        }
    }, [])

    if (!isVisible) return null

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">

            {/* Tooltip Message */}
            <div
                className={cn(
                    "bg-white shadow-lg rounded-lg p-3 max-w-[200px] text-sm text-foreground relative transition-all duration-500 transform origin-bottom-right mb-2",
                    showTooltip ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-4 pointer-events-none"
                )}
            >
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        setShowTooltip(false)
                    }}
                    className="absolute -top-2 -left-2 bg-muted rounded-full p-0.5 hover:bg-muted-foreground/20 text-muted-foreground"
                >
                    <X className="w-3 h-3" />
                </button>
                <p className="font-medium leading-tight">Besoin d'aide ? <br /><span className="text-muted-foreground font-normal">Discutez avec nous !</span></p>
                {/* Arrow */}
                <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45" />
            </div>

            {/* Button */}
            <Link
                href="https://wa.me/212631378800" // Updated to correct IDMISK number
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-btn"
                className="relative bg-[#25D366] hover:bg-[#20bd5a] text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
                aria-label="Contact support on WhatsApp"
            >
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-background animate-pulse">
                    1
                </div>

                <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6 fill-white stroke-none"
                >
                    <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.197.295-.771.964-.944 1.162-.175.195-.349.21-.646.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
            </Link>
        </div>
    )
}
