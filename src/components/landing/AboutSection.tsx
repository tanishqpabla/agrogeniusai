import { Target, Heart, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const aboutCards = [
  { icon: Target, title: 'Our Mission', text: 'To democratize agricultural knowledge and make AI-powered farming accessible to every farmer in India.' },
  { icon: Heart, title: 'Our Values', text: 'Sustainability, innovation, and farmer-first approach drive everything we build.' },
  { icon: Users, title: 'Our Team', text: 'A passionate team of agri-tech enthusiasts, data scientists, and farming experts.' },
];

const AboutSection = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="about" className="px-4 py-12 md:py-16 bg-card/50" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
          About AgroGenius AI
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
          Empowering Indian farmers with cutting-edge technology
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card key={card.title} className="border-0 shadow-md bg-card text-center hover-lift">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.text}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
