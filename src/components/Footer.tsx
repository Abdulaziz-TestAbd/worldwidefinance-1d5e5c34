import { Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import logo from "@/assets/WorldWideFinance_logo.png";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="pt-16 pb-8 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="World Wide Finance" className="h-9 w-auto" />
              <span className="font-display text-base font-semibold text-foreground">
                World Wide <span className="text-gold-gradient">Finance</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("footer.legalName")}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              {t("footer.director")}
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-xs text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span>{t("footer.address")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span>{t("footer.phone")}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Mail className="w-4 h-4 text-primary shrink-0" />
              <a
                href={`mailto:${t("footer.email")}`}
                className="hover:text-primary transition-colors"
              >
                {t("footer.email")}
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="md:text-right">
            <div className="flex items-center gap-4 md:justify-end">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} World Wide Finance Sp. z o.o. — {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
