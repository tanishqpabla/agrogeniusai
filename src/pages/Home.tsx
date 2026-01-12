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
  Loader2,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import logo from '@/assets/logo.png';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

const cropOptions = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Mustard'];

const featureCards = [
  {
    icon: Leaf,
    title: 'Crop Scanner',
    description: 'Scan for diseases',
    path: '/scan',
  },
  {
    icon: Cloud,
    title: 'Weather',
    description: 'Farming tips',
    path: '/weather',
  },
  {
    icon: Sprout,
    title: 'Soil Health',
    description: 'Fertilizer tips',
    path: '/soil',
  },
  {
    icon: TrendingUp,
    title: 'Mandi Prices',
    description: 'Today\'s rates',
    path: '/market',
  },
  {
    icon: Bot,
    title: 'Ask AI',
    description: 'Get advice',
    path: '/ask-ai',
  },
  {
    icon: Wheat,
    title: 'Crop Guide',
    description: 'Best crops',
    path: '/crop-recommendation',
  },
  {
    icon: Landmark,
    title: 'Schemes',
    description: 'Subsidies',
    path: '/gov-schemes',
  },
  {
    icon: ShoppingBag,
    title: 'Shop',
    description: 'Seeds & tools',
    path: '/shop',
  },
  {
    icon: Flame,
    title: 'Parali',
    description: 'Stubble tips',
    path: '/parali',
  },
];

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { weather, loading: weatherLoading, error: weatherError } = useWeather(user?.location);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');

  // Calculate disease risk based on weather conditions
  const getDiseaseRisk = () => {
    if (!weather) return { level: 'unknown', text: 'Loading...', color: 'bg-muted' };
    const humidity = weather.current.humidity;
    const temp = weather.current.temp;
    
    if (humidity > 80 && temp > 25) {
      return { level: 'high', text: 'High Risk', color: 'bg-red-500', icon: AlertTriangle };
    } else if (humidity > 60 || temp > 30) {
      return { level: 'moderate', text: 'Moderate', color: 'bg-yellow-500', icon: AlertTriangle };
    }
    return { level: 'low', text: 'Low Risk', color: 'bg-green-500', icon: CheckCircle };
  };

  const diseaseRisk = getDiseaseRisk();

  // Generate advisory based on weather and crop
  const getAdvisory = () => {
    if (!weather) return 'Loading advisory...';
    const temp = weather.current.temp;
    const humidity = weather.current.humidity;
    
    if (selectedCrop === 'Wheat') {
      if (temp < 15) return 'Good conditions for wheat growth. Consider light irrigation.';
      if (temp > 30) return 'High temperature alert. Increase irrigation frequency.';
      return 'Optimal conditions. Monitor for rust disease if humidity stays high.';
    }
    if (selectedCrop === 'Rice') {
      if (humidity > 75) return 'Good moisture levels. Watch for blast disease signs.';
      return 'Maintain water levels in paddies. Consider nitrogen top-up.';
    }
    return `Monitor ${selectedCrop} closely. Current conditions are ${humidity > 70 ? 'humid' : 'dry'}.`;
  };

  return (
    <div className="min-h-screen bg-background pb-4">
      {/* Header - Compact */}
      <div className="bg-primary px-5 pt-5 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground/80 text-xs">Welcome back</p>
            <h1 className="text-xl font-semibold text-primary-foreground">
              Namaste, {user?.name?.split(' ')[0]} 🙏
            </h1>
          </div>
          <img 
            src={logo} 
            alt="AgroGenius AI" 
            className="w-11 h-11 rounded-full object-cover shadow-md"
          />
        </div>
      </div>

      <div className="px-4 space-y-4 -mt-2">
        {/* Location + Weather Strip */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{user?.location}</span>
              </div>
              {weatherLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
              ) : weather ? (
                <button 
                  onClick={() => navigate('/weather')}
                  className="flex items-center gap-2 text-sm"
                >
                  <span className="text-lg">{getWeatherIcon(weather.current.icon)}</span>
                  <span className="font-medium">{weather.current.temp}°C</span>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Droplets className="w-3 h-3" />
                    {weather.current.humidity}%
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground text-xs">
                    <Wind className="w-3 h-3" />
                    {weather.current.wind_speed}
                  </div>
                </button>
              ) : (
                <span className="text-xs text-muted-foreground">Weather unavailable</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Disease Risk Badge */}
        {weather && (
          <div className="flex items-center gap-2">
            <div className={`${diseaseRisk.color} text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5`}>
              {diseaseRisk.icon && <diseaseRisk.icon className="w-3 h-3" />}
              Disease Risk: {diseaseRisk.text}
            </div>
            {diseaseRisk.level === 'high' && (
              <span className="text-xs text-muted-foreground">Check crops today</span>
            )}
          </div>
        )}

        {/* Crop Selector */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4">
          {cropOptions.map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCrop === crop 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-card border text-foreground hover:bg-accent'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Today's Farm Advisory - Main Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-accent/30">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🌾</span>
                  <h2 className="text-lg font-semibold text-foreground">Today's Advisory</h2>
                </div>
                <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  🤖 AI Powered
                </span>
              </div>
              <span className="text-xs text-muted-foreground">{selectedCrop}</span>
            </div>
            
            <p className="text-foreground leading-relaxed mb-4">
              {getAdvisory()}
            </p>

            {weather && (
              <div className="bg-card/60 rounded-xl p-3 mb-4">
                <p className="text-sm text-muted-foreground">
                  💡 {getFarmingTip(weather.current)}
                </p>
              </div>
            )}

            <button
              onClick={() => navigate('/ask-ai')}
              className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <Bot className="w-4 h-4" />
              Ask for detailed advice
              <ChevronRight className="w-4 h-4" />
            </button>
          </CardContent>
        </Card>

        {/* Quick Actions Grid */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.path}
                  onClick={() => navigate(card.path)}
                  className="bg-card p-4 rounded-2xl flex flex-col items-center gap-2 text-center shadow-sm hover:shadow-md transition-shadow border-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{card.title}</p>
                    <p className="text-xs text-muted-foreground">{card.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
