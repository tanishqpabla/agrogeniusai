import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Leaf, 
  Cloud, 
  Sprout, 
  TrendingUp, 
  Bot,
  MapPin,
  Wheat,
  Landmark,
  ShoppingBag
} from 'lucide-react';
import logo from '@/assets/logo.png';

const featureCards = [
  {
    icon: Leaf,
    title: 'Crop Disease Scanner',
    description: 'Scan leaves to detect diseases',
    path: '/scan',
    gradient: 'from-green-500 to-emerald-600',
    bgColor: 'bg-agro-green-light',
  },
  {
    icon: Cloud,
    title: 'Weather Advisory',
    description: 'Get farming weather tips',
    path: '/weather',
    gradient: 'from-blue-400 to-cyan-500',
    bgColor: 'bg-agro-sky-light',
  },
  {
    icon: Sprout,
    title: 'Soil Health Insights',
    description: 'Fertilizer & irrigation tips',
    path: '/soil',
    gradient: 'from-amber-500 to-orange-500',
    bgColor: 'bg-agro-earth-light',
  },
  {
    icon: TrendingUp,
    title: 'Market Prices',
    description: 'Check mandi rates today',
    path: '/market',
    gradient: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
  },
  {
    icon: Bot,
    title: 'Ask Agro AI',
    description: 'Get instant farming advice',
    path: '/ask-ai',
    gradient: 'from-teal-500 to-green-500',
    bgColor: 'bg-teal-50',
  },
  {
    icon: Wheat,
    title: 'Crop Recommendation',
    description: 'Best crops for your land',
    path: '/crop-recommendation',
    gradient: 'from-lime-500 to-green-600',
    bgColor: 'bg-lime-50',
  },
  {
    icon: Landmark,
    title: 'Government Schemes',
    description: 'Subsidies & loan programs',
    path: '/gov-schemes',
    gradient: 'from-amber-500 to-orange-500',
    bgColor: 'bg-amber-50',
  },
  {
    icon: ShoppingBag,
    title: 'Agro Shop',
    description: 'Seeds, fertilizers & tools',
    path: '/shop',
    gradient: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-50',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-agro-leaf p-6 pb-8 rounded-b-3xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-primary-foreground/80 text-sm">Welcome back</p>
            <h1 className="text-2xl font-bold text-primary-foreground">
              Namaste {user?.name} 🙏
            </h1>
            <div className="flex items-center gap-1 mt-1 text-primary-foreground/80">
              <MapPin className="w-3 h-3" />
              <span className="text-xs">{user?.location}</span>
            </div>
          </div>
          <img 
            src={logo} 
            alt="AgroGenius AI Logo" 
            className="w-14 h-14 rounded-full object-cover shadow-lg"
          />
        </div>
        
        {/* Quick Stats */}
        <div className="bg-primary-foreground/10 rounded-2xl p-4 backdrop-blur-sm">
          <p className="text-primary-foreground/80 text-xs mb-2">Today's Tip</p>
          <p className="text-primary-foreground text-sm">
            🌾 Perfect weather for wheat sowing in your region. Check weather advisory for more details.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="p-4 -mt-4">
        <h2 className="text-lg font-semibold mb-4 text-foreground">How can I help you today?</h2>
        <div className="grid gap-4">
          {featureCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <button
                key={card.path}
                onClick={() => navigate(card.path)}
                className={`${card.bgColor} p-5 rounded-2xl flex items-center gap-4 text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-lg`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
