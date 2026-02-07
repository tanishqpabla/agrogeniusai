import { useNavigate } from 'react-router-dom';
import { 
  Leaf, 
  Flame, 
  Cloud, 
  Bug, 
  TrendingUp, 
  Landmark,
  ArrowRight,
   Sparkles,
   Instagram,
   Mail,
   MapPin,
   Users,
   Target,
   Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import logo from '@/assets/logo.png';

const features = [
  {
    icon: Leaf,
    title: 'Smart Crop Decisions',
    description: 'AI-powered recommendations for the best crops based on your soil, weather, and market conditions.',
  },
  {
    icon: Flame,
    title: 'Parali Alternatives',
    description: 'Eco-friendly solutions to stubble burning - earn money while protecting the environment.',
  },
  {
    icon: Cloud,
    title: 'Weather & Soil Monitoring',
    description: 'Real-time weather forecasts and soil health insights tailored to your farm location.',
  },
  {
    icon: Bug,
    title: 'Pest & Disease Alerts',
    description: 'Early detection and treatment suggestions for crop diseases using AI-powered scanning.',
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Live mandi prices and market trends to help you sell at the best time.',
  },
  {
    icon: Landmark,
    title: 'Government Schemes',
    description: 'Stay updated on subsidies, loans, and schemes like PM-KISAN for farmers.',
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/20 to-background">
      {/* Hero Section */}
      <section className="px-4 pt-8 pb-12 md:pt-16 md:pb-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img 
              src={logo} 
              alt="AgroGenius AI" 
              className="w-20 h-20 md:w-28 md:h-28 rounded-full shadow-lg border-4 border-primary/20"
            />
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-3">
            AgroGenius AI
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl font-medium text-primary mb-4">
            Your 24×7 Digital Krishi Guru
          </p>

          {/* Description */}
          <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            AI-powered guidance for smarter, sustainable farming
          </p>

          {/* AI Badge */}
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Powered by Advanced AI
            </span>
          </div>

          {/* CTAs */}
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

      {/* Features Section */}
      <section id="features" className="px-4 py-12 md:py-16 bg-card/50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
            Everything You Need to Farm Smarter
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
            Comprehensive tools designed for Indian farmers, available in multiple languages
          </p>

          {/* Mobile: horizontal snap-scroll carousel */}
          <div className="md:hidden overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 px-2 py-2 no-scrollbar">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="min-w-[280px] snap-center border-0 shadow-md bg-card flex-shrink-0"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Desktop: grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={feature.title} 
                  className="border-0 shadow-md bg-card"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-12 md:py-16">
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
       {/* About Section */}
       <section id="about" className="px-4 py-12 md:py-16 bg-card/50">
         <div className="max-w-4xl mx-auto">
           <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
             About AgroGenius AI
           </h2>
           <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
             Empowering Indian farmers with cutting-edge technology
          </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <Card className="border-0 shadow-md bg-card text-center">
               <CardContent className="p-6">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                   <Target className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-lg font-semibold text-foreground mb-2">Our Mission</h3>
                 <p className="text-sm text-muted-foreground">
                   To democratize agricultural knowledge and make AI-powered farming accessible to every farmer in India.
                 </p>
               </CardContent>
             </Card>
             
             <Card className="border-0 shadow-md bg-card text-center">
               <CardContent className="p-6">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                   <Heart className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-lg font-semibold text-foreground mb-2">Our Values</h3>
                 <p className="text-sm text-muted-foreground">
                   Sustainability, innovation, and farmer-first approach drive everything we build.
                 </p>
               </CardContent>
             </Card>
             
             <Card className="border-0 shadow-md bg-card text-center">
               <CardContent className="p-6">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                   <Users className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="text-lg font-semibold text-foreground mb-2">Our Team</h3>
                 <p className="text-sm text-muted-foreground">
                   A passionate team of agri-tech enthusiasts, data scientists, and farming experts.
                 </p>
               </CardContent>
             </Card>
           </div>
        </div>
       </section>

       {/* Work With Us Section */}
       <section id="careers" className="px-4 py-12 md:py-16">
         <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
             Work With Us
           </h2>
           <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
             Join our mission to revolutionize Indian agriculture through technology
           </p>
           
           <Card className="border-0 shadow-md bg-card max-w-2xl mx-auto">
             <CardContent className="p-6 md:p-8">
               <p className="text-muted-foreground mb-6">
                 We're always looking for talented individuals who share our passion for agriculture and technology. 
                 Whether you're a developer, data scientist, agricultural expert, or marketing professional, 
                 we'd love to hear from you.
               </p>
               <Button 
                 variant="default"
                 onClick={() => window.open('https://forms.gle/cbdNRcAFcmNu7XSp8', '_blank')}
                 className="rounded-xl"
               >
                 <ArrowRight className="w-4 h-4 mr-2" />
                 Apply Now
               </Button>
             </CardContent>
           </Card>
         </div>
       </section>

       {/* Contact Section */}
       <section id="contact" className="px-4 py-12 md:py-16 bg-card/50">
         <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
             Contact Us
           </h2>
           <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
             Have questions? We'd love to hear from you
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
             <Card className="border-0 shadow-md bg-card">
               <CardContent className="p-6 text-center">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                   <Mail className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="font-semibold text-foreground mb-2">Email</h3>
                 <a 
                   href="mailto:agrogeniusai@gmail.com" 
                   className="text-sm text-primary hover:underline"
                 >
                   agrogeniusai@gmail.com
                 </a>
               </CardContent>
             </Card>
             
             <Card className="border-0 shadow-md bg-card">
               <CardContent className="p-6 text-center">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                   <Instagram className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="font-semibold text-foreground mb-2">Instagram</h3>
                 <a 
                   href="https://instagram.com/agrogeniusai" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="text-sm text-primary hover:underline"
                 >
                   @agrogeniusai
                 </a>
               </CardContent>
             </Card>
             
             <Card className="border-0 shadow-md bg-card">
               <CardContent className="p-6 text-center">
                 <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                   <MapPin className="w-6 h-6 text-primary" />
                 </div>
                 <h3 className="font-semibold text-foreground mb-2">Location</h3>
                 <p className="text-sm text-muted-foreground">
                   India
                 </p>
               </CardContent>
             </Card>
           </div>
         </div>
       </section>

       {/* CTA Section */}
       <section className="px-4 py-12 md:py-16">
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
