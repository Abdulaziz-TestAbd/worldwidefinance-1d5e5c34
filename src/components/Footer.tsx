import { Linkedin, Twitter } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import logo from "@/assets/WorldWideFinance_logo.png";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <img src={logo} alt="World Wide Finance" className="h-8 w-auto" />
            <span className="font-display text-sm font-semibold text-foreground">
              World Wide Finance
            </span>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} World Wide Finance. {t("footer.rights")}
          </p>

          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
