import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, Phone, MapPin, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/useLanguage";
import { supabase } from "@/integrations/supabase/client";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: "easeOut" },
  }),
};

const RECIPIENT_EMAIL = "info@worldwidefinances.com";

export default function ContactSection() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: { name, email, message },
      });
      if (error) throw error;
      if (data && (data as { error?: string }).error) throw new Error((data as { error: string }).error);

      setStatus("sent");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("Contact form error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <motion.span custom={0} variants={fadeUp} className="text-primary text-sm tracking-widest uppercase font-medium">
            {t("contact.eyebrow")}
          </motion.span>
          <motion.h2 custom={1} variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold mt-3 text-foreground">
            {t("contact.title")}
          </motion.h2>
          <motion.p custom={2} variants={fadeUp} className="text-muted-foreground mt-4 text-base">
            {t("contact.sub")}
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact info */}
          <motion.div custom={2} variants={fadeUp} className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                  {t("footer.legalName")}
                </p>
                <p className="text-sm text-foreground">{t("footer.address")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground">{t("footer.director")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-foreground">{t("footer.phone")}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <div>
                <a
                  href={`mailto:${RECIPIENT_EMAIL}`}
                  className="text-sm text-foreground hover:text-primary transition-colors"
                >
                  {RECIPIENT_EMAIL}
                </a>
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
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg glass text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("contact.namePlaceholder")}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">{t("contact.email")}</label>
              <input
                type="email"
                required
                maxLength={255}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg glass text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder={t("contact.emailPlaceholder")}
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground block mb-1.5">{t("contact.message")}</label>
              <textarea
                required
                rows={4}
                maxLength={1000}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg glass text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                placeholder={t("contact.messagePlaceholder")}
              />
            </div>
            <Button variant="hero" size="lg" type="submit" disabled={status === "sending"} className="w-full text-base">
              {status === "sending" && t("contact.sending")}
              {status === "sent" && t("contact.sent")}
              {status === "error" && t("contact.error")}
              {status === "idle" && (
                <>
                  {t("contact.send")}
                  <Send className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
