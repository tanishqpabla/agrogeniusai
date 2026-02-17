import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  onClick?: () => void;
}

const FeatureCard = ({ icon: Icon, title, description, className = '', onClick }: FeatureCardProps) => (
  <Card
    className={`border-0 shadow-md bg-card hover-lift cursor-pointer ${className}`}
    onClick={onClick}
  >
    <CardContent className="p-6">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </CardContent>
  </Card>
);

export default FeatureCard;
