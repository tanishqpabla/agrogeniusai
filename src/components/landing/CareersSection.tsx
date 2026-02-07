import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const CareersSection = () => {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section id="careers" className="px-4 py-12 md:py-16" ref={ref}>
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
  );
};

export default CareersSection;
