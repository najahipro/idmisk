import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

export function HeroSection() {
    const { t } = useTranslation();

    return (
        <section className="relative bg-[#fdfbf7] py-24 md:py-32 overflow-hidden border-b border-border/40">
            <div className="container mx-auto px-4 md:px-6 text-center z-10 relative">
                <span className="inline-block mb-6 px-3 py-1 rounded-full bg-secondary/20 text-secondary-foreground text-xs font-semibold tracking-wider uppercase">
                    Collection 2026
                </span>
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.1]" suppressHydrationWarning>
                    {t("hero.title")}
                </h1>
                <p className="mt-4 max-w-[600px] mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed" suppressHydrationWarning>
                    {t("hero.subtitle")}
                </p>
                <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-primary text-white hover:bg-primary/90 rounded-none px-8 h-12 text-base uppercase tracking-wider">
                        <span suppressHydrationWarning>{t("hero.cta")}</span>
                    </Button>
                    <Button variant="outline" size="lg" className="rounded-none px-8 h-12 text-base uppercase tracking-wider border-foreground/20 hover:bg-secondary/10">
                        <span suppressHydrationWarning>{t("footer.about")}</span>
                    </Button>
                </div>
            </div>

            {/* Decorative Background Element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
        </section>
    );
}
