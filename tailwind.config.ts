import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ["var(--font-inter)"],
                serif: ["var(--font-playfair)"],
                arabic: ["var(--font-arabic)"], // Custom key for Arabic font
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                primary: {
                    DEFAULT: "var(--primary)",
                    foreground: "#ffffff",
                },
                secondary: {
                    DEFAULT: "var(--secondary)",
                    foreground: "#ffffff",
                },
            },
        },
    },
    plugins: [],
};
export default config;