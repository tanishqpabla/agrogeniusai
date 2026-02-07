import { Mail, Instagram, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const contactItems = [
  {
    icon: Mail,
    title: 'Email',
    content: <a href="mailto:agrogeniusai@gmail.com" className="text-sm text-primary hover:underline">agrogeniusai@gmail.com</a>,
  },
  {
    icon: Instagram,
    title: 'Instagram',
    content: (
      <a href="https://instagram.com/agrogeniusai" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline">
        @agrogeniusai
      </a>
    ),
  },
  {
    icon: MapPin,
    title: 'Location',
    content: <p className="text-sm text-muted-foreground">India</p>,
  },
];

const ContactSection = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="contact" className="px-4 py-12 md:py-16 bg-card/50" ref={ref}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Contact Us</h2>
        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          Have questions? We'd love to hear from you
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} className="border-0 shadow-md bg-card hover-lift">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  {item.content}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
