import { ArrowLeft, Phone, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import farmerHero from "@/assets/farmer-hero.jpg";

const LaunchingSoon = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${farmerHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="p-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
            <span className="text-2xl">🚀</span>
            <span className="text-white font-medium text-sm">Launching Soon</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
            AgroGenius AI
          </h1>
          <p className="text-xl md:text-2xl text-primary font-semibold mb-3">
            India's First AI Farming Assistant
          </p>
          <p className="text-white/70 text-sm md:text-base max-w-md mb-8">
            We're working hard to bring you this feature. Stay tuned for something amazing!
          </p>

          {/* Decorative Element */}
          <div className="flex items-center gap-2 mb-8">
            <div className="w-12 h-0.5 bg-primary/50 rounded-full" />
            <span className="text-2xl">🌾</span>
            <div className="w-12 h-0.5 bg-primary/50 rounded-full" />
          </div>
        </main>

        {/* Contact Section */}
        <footer className="relative z-10 bg-black/50 backdrop-blur-md border-t border-white/10 p-6">
          <h3 className="text-white font-semibold text-center mb-4">Contact Us</h3>
          
          <div className="space-y-3 max-w-sm mx-auto">
            {/* Phone */}
            <a 
              href="tel:+917987027523"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">+91 79870 27523</span>
            </a>

            {/* Email */}
            <a 
              href="mailto:agrogeniusai@gmail.com"
              className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <span className="text-sm">agrogeniusai@gmail.com</span>
            </a>

            {/* Founder */}
            <div className="flex items-center gap-3 text-white/80 pt-2 border-t border-white/10">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-white/50">Founder</span>
                <span className="text-sm text-white">Tanishq Pabla</span>
                <a 
                  href="mailto:tanishqpabla19@gmail.com" 
                  className="text-xs text-primary hover:underline"
                >
                  tanishqpabla19@gmail.com
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LaunchingSoon;
