import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function GlobalReachSection() {
  const { t } = useLanguage();

  const locations = [
    { key: "poland" },
    { key: "germany" },
    { key: "europe" },
  ];

  return (
    <section id="reach" className="py-24 section-gradient relative overflow-hidden">
      {/* Stylized map background */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg viewBox="0 0 800 400" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <path d="M200,100 Q300,50 400,100 T600,80 Q700,120 750,200 T600,300 Q500,350 400,300 T200,320 Q100,280 80,200 T200,100Z" fill="currentColor" className="text-foreground" />
          <circle cx="420" cy="160" r="6" fill="hsl(42, 65%, 55%)" opacity="0.8" />
          <circle cx="380" cy="180" r="6" fill="hsl(42, 65%, 55%)" opacity="0.8" />
          <circle cx="350" cy="200" r="4" fill="hsl(42, 65%, 55%)" opacity="0.5" />
          <circle cx="300" cy="170" r="4" fill="hsl(42, 65%, 55%)" opacity="0.5" />
          <circle cx="480" cy="190" r="3" fill="hsl(42, 65%, 55%)" opacity="0.4" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span custom={0} variants={fadeUp} className="text-primary text-sm tracking-widest uppercase font-medium">
            {t("reach.eyebrow")}
          </motion.span>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold mt-3 text-foreground">
            {t("reach.title")}
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            {t("reach.sub")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {locations.map((loc, i) => (
            <motion.div
              key={loc.key}
              custom={i + 3}
              variants={fadeUp}
              className="glass rounded-xl p-8 text-center group hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-3">
                {t(`reach.${loc.key}`)}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(`reach.${loc.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
