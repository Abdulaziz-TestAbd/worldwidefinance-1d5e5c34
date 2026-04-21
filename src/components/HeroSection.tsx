import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

export default function HeroSection() {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Decorative grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(hsla(210, 20%, 92%, 0.1) 1px, transparent 1px), linear-gradient(90deg, hsla(210, 20%, 92%, 0.1) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/10 blur-[100px] animate-pulse" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 pt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs text-muted-foreground mb-8 tracking-widest uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            {t("hero.badge")}
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6 text-foreground">
            {t("hero.headline")}
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            {t("hero.sub")}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild variant="hero" size="lg" className="text-base px-8 py-6">
              <a href="#contact">
                {t("hero.cta")}
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
            <Button asChild variant="glass" size="lg" className="text-base px-8 py-6">
              <a href="#services">{t("nav.services")}</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Bottom fade line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
    </section>
  );
}
