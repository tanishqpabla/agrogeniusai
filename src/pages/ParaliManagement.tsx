import { 
  Flame, 
  Leaf, 
  Recycle, 
  TrendingUp, 
  Sprout,
  Factory,
  Tractor,
  AlertTriangle,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import PremiumBanner from '@/components/PremiumBanner';

const solutions = [
  {
    icon: Tractor,
    title: 'Happy Seeder Technology',
    description: 'Direct sowing of wheat into rice stubble without burning',
    benefits: ['No burning needed', 'Saves water', 'Improves soil health'],
    gradient: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
  },
  {
    icon: Recycle,
    title: 'Straw Mulching',
    description: 'Spread straw as mulch to retain moisture and nutrients',
    benefits: ['Reduces weeds', 'Retains moisture', 'Natural fertilizer'],
    gradient: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: Factory,
    title: 'Biomass Power Plants',
    description: 'Sell stubble to nearby power plants for energy generation',
    benefits: ['Extra income', 'Clean energy', 'Zero waste'],
    gradient: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
  },
  {
    icon: Sprout,
    title: 'Composting',
    description: 'Convert stubble into organic compost for next crop',
    benefits: ['Rich compost', 'Cost savings', 'Healthier crops'],
    gradient: 'from-lime-500 to-green-600',
    bgColor: 'bg-lime-50',
  },
  {
    icon: Leaf,
    title: 'Bio-decomposer Spray',
    description: 'PUSA bio-decomposer to decompose stubble in 15-20 days',
    benefits: ['Quick decomposition', 'Govt. subsidized', 'Easy to use'],
    gradient: 'from-teal-500 to-green-500',
    bgColor: 'bg-teal-50',
  },
];

const impactStats = [
  { value: '20M+', label: 'Tonnes stubble burned yearly', icon: Flame, color: 'text-red-500' },
  { value: '40%', label: 'Air pollution from burning', icon: AlertTriangle, color: 'text-orange-500' },
  { value: '₹2000/acre', label: 'Govt. subsidy available', icon: TrendingUp, color: 'text-green-500' },
];

const ParaliManagement = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const lang = user?.language || 'en';

  const t = {
    en: {
      title: 'Parali Management',
      subtitle: 'Eco-friendly stubble solutions',
      impactTitle: 'Environmental Impact',
      solutionsTitle: 'Sustainable Solutions',
      whyMatters: 'Why It Matters',
      whyText: 'Stubble burning causes severe air pollution, health issues, and soil degradation. Choose sustainable alternatives for a healthier environment and better crop yields.',
      benefits: 'Benefits',
      govSchemes: 'Government Schemes',
      govText: 'Get up to ₹2000/acre subsidy for using eco-friendly stubble management methods. Contact your local agriculture office.',
      learnMore: 'Learn More',
    },
    hi: {
      title: 'पराली प्रबंधन',
      subtitle: 'पर्यावरण-अनुकूल समाधान',
      impactTitle: 'पर्यावरणीय प्रभाव',
      solutionsTitle: 'टिकाऊ समाधान',
      whyMatters: 'यह क्यों महत्वपूर्ण है',
      whyText: 'पराली जलाने से गंभीर वायु प्रदूषण, स्वास्थ्य समस्याएं और मिट्टी का क्षरण होता है। स्वस्थ पर्यावरण और बेहतर फसल उपज के लिए टिकाऊ विकल्प चुनें।',
      benefits: 'लाभ',
      govSchemes: 'सरकारी योजनाएं',
      govText: 'पर्यावरण-अनुकूल पराली प्रबंधन विधियों का उपयोग करने के लिए ₹2000/एकड़ तक की सब्सिडी प्राप्त करें।',
      learnMore: 'और जानें',
    },
  };

  const text = t[lang as 'en' | 'hi'] || t.en;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-red-500 to-orange-500 p-6 pb-8 rounded-b-3xl">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/80 mb-4 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
            <Flame className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{text.title}</h1>
            <p className="text-white/80">{text.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Why It Matters */}
      <div className="px-4 mt-6">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">{text.whyMatters}</h3>
              <p className="text-sm text-muted-foreground">{text.whyText}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-3 text-foreground">{text.impactTitle}</h2>
        <div className="grid grid-cols-3 gap-3">
          {impactStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-xl p-3 text-center border">
                <Icon className={`w-6 h-6 mx-auto mb-1 ${stat.color}`} />
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Solutions */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold mb-3 text-foreground">{text.solutionsTitle}</h2>
        <div className="space-y-4">
          {solutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <div key={solution.title} className={`${solution.bgColor} rounded-2xl p-4`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${solution.gradient} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{solution.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{solution.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {solution.benefits.map((benefit) => (
                        <span 
                          key={benefit}
                          className="inline-flex items-center gap-1 bg-white/80 text-xs px-2 py-1 rounded-full text-foreground"
                        >
                          <CheckCircle2 className="w-3 h-3 text-green-500" />
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Government Schemes */}
      <div className="px-4 mt-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-5 text-white">
          <h3 className="font-bold text-lg mb-2">{text.govSchemes}</h3>
          <p className="text-sm text-white/90 mb-4">{text.govText}</p>
          <button 
            onClick={() => navigate('/gov-schemes')}
            className="bg-white text-green-600 px-4 py-2 rounded-xl font-medium text-sm hover:bg-white/90 transition-colors"
          >
            {text.learnMore}
          </button>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="px-4 mt-6">
        <PremiumBanner variant="full" />
      </div>
    </div>
  );
};

export default ParaliManagement;
