import { LanguageProvider } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import GlobalReachSection from "@/components/GlobalReachSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen gold-spray">
        <Header />
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GlobalReachSection />
        <ContactSection />
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default Index;
