import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import logo from '@/assets/logo.png';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import FeaturesSection from '@/components/landing/FeaturesSection';
import AboutSection from '@/components/landing/AboutSection';
import CareersSection from '@/components/landing/CareersSection';
import ContactSection from '@/components/landing/ContactSection';

const LandingPage = () => {
  const navigate = useNavigate();
  const ctaRef = useScrollReveal<HTMLElement>();
  const cta2Ref = useScrollReveal<HTMLElement>();

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <img
              src={logo}
              alt="AgroGenius AI"
              className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg border-4 border-primary/20"
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            AgroGenius AI
          </h1>

          <p className="text-lg md:text-xl font-medium text-primary mb-4">
            Your 24×7 Digital Krishi Guru
          </p>

          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            AI-powered guidance for smarter, sustainable farming
          </p>

          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Powered by Advanced AI
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/login')}
              className="text-base px-8 py-6 rounded-xl shadow-lg"
            >
              Sign In
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToFeatures}
              className="text-base px-8 py-6 rounded-xl"
            >
              View Features
            </Button>
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* CTA Section */}
      <section className="px-4 py-12 md:py-16" ref={ctaRef}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of farmers already using AgroGenius AI
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            className="text-base px-8 py-6 rounded-xl shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      <AboutSection />
      <CareersSection />
      <ContactSection />

      {/* Final CTA */}
      <section className="px-4 py-12 md:py-16" ref={cta2Ref}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join thousands of farmers already using AgroGenius AI
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/login')}
            className="text-base px-8 py-6 rounded-xl shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-8 border-t border-border bg-card/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <img src={logo} alt="AgroGenius AI" className="w-8 h-8 rounded-full" />
              <span className="font-semibold text-foreground">AgroGenius AI</span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#careers" className="text-muted-foreground hover:text-primary transition-colors">Careers</a>
              <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a>
              <a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 AgroGenius AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
