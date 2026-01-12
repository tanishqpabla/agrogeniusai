import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWeather, getWeatherIcon, getFarmingTip } from '@/hooks/useWeather';
import { 
  Leaf, 
  Cloud, 
  Sprout, 
  TrendingUp, 
  Bot,
  MapPin,
  Wheat,
  Landmark,
  ShoppingBag,
  Flame,
  Droplets,
  Wind,
  ChevronRight,
  Store,
  Loader2
} from 'lucide-react';
import logo from '@/assets/logo.png';
import PremiumBanner from '@/components/PremiumBanner';

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
  {
    icon: Flame,
    title: 'Parali Management',
    description: 'Eco-friendly stubble solutions',
    path: '/parali',
    gradient: 'from-red-500 to-orange-500',
    bgColor: 'bg-red-50',
  },
];

// Nearby mandis data based on location
const nearbyMandis = [
  { name: 'Karnal Mandi', distance: '12 km', crop: 'Wheat', price: '₹2,250/q', trend: 'up' },
  { name: 'Panipat Mandi', distance: '28 km', crop: 'Rice', price: '₹3,100/q', trend: 'up' },
  { name: 'Kurukshetra Mandi', distance: '35 km', crop: 'Mustard', price: '₹5,450/q', trend: 'down' },
  { name: 'Ambala Mandi', distance: '45 km', crop: 'Cotton', price: '₹6,800/q', trend: 'up' },
  { name: 'Sonipat Mandi', distance: '52 km', crop: 'Wheat', price: '₹2,180/q', trend: 'stable' },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(user?.location);

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
        
        {/* Weather Widget */}
        <div className="bg-primary-foreground/10 rounded-2xl p-4 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="text-primary-foreground/80 text-xs">
              Weather in {weather?.location || user?.location}
            </p>
            <button 
              onClick={() => navigate('/weather')}
              className="text-primary-foreground/80 text-xs flex items-center gap-1 hover:text-primary-foreground"
            >
              View Details <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          {weatherLoading ? (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="w-8 h-8 text-primary-foreground animate-spin" />
            </div>
          ) : weatherError ? (
            <div className="text-center py-4">
              <p className="text-primary-foreground/80 text-sm">Unable to load weather</p>
              <p className="text-primary-foreground/60 text-xs mt-1">{weatherError}</p>
            </div>
          ) : weather ? (
            <>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                    <span className="text-3xl">{getWeatherIcon(weather.current.icon)}</span>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-primary-foreground">{weather.current.temp}°C</p>
                    <p className="text-primary-foreground/80 text-xs capitalize">{weather.current.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-right">
                  <div className="flex items-center gap-2 text-primary-foreground/80">
                    <Droplets className="w-4 h-4" />
                    <span className="text-xs">{weather.current.humidity}% Humidity</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary-foreground/80">
                    <Wind className="w-4 h-4" />
                    <span className="text-xs">{weather.current.wind_speed} km/h Wind</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-primary-foreground/20">
                <p className="text-primary-foreground text-sm">
                  {getFarmingTip(weather.current)}
                </p>
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-primary-foreground/80 text-sm">Weather data unavailable</p>
            </div>
          )}
        </div>
      </div>

      {/* Premium Banner */}
      <div className="px-4 -mt-2 mb-2">
        <PremiumBanner variant="full" />
      </div>

      {/* Nearby Mandis Section */}
      <div className="px-4 mt-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Store className="w-5 h-5 text-primary" />
            Mandis Near {user?.location}
          </h2>
          <button 
            onClick={() => navigate('/market')}
            className="text-primary text-sm flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {nearbyMandis.map((mandi, index) => (
            <button
              key={mandi.name}
              onClick={() => navigate('/market')}
              className="flex-shrink-0 bg-card border rounded-xl p-3 min-w-[160px] text-left hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-muted-foreground">{mandi.distance}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  mandi.trend === 'up' ? 'bg-green-100 text-green-700' :
                  mandi.trend === 'down' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {mandi.trend === 'up' ? '↑' : mandi.trend === 'down' ? '↓' : '→'}
                </span>
              </div>
              <p className="font-medium text-foreground text-sm truncate">{mandi.name}</p>
              <p className="text-xs text-muted-foreground">{mandi.crop}</p>
              <p className="text-primary font-semibold mt-1">{mandi.price}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="p-4">
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
