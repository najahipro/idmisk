"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const handleLanguageChange = (nextLocale: string) => {
        startTransition(() => {
            // Replace the current locale in the pathname with the new one
            // e.g., /fr/products -> /en/products
            const segments = pathname.split('/');
            segments[1] = nextLocale;
            const newPath = segments.join('/');

            router.replace(newPath);
        });
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 cursor-pointer hover:text-primary/70 transition-colors bg-transparent border-none outline-none disabled:opacity-50" disabled={isPending}>
                <span className="uppercase font-bold">{locale}</span>
                <ChevronDown className="h-3 w-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-xs bg-white z-[100] shadow-md border border-gray-200">
                <DropdownMenuItem onClick={() => handleLanguageChange("fr")} className="cursor-pointer hover:bg-gray-100 font-medium">
                    FR <span className="ml-2 text-muted-foreground">Français</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange("en")} className="cursor-pointer hover:bg-gray-100 font-medium">
                    EN <span className="ml-2 text-muted-foreground">English</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
