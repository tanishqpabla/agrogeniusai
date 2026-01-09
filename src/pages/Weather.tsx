import { useState } from 'react';
import { ArrowLeft, Cloud, Sun, CloudRain, Wind, Droplets, Thermometer } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const districts = [
  'Hisar', 'Karnal', 'Panipat', 'Rohtak', 'Ambala', 
  'Sirsa', 'Fatehabad', 'Jind', 'Kaithal', 'Kurukshetra'
];

const weatherData = {
  current: {
    temp: 28,
    humidity: 65,
    wind: 12,
    condition: 'Partly Cloudy',
  },
  forecast: [
    { day: 'Today', temp: 28, icon: Sun, rain: 10 },
    { day: 'Tomorrow', temp: 26, icon: Cloud, rain: 30 },
    { day: 'Wed', temp: 24, icon: CloudRain, rain: 70 },
    { day: 'Thu', temp: 25, icon: CloudRain, rain: 60 },
    { day: 'Fri', temp: 27, icon: Sun, rain: 15 },
  ],
  recommendations: [
    { type: 'sowing', text: 'Good conditions for wheat sowing', priority: 'high' },
    { type: 'irrigation', text: 'Reduce irrigation - rain expected in 2 days', priority: 'medium' },
    { type: 'spray', text: 'Avoid pesticide spray on Wednesday', priority: 'high' },
    { type: 'harvest', text: 'Complete any pending harvesting by Tuesday', priority: 'medium' },
  ],
};

const Weather = () => {
  const navigate = useNavigate();
  const [selectedDistrict, setSelectedDistrict] = useState('Hisar');

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-agro-sky to-blue-400 p-4">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={() => navigate(-1)} className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-white">Weather Advisory</h1>
            <p className="text-white/80 text-sm">Farming recommendations</p>
          </div>
        </div>

        {/* Location Selector */}
        <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
          <SelectTrigger className="bg-white/20 border-white/30 text-white rounded-xl h-12">
            <SelectValue placeholder="Select District" />
          </SelectTrigger>
          <SelectContent className="bg-card">
            {districts.map((district) => (
              <SelectItem key={district} value={district}>{district}, Haryana</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="p-4 space-y-4 -mt-2">
        {/* Current Weather */}
        <div className="bg-card rounded-2xl p-5 shadow-sm border animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-muted-foreground text-sm">{selectedDistrict}, Haryana</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-foreground">{weatherData.current.temp}°</span>
                <span className="text-muted-foreground mb-2">C</span>
              </div>
              <p className="text-foreground">{weatherData.current.condition}</p>
            </div>
            <Sun className="w-20 h-20 text-agro-sun" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t">
            <div className="text-center">
              <Droplets className="w-5 h-5 mx-auto text-agro-sky mb-1" />
              <p className="text-lg font-semibold">{weatherData.current.humidity}%</p>
              <p className="text-xs text-muted-foreground">Humidity</p>
            </div>
            <div className="text-center">
              <Wind className="w-5 h-5 mx-auto text-muted-foreground mb-1" />
              <p className="text-lg font-semibold">{weatherData.current.wind} km/h</p>
              <p className="text-xs text-muted-foreground">Wind</p>
            </div>
            <div className="text-center">
              <Thermometer className="w-5 h-5 mx-auto text-red-400 mb-1" />
              <p className="text-lg font-semibold">32°</p>
              <p className="text-xs text-muted-foreground">Feels like</p>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-card rounded-2xl p-4 shadow-sm border">
          <h3 className="font-semibold text-foreground mb-3">5-Day Forecast</h3>
          <div className="flex justify-between">
            {weatherData.forecast.map((day, index) => {
              const Icon = day.icon;
              return (
                <div key={index} className="text-center flex-1">
                  <p className="text-xs text-muted-foreground mb-2">{day.day}</p>
                  <Icon className={`w-8 h-8 mx-auto mb-1 ${
                    day.icon === Sun ? 'text-agro-sun' : 
                    day.icon === CloudRain ? 'text-agro-sky' : 'text-gray-400'
                  }`} />
                  <p className="font-semibold text-foreground">{day.temp}°</p>
                  <p className="text-xs text-agro-sky">{day.rain}%</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Farming Recommendations */}
        <div className="bg-agro-green-light rounded-2xl p-4">
          <h3 className="font-semibold text-foreground mb-3">🌾 Farming Recommendations</h3>
          <div className="space-y-3">
            {weatherData.recommendations.map((rec, index) => (
              <div key={index} className="flex items-start gap-3 bg-card rounded-xl p-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  rec.priority === 'high' ? 'bg-amber-500' : 'bg-primary'
                }`} />
                <p className="text-sm text-foreground">{rec.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Alert */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CloudRain className="w-4 h-4 text-amber-600" />
            </div>
            <div>
              <h4 className="font-semibold text-amber-800">Rain Alert</h4>
              <p className="text-sm text-amber-700">
                Heavy rainfall expected on Wednesday. Plan your field activities accordingly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
