import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

export default function ContactSection() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.span custom={0} variants={fadeUp} className="text-primary text-sm tracking-widest uppercase font-medium">
            Reach Out
          </motion.span>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold mt-3 text-foreground">
            {t("contact.title")}
          </motion.h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact info */}
          <motion.div custom={2} variants={fadeUp} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("footer.address")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("footer.phone")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t("footer.email")}</p>
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.form custom={3} variants={fadeUp} onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">{t("contact.name")}</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg glass text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">{t("contact.email")}</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg glass text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">{t("contact.message")}</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg glass text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                placeholder="How can we help you?"
              />
            </div>
            <Button variant="hero" size="lg" type="submit" className="w-full text-base">
              {submitted ? "✓ Sent!" : t("contact.send")}
              {!submitted && <Send className="w-4 h-4 ml-1" />}
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
