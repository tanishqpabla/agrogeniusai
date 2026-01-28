import { Check, Crown, Zap, Star, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import PageHeader from '@/components/PageHeader';

const plans = [
  {
    id: 'free',
    name: 'Free',
    nameHi: 'मुफ़्त',
    price: 0,
    period: 'forever',
    periodHi: 'हमेशा के लिए',
    devices: 1,
    icon: Smartphone,
    gradient: 'from-gray-400 to-gray-500',
    bgColor: 'bg-gray-50',
    features: [
      { en: 'Basic crop disease detection', hi: 'बुनियादी फसल रोग पहचान' },
      { en: 'Weather updates', hi: 'मौसम अपडेट' },
      { en: 'Market prices (limited)', hi: 'मंडी भाव (सीमित)' },
      { en: '5 AI queries/day', hi: '5 AI प्रश्न/दिन' },
    ],
    buttonText: 'Current Plan',
    buttonTextHi: 'वर्तमान प्लान',
    popular: false,
  },
  {
    id: 'premium',
    name: 'Premium',
    nameHi: 'प्रीमियम',
    price: 99,
    period: '/month',
    periodHi: '/महीना',
    devices: 2,
    icon: Crown,
    gradient: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
    features: [
      { en: 'Advanced disease detection', hi: 'उन्नत रोग पहचान' },
      { en: 'Detailed weather advisory', hi: 'विस्तृत मौसम सलाह' },
      { en: 'Real-time mandi prices', hi: 'रीयल-टाइम मंडी भाव' },
      { en: 'Unlimited AI queries', hi: 'असीमित AI प्रश्न' },
      { en: 'Soil health reports', hi: 'मिट्टी स्वास्थ्य रिपोर्ट' },
      { en: 'Priority support', hi: 'प्राथमिकता सहायता' },
    ],
    buttonText: 'Upgrade Now',
    buttonTextHi: 'अभी अपग्रेड करें',
    popular: true,
  },
  {
    id: 'premium-pro',
    name: 'Premium Pro',
    nameHi: 'प्रीमियम प्रो',
    price: 999,
    period: '/month',
    periodHi: '/महीना',
    devices: 4,
    icon: Star,
    gradient: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    features: [
      { en: 'Everything in Premium', hi: 'प्रीमियम की सभी सुविधाएं' },
      { en: 'Farm analytics dashboard', hi: 'खेत विश्लेषण डैशबोर्ड' },
      { en: 'Crop yield predictions', hi: 'फसल उपज भविष्यवाणी' },
      { en: 'Expert consultation', hi: 'विशेषज्ञ परामर्श' },
      { en: 'Offline mode access', hi: 'ऑफलाइन मोड एक्सेस' },
      { en: 'Family farm sharing', hi: 'परिवार खेत साझाकरण' },
      { en: 'Custom alerts', hi: 'कस्टम अलर्ट' },
    ],
    buttonText: 'Go Pro',
    buttonTextHi: 'प्रो बनें',
    popular: false,
  },
];

const Pricing = () => {
  const { user } = useAuth();
  const isHindi = user?.language === 'hi';

  return (
    <div className="min-h-screen bg-background">
      <PageHeader 
        title={isHindi ? 'प्रीमियम में अपग्रेड करें' : 'Upgrade to Premium'}
        subtitle={isHindi ? 'अधिक सुविधाएं अनलॉक करें' : 'Unlock more features'}
        gradient="from-primary to-agro-leaf"
      >
        {/* Hero */}
        <div className="bg-primary-foreground/10 rounded-2xl p-4 backdrop-blur-sm text-center mt-2">
          <Zap className="w-10 h-10 text-accent mx-auto mb-2" />
          <p className="text-primary-foreground text-sm">
            {isHindi 
              ? '🌾 प्रीमियम के साथ अपनी खेती को सुपरचार्ज करें!'
              : '🌾 Supercharge your farming with Premium!'}
          </p>
        </div>
      </PageHeader>
      {/* Pricing Cards */}
      <div className="p-4 space-y-4">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          return (
            <div
              key={plan.id}
              className={`${plan.bgColor} p-5 rounded-2xl relative overflow-hidden animate-fade-in ${
                plan.popular ? 'ring-2 ring-accent shadow-lg' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-bl-xl">
                  {isHindi ? 'लोकप्रिय' : 'POPULAR'}
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-foreground">
                    {isHindi ? plan.nameHi : plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-foreground">₹{plan.price}</span>
                    <span className="text-muted-foreground text-sm">
                      {isHindi ? plan.periodHi : plan.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-xs mt-1 flex items-center gap-1">
                    <Smartphone className="w-3 h-3" />
                    {plan.devices} {isHindi ? 'डिवाइस' : plan.devices === 1 ? 'device' : 'devices'}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span>{isHindi ? feature.hi : feature.en}</span>
                  </div>
                ))}
              </div>

              <Button
                className={`w-full mt-4 ${
                  plan.id === 'free'
                    ? 'bg-muted text-muted-foreground'
                    : `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90`
                }`}
                disabled={plan.id === 'free'}
              >
                {isHindi ? plan.buttonTextHi : plan.buttonText}
              </Button>
            </div>
          );
        })}

        {/* Money Back Guarantee */}
        <div className="text-center py-4">
          <p className="text-muted-foreground text-sm">
            {isHindi 
              ? '✅ 7 दिन की मनी बैक गारंटी'
              : '✅ 7-day money back guarantee'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
