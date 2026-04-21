import { motion } from "framer-motion";
import { Truck, Package, Landmark } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function ServicesSection() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Truck,
      titleKey: "services.logistics.title",
      descKey: "services.logistics.desc",
      tariffKey: "services.logistics.tariff",
    },
    {
      icon: Package,
      titleKey: "services.wholesale.title",
      descKey: "services.wholesale.desc",
      tariffKey: "services.wholesale.tariff",
    },
    {
      icon: Landmark,
      titleKey: "services.finance.title",
      descKey: "services.finance.desc",
      tariffKey: "services.finance.tariff",
    },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <motion.span custom={0} variants={fadeUp} className="text-primary text-sm tracking-widest uppercase font-medium">
            {t("services.eyebrow")}
          </motion.span>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold mt-3 text-foreground">
            {t("services.title")}
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-muted-foreground mt-4 text-base">
            {t("services.intro")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                custom={i + 2}
                variants={fadeUp}
                className="glass rounded-xl p-8 group hover:border-primary/30 transition-all duration-300 flex flex-col"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {t(service.descKey)}
                </p>
                <div className="pt-4 border-t border-border/50">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Tariff
                  </div>
                  <div className="text-sm font-medium text-gold-gradient">
                    {t(service.tariffKey)}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
