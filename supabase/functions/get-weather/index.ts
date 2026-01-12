import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { location } = await req.json()
    
    if (!location) {
      return new Response(
        JSON.stringify({ error: 'Location is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const apiKey = Deno.env.get('OPENWEATHERMAP_API_KEY')
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Weather API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch current weather
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)},IN&units=metric&appid=${apiKey}`
    const weatherResponse = await fetch(weatherUrl)
    
    if (!weatherResponse.ok) {
      const errorData = await weatherResponse.json()
      console.error('OpenWeatherMap error:', errorData)
      return new Response(
        JSON.stringify({ error: 'Failed to fetch weather data', details: errorData.message }),
        { status: weatherResponse.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const weatherData = await weatherResponse.json()

    // Fetch 7-day forecast (OpenWeatherMap free tier gives 5 days, but we'll get what's available)
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)},IN&units=metric&appid=${apiKey}`
    const forecastResponse = await fetch(forecastUrl)
    let forecastData = null
    
    if (forecastResponse.ok) {
      forecastData = await forecastResponse.json()
    }

    // Process forecast data to get daily summaries (one entry per day)
    const dailyForecast: Array<{
      date: string;
      dayName: string;
      temp_max: number;
      temp_min: number;
      icon: string;
      description: string;
      humidity: number;
      wind_speed: number;
      pop: number; // Probability of precipitation
    }> = [];

    if (forecastData && forecastData.list) {
      const dailyData: Record<string, {
        temps: number[];
        humidity: number[];
        wind: number[];
        pop: number[];
        icons: string[];
        descriptions: string[];
      }> = {};

      forecastData.list.forEach((item: {
        dt: number;
        main: { temp: number; humidity: number };
        wind: { speed: number };
        weather: Array<{ icon: string; description: string }>;
        pop?: number;
      }) => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toISOString().split('T')[0];
        
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            temps: [],
            humidity: [],
            wind: [],
            pop: [],
            icons: [],
            descriptions: [],
          };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
        dailyData[dateKey].humidity.push(item.main.humidity);
        dailyData[dateKey].wind.push(item.wind.speed * 3.6);
        dailyData[dateKey].pop.push(item.pop || 0);
        dailyData[dateKey].icons.push(item.weather[0].icon);
        dailyData[dateKey].descriptions.push(item.weather[0].description);
      });

      // Sort dates and take up to 7 days
      const sortedDates = Object.keys(dailyData).sort().slice(0, 7);
      
      sortedDates.forEach((dateKey) => {
        const data = dailyData[dateKey];
        const date = new Date(dateKey);
        
        dailyForecast.push({
          date: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
          dayName: date.toLocaleDateString('en-IN', { weekday: 'short' }),
          temp_max: Math.round(Math.max(...data.temps)),
          temp_min: Math.round(Math.min(...data.temps)),
          icon: data.icons[Math.floor(data.icons.length / 2)], // Use midday icon
          description: data.descriptions[Math.floor(data.descriptions.length / 2)],
          humidity: Math.round(data.humidity.reduce((a, b) => a + b, 0) / data.humidity.length),
          wind_speed: Math.round(data.wind.reduce((a, b) => a + b, 0) / data.wind.length),
          pop: Math.round(Math.max(...data.pop) * 100), // Max precipitation probability
        });
      });
    }

    // Format the response
    const result = {
      current: {
        temp: Math.round(weatherData.main.temp),
        feels_like: Math.round(weatherData.main.feels_like),
        humidity: weatherData.main.humidity,
        wind_speed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        main: weatherData.weather[0].main,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
      },
      forecast: dailyForecast,
      location: weatherData.name,
    }

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error in get-weather function:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})