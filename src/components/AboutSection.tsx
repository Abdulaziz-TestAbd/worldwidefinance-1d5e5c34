import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/useLanguage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export default function AboutSection() {
  const { t } = useLanguage();

  const stats = [
    { value: t("about.stat1.value"), label: t("about.stat1.label") },
    { value: t("about.stat2.value"), label: t("about.stat2.label") },
    { value: t("about.stat3.value"), label: t("about.stat3.label") },
  ];

  return (
    <section id="about" className="py-24 section-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div custom={0} variants={fadeUp} className="text-center mb-12">
            <span className="text-primary text-sm tracking-widest uppercase font-medium">Who We Are</span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold mt-3 text-foreground">
              {t("about.title")}
            </h2>
          </motion.div>

          <motion.p custom={1} variants={fadeUp} className="text-muted-foreground leading-relaxed text-lg mb-6 text-center">
            {t("about.p1")}
          </motion.p>
          <motion.p custom={2} variants={fadeUp} className="text-muted-foreground leading-relaxed text-lg mb-16 text-center">
            {t("about.p2")}
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                custom={i + 3}
                variants={fadeUp}
                className="glass rounded-xl p-8 text-center"
              >
                <div className="text-3xl font-display font-bold text-gold-gradient mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
