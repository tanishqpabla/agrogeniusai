import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CurrentWeather {
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  description: string;
  icon: string;
  main: string;
}

interface ForecastDay {
  date: string;
  temp_max: number;
  temp_min: number;
  icon: string;
  description: string;
}

interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
  location: string;
}

export const useWeather = (location: string | undefined) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (!location) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const { data, error: fnError } = await supabase.functions.invoke('get-weather', {
          body: { location }
        });

        if (fnError) {
          throw new Error(fnError.message);
        }

        if (data.error) {
          throw new Error(data.error);
        }

        setWeather(data);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return { weather, loading, error };
};

// Weather icon mapping
export const getWeatherIcon = (iconCode: string): string => {
  const iconMap: Record<string, string> = {
    '01d': '☀️',
    '01n': '🌙',
    '02d': '⛅',
    '02n': '☁️',
    '03d': '☁️',
    '03n': '☁️',
    '04d': '☁️',
    '04n': '☁️',
    '09d': '🌧️',
    '09n': '🌧️',
    '10d': '🌦️',
    '10n': '🌧️',
    '11d': '⛈️',
    '11n': '⛈️',
    '13d': '❄️',
    '13n': '❄️',
    '50d': '🌫️',
    '50n': '🌫️',
  };
  return iconMap[iconCode] || '🌤️';
};

// Get farming tip based on weather
export const getFarmingTip = (weather: CurrentWeather): string => {
  const { main, temp, humidity, wind_speed } = weather;
  
  if (main === 'Rain' || main === 'Thunderstorm') {
    return '🌧️ Rain expected. Avoid spraying pesticides and delay irrigation.';
  }
  if (main === 'Clear' && temp > 35) {
    return '🔥 High temperature! Water crops in early morning or evening.';
  }
  if (main === 'Clear' && temp >= 20 && temp <= 30) {
    return '🌾 Perfect weather for wheat sowing and field work.';
  }
  if (humidity > 80) {
    return '💧 High humidity. Watch for fungal diseases in crops.';
  }
  if (wind_speed > 20) {
    return '💨 Strong winds. Secure crop covers and avoid spraying.';
  }
  if (main === 'Clouds') {
    return '☁️ Overcast sky. Good conditions for transplanting.';
  }
  
  return '🌱 Good weather for regular farming activities.';
};