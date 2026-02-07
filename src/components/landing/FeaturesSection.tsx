import {
  Leaf,
  Flame,
  Cloud,
  Bug,
  TrendingUp,
  Landmark,
} from 'lucide-react';
import FeatureCard from './FeatureCard';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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

const FeaturesSection = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id="features" className="px-4 py-12 md:py-16 bg-card/50" ref={sectionRef}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
          Everything You Need to Farm Smarter
        </h2>
        <p className="text-center text-muted-foreground mb-10 max-w-lg mx-auto">
          Comprehensive tools designed for Indian farmers, available in multiple languages
        </p>

        {/* Mobile: horizontal snap-scroll carousel */}
        <div className="md:hidden overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 px-2 py-2 no-scrollbar">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              {...feature}
              className="min-w-[280px] snap-center flex-shrink-0"
            />
          ))}
        </div>

        {/* Desktop: grid layout */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
