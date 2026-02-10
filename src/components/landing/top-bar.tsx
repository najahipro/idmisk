"use client"

import { Instagram } from "lucide-react"
import { useEffect, useState } from "react"

interface TopBarProps {
    messages?: string[]
}

export function TopBar({ messages = [] }: TopBarProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isVisible, setIsVisible] = useState(true)

    // Filter out empty messages
    const validMessages = messages.filter(msg => msg && msg.trim() !== "")

    // Auto-rotate messages every 6 seconds
    useEffect(() => {
        if (validMessages.length <= 1) return

        const interval = setInterval(() => {
            setIsVisible(false)

            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % validMessages.length)
                setIsVisible(true)
            }, 300) // Wait for fade out before changing message
        }, 6000)

        return () => clearInterval(interval)
    }, [validMessages.length])

    // Hide bar if no messages
    if (validMessages.length === 0) {
        return null
    }

    return (
        <div className="w-full bg-black text-white text-xs py-2 px-4 border-b border-white/10">
            <div className="container mx-auto flex justify-between items-center font-light tracking-wide">

                {/* Left: Social Icons (Hidden on mobile) */}
                <div className="hidden md:flex items-center gap-5">
                    <a href="https://www.instagram.com/idmisk.ma/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors hover:scale-110 duration-200">
                        <Instagram className="h-3.5 w-3.5 stroke-[1.5]" />
                        <span className="sr-only">Instagram</span>
                    </a>

                    <a href="https://www.tiktok.com/@idmisk7" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors hover:scale-110 duration-200">
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                        <span className="sr-only">TikTok</span>
                    </a>
                    <a href="https://www.pinterest.com/idmisk/_profile/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors hover:scale-110 duration-200">
                        <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.399.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.173 0 7.41 2.967 7.41 6.93 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z" /></svg>
                        <span className="sr-only">Pinterest</span>
                    </a>
                </div>

                {/* Center: Rotating Promo Messages */}
                <div className="flex-1 text-center overflow-hidden">
                    <span
                        className={`font-light tracking-wide inline-block transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                        📦 {validMessages[currentIndex]}
                    </span>
                </div>

                {/* Right: Empty for balance */}
                <div className="hidden md:flex items-center gap-3 w-[120px] justify-end">
                    {/* Space reserved for future tools if needed */}
                </div>
            </div>
        </div>
    )
}
