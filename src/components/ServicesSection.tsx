import { motion } from "framer-motion";
import { TrendingUp, BarChart3, PieChart, Shield, RefreshCw, Gem } from "lucide-react";
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
    { icon: TrendingUp, titleKey: "services.corporate.title", descKey: "services.corporate.desc" },
    { icon: BarChart3, titleKey: "services.investment.title", descKey: "services.investment.desc" },
    { icon: PieChart, titleKey: "services.market.title", descKey: "services.market.desc" },
    { icon: Shield, titleKey: "services.risk.title", descKey: "services.risk.desc" },
    { icon: RefreshCw, titleKey: "services.restructuring.title", descKey: "services.restructuring.desc" },
    { icon: Gem, titleKey: "services.wealth.title", descKey: "services.wealth.desc" },
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span custom={0} variants={fadeUp} className="text-primary text-sm tracking-widest uppercase font-medium">
            What We Do
          </motion.span>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold mt-3 text-foreground">
            {t("services.title")}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={i}
                custom={i + 2}
                variants={fadeUp}
                className="glass rounded-xl p-8 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">
                  {t(service.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t(service.descKey)}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
