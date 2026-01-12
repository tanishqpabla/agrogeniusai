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

    // Fetch 5-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(location)},IN&units=metric&appid=${apiKey}`
    const forecastResponse = await fetch(forecastUrl)
    let forecastData = null
    
    if (forecastResponse.ok) {
      forecastData = await forecastResponse.json()
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
      },
      forecast: forecastData ? forecastData.list.filter((_: unknown, index: number) => index % 8 === 0).slice(0, 5).map((item: {
        dt: number;
        main: { temp_max: number; temp_min: number };
        weather: Array<{ icon: string; description: string }>;
      }) => ({
        date: new Date(item.dt * 1000).toLocaleDateString('en-IN', { weekday: 'short' }),
        temp_max: Math.round(item.main.temp_max),
        temp_min: Math.round(item.main.temp_min),
        icon: item.weather[0].icon,
        description: item.weather[0].description,
      })) : [],
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