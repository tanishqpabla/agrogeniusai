import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useWeather, getFarmingTip } from '@/hooks/useWeather';
import { useGeolocation } from '@/hooks/useGeolocation';
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
  CheckCircle,
  Navigation,
  CloudRain,
  Sun,
  CloudSun,
  Snowflake,
  CloudLightning,
  CloudFog
} from 'lucide-react';
import logo from '@/assets/logo.png';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';

const cropOptions = ['Wheat', 'Rice', 'Cotton', 'Sugarcane', 'Mustard'];

const featureCards = [
  {
    icon: Leaf,
    title: 'Crop Scanner',
    description: 'Scan for diseases',
    path: '/app/scan',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: Cloud,
    title: 'Weather',
    description: 'Farming tips',
    path: '/app/weather',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Sprout,
    title: 'Soil Health',
    description: 'Fertilizer tips',
    path: '/app/soil',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: TrendingUp,
    title: 'Mandi Prices',
    description: "Today's rates",
    path: '/app/market',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    icon: Bot,
    title: 'Ask AI',
    description: 'Get advice',
    path: '/app/ask-ai',
    gradient: 'from-rose-500 to-pink-600',
  },
  {
    icon: Wheat,
    title: 'Crop Guide',
    description: 'Best crops',
    path: '/app/crop-recommendation',
    gradient: 'from-yellow-500 to-amber-600',
  },
  {
    icon: Landmark,
    title: 'Schemes',
    description: 'Subsidies',
    path: '/app/gov-schemes',
    gradient: 'from-teal-500 to-cyan-600',
  },
  {
    icon: ShoppingBag,
    title: 'Shop',
    description: 'Seeds & tools',
    path: '/app/shop',
    gradient: 'from-indigo-500 to-blue-600',
  },
  {
    icon: Flame,
    title: 'Parali',
    description: 'Stubble tips',
    path: '/app/parali',
    gradient: 'from-red-500 to-orange-600',
  },
];

const getWeatherIcon = (iconCode: string) => {
  const iconMap: Record<string, { icon: typeof Sun; color: string }> = {
    '01d': { icon: Sun, color: 'text-yellow-500' },
    '01n': { icon: Sun, color: 'text-blue-300' },
    '02d': { icon: CloudSun, color: 'text-amber-500' },
    '02n': { icon: Cloud, color: 'text-gray-400' },
    '03d': { icon: Cloud, color: 'text-gray-500' },
    '03n': { icon: Cloud, color: 'text-gray-500' },
    '04d': { icon: Cloud, color: 'text-gray-600' },
    '04n': { icon: Cloud, color: 'text-gray-600' },
    '09d': { icon: CloudRain, color: 'text-blue-500' },
    '09n': { icon: CloudRain, color: 'text-blue-500' },
    '10d': { icon: CloudRain, color: 'text-blue-600' },
    '10n': { icon: CloudRain, color: 'text-blue-600' },
    '11d': { icon: CloudLightning, color: 'text-yellow-600' },
    '11n': { icon: CloudLightning, color: 'text-yellow-600' },
    '13d': { icon: Snowflake, color: 'text-cyan-400' },
    '13n': { icon: Snowflake, color: 'text-cyan-400' },
    '50d': { icon: CloudFog, color: 'text-gray-400' },
    '50n': { icon: CloudFog, color: 'text-gray-400' },
  };
  return iconMap[iconCode] || { icon: Sun, color: 'text-yellow-500' };
};

const Home = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const { weather, loading: weatherLoading } = useWeather(user?.location);
  const { loading: gpsLoading, getCurrentLocation } = useGeolocation();
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleUpdateLocation = async () => {
    const result = await getCurrentLocation();
    if (result?.city && user) {
      const locationText = result.state && result.state !== 'Unknown State' 
        ? `${result.city}, ${result.state}` 
        : result.city;
      updateProfile(user.name, locationText);
    }
  };

  const getDiseaseRisk = () => {
    if (!weather) return { level: 'unknown', text: 'Loading...', color: 'bg-muted', textColor: 'text-muted-foreground' };
    const humidity = weather.current.humidity;
    const temp = weather.current.temp;
    
    if (humidity > 80 && temp > 25) {
      return { level: 'high', text: 'High Risk', color: 'bg-red-500', textColor: 'text-red-700', icon: AlertTriangle };
    } else if (humidity > 60 || temp > 30) {
      return { level: 'moderate', text: 'Moderate', color: 'bg-yellow-500', textColor: 'text-yellow-700', icon: AlertTriangle };
    }
    return { level: 'low', text: 'Low Risk', color: 'bg-green-500', textColor: 'text-green-700', icon: CheckCircle };
  };

  const diseaseRisk = getDiseaseRisk();

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
      {/* Header */}
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
        {/* Location Strip */}
        <Card className="shadow-sm border-0">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{user?.location}</span>
              </div>
              <button
                onClick={handleUpdateLocation}
                disabled={gpsLoading}
                className="flex items-center gap-1 text-xs text-primary px-2 py-1 rounded-lg transition-colors disabled:opacity-50"
              >
                {gpsLoading ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Navigation className="w-3 h-3" />
                )}
                <span>Update</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Weather Advisory Card */}
        <Card className="shadow-lg border-0 bg-gradient-to-br from-primary/5 to-accent/30 overflow-hidden">
          <CardContent className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">🌦️</span>
                  <h2 className="text-lg font-semibold text-foreground">Weather Advisory</h2>
                </div>
                <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  🤖 AI Powered
                </span>
              </div>
              <button 
                onClick={() => navigate('/app/weather')}
                className="text-xs text-primary flex items-center gap-1"
              >
                Details <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            
            {weatherLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : weather ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                      {(() => {
                        const weatherIcon = getWeatherIcon(weather.current.icon);
                        const WeatherIconComponent = weatherIcon.icon;
                        return (
                          <WeatherIconComponent className={`w-8 h-8 ${weatherIcon.color}`} />
                        );
                      })()}
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-foreground">{weather.current.temp}°C</p>
                      <p className="text-sm text-muted-foreground capitalize">{weather.current.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 text-right">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Droplets className="w-4 h-4" />
                      <span className="text-sm">{weather.current.humidity}%</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Wind className="w-4 h-4" />
                      <span className="text-sm">{weather.current.wind_speed} km/h</span>
                    </div>
                  </div>
                </div>

                {/* 7-Day Forecast Preview */}
                {weather.forecast && weather.forecast.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-xs font-medium text-muted-foreground mb-2">7-Day Forecast</h4>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                      {weather.forecast.slice(0, 7).map((day, index) => {
                        const dayWeatherIcon = getWeatherIcon(day.icon);
                        const DayIconComponent = dayWeatherIcon.icon;
                        return (
                          <div 
                            key={index}
                            className="flex-shrink-0 flex flex-col items-center p-2 bg-card/60 rounded-xl min-w-[60px]"
                          >
                            <span className="text-[10px] font-medium text-muted-foreground">{day.dayName}</span>
                            <DayIconComponent className={`w-5 h-5 my-1 ${dayWeatherIcon.color}`} />
                            <span className="text-xs font-semibold text-foreground">{day.temp_max}°</span>
                            <span className="text-[10px] text-muted-foreground">{day.temp_min}°</span>
                            {day.pop > 0 && (
                              <span className="text-[9px] text-blue-500 flex items-center gap-0.5 mt-0.5">
                                <Droplets className="w-2.5 h-2.5" />{day.pop}%
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="bg-card/60 rounded-xl p-3">
                  <p className="text-sm text-foreground">
                    💡 {getFarmingTip(weather.current)}
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">Weather data unavailable</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions Grid - No animations */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-3">
            {featureCards.map((card) => {
              const Icon = card.icon;
              return (
                <button
                  key={card.path}
                  onClick={() => navigate(card.path)}
                  className={`bg-card p-4 rounded-2xl flex flex-col items-center gap-2 text-center shadow-sm border-0 active:scale-95 transition-transform ${
                    mounted ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center shadow-md`}>
                    <Icon className="w-5 h-5 text-white" />
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

        {/* Crop Selector */}
        <div>
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Select Your Crop</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {cropOptions.map((crop) => (
              <button
                key={crop}
                onClick={() => setSelectedCrop(crop)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCrop === crop 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card border text-foreground'
                }`}
              >
                {crop}
              </button>
            ))}
          </div>
        </div>

        {/* Disease Risk & Crop Advisory Card */}
        <Card className="shadow-md border-0">
          <CardContent className="p-4">
            {/* Disease Risk Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🚨</span>
                <span className="font-medium text-foreground">Disease Risk</span>
              </div>
              <div className={`${diseaseRisk.color} text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5`}>
                {diseaseRisk.icon && <diseaseRisk.icon className="w-3 h-3" />}
                {diseaseRisk.text}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border mb-4"></div>

            {/* Crop Advisory */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🌾</span>
                  <span className="font-medium text-foreground">{selectedCrop} Advisory</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {getAdvisory()}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
