import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

// Mock data generator - replace with real API call when MARKET_API_KEY is available
function generateMockData(state: string, district: string, commodity: string, market: string) {
  const commodities: Record<string, { minRange: [number, number]; maxRange: [number, number] }> = {
    'Wheat': { minRange: [2000, 2300], maxRange: [2200, 2500] },
    'Rice': { minRange: [1800, 2100], maxRange: [2100, 2400] },
    'Onion': { minRange: [800, 1500], maxRange: [1200, 2000] },
    'Potato': { minRange: [600, 1000], maxRange: [900, 1400] },
    'Tomato': { minRange: [500, 1200], maxRange: [800, 1800] },
    'Cotton': { minRange: [5800, 6500], maxRange: [6200, 7000] },
    'Mustard': { minRange: [4800, 5300], maxRange: [5200, 5700] },
    'Sugarcane': { minRange: [300, 380], maxRange: [350, 420] },
    'Maize': { minRange: [1700, 2000], maxRange: [1900, 2200] },
    'Soybean': { minRange: [3800, 4200], maxRange: [4100, 4600] },
    'Chana (Gram)': { minRange: [4500, 5000], maxRange: [4800, 5400] },
    'Bajra': { minRange: [1800, 2100], maxRange: [2000, 2400] },
    'Jowar': { minRange: [2200, 2600], maxRange: [2500, 2900] },
    'Groundnut': { minRange: [4500, 5200], maxRange: [5000, 5800] },
    'Turmeric': { minRange: [7000, 9000], maxRange: [8000, 11000] },
  };

  const stateMarkets: Record<string, Record<string, string[]>> = {
    'Haryana': {
      'Hisar': ['Hisar Mandi', 'Adampur Mandi', 'Hansi Mandi'],
      'Karnal': ['Karnal Mandi', 'Gharaunda Mandi', 'Nilokheri Mandi'],
      'Ambala': ['Ambala City Mandi', 'Ambala Cantt Mandi'],
      'Sirsa': ['Sirsa Mandi', 'Dabwali Mandi', 'Ellenabad Mandi'],
      'Rohtak': ['Rohtak Mandi', 'Meham Mandi'],
      'Sonipat': ['Sonipat Mandi', 'Ganaur Mandi'],
      'Panipat': ['Panipat Mandi', 'Samalkha Mandi'],
      'Kurukshetra': ['Kurukshetra Mandi', 'Shahabad Mandi', 'Ladwa Mandi'],
      'Jind': ['Jind Mandi', 'Narwana Mandi', 'Safidon Mandi'],
      'Fatehabad': ['Fatehabad Mandi', 'Tohana Mandi'],
      'Bhiwani': ['Bhiwani Mandi', 'Charkhi Dadri Mandi'],
      'Rewari': ['Rewari Mandi', 'Bawal Mandi'],
    },
    'Punjab': {
      'Ludhiana': ['Ludhiana Mandi', 'Khanna Mandi', 'Jagraon Mandi'],
      'Amritsar': ['Amritsar Mandi', 'Ajnala Mandi'],
      'Patiala': ['Patiala Mandi', 'Rajpura Mandi', 'Nabha Mandi'],
      'Bathinda': ['Bathinda Mandi', 'Rampura Phul Mandi'],
      'Jalandhar': ['Jalandhar Mandi', 'Nakodar Mandi', 'Phillaur Mandi'],
      'Sangrur': ['Sangrur Mandi', 'Malerkotla Mandi'],
      'Moga': ['Moga Mandi', 'Nihal Singh Wala Mandi'],
    },
    'Uttar Pradesh': {
      'Lucknow': ['Lucknow Mandi', 'Alambagh Mandi'],
      'Agra': ['Agra Mandi', 'Firozabad Mandi'],
      'Meerut': ['Meerut Mandi', 'Hapur Mandi', 'Ghaziabad Mandi'],
      'Varanasi': ['Varanasi Mandi', 'Chandauli Mandi'],
      'Kanpur': ['Kanpur Mandi', 'Akbarpur Mandi'],
      'Allahabad': ['Prayagraj Mandi'],
      'Bareilly': ['Bareilly Mandi', 'Shahjahanpur Mandi'],
    },
    'Madhya Pradesh': {
      'Indore': ['Indore Mandi', 'Dewas Mandi'],
      'Bhopal': ['Bhopal Mandi', 'Vidisha Mandi'],
      'Jabalpur': ['Jabalpur Mandi', 'Katni Mandi'],
      'Ujjain': ['Ujjain Mandi', 'Nagda Mandi'],
      'Gwalior': ['Gwalior Mandi', 'Morena Mandi'],
    },
    'Rajasthan': {
      'Jaipur': ['Jaipur Mandi', 'Chomu Mandi'],
      'Jodhpur': ['Jodhpur Mandi', 'Pali Mandi'],
      'Kota': ['Kota Mandi', 'Bundi Mandi'],
      'Udaipur': ['Udaipur Mandi', 'Chittorgarh Mandi'],
      'Bikaner': ['Bikaner Mandi', 'Sri Ganganagar Mandi'],
      'Alwar': ['Alwar Mandi', 'Bhiwadi Mandi'],
    },
    'Maharashtra': {
      'Pune': ['Pune Mandi', 'Pimpri-Chinchwad Mandi'],
      'Nashik': ['Nashik Mandi', 'Lasalgaon Mandi', 'Pimpalgaon Mandi'],
      'Nagpur': ['Nagpur Mandi', 'Wardha Mandi'],
      'Ahmednagar': ['Ahmednagar Mandi', 'Shrirampur Mandi'],
      'Solapur': ['Solapur Mandi', 'Pandharpur Mandi'],
    },
    'Gujarat': {
      'Ahmedabad': ['Ahmedabad Mandi', 'Sanand Mandi'],
      'Rajkot': ['Rajkot Mandi', 'Gondal Mandi'],
      'Surat': ['Surat Mandi', 'Navsari Mandi'],
      'Junagadh': ['Junagadh Mandi', 'Veraval Mandi'],
      'Mehsana': ['Mehsana Mandi', 'Unjha Mandi'],
    },
    'Karnataka': {
      'Bangalore': ['Bangalore Mandi', 'Yeshwanthpur Mandi'],
      'Hubli': ['Hubli Mandi', 'Dharwad Mandi'],
      'Mysore': ['Mysore Mandi'],
      'Belgaum': ['Belgaum Mandi', 'Gokak Mandi'],
      'Davangere': ['Davangere Mandi', 'Harihar Mandi'],
    },
  };

  const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
  const trends: Array<'up' | 'down' | 'stable'> = ['up', 'down', 'stable'];

  const filterCommodities = commodity && commodity !== 'All' 
    ? [commodity] 
    : Object.keys(commodities);

  const filterStates = state && state !== 'All' 
    ? [state] 
    : Object.keys(stateMarkets);

  const results: Array<{
    commodity: string;
    market: string;
    district: string;
    state: string;
    date: string;
    min_price: number;
    max_price: number;
    modal_price: number;
    trend: string;
    change_percent: number;
  }> = [];

  const today = new Date().toISOString().split('T')[0];

  for (const s of filterStates) {
    const districts = stateMarkets[s];
    if (!districts) continue;

    const filterDistricts = district && district !== 'All'
      ? [district]
      : Object.keys(districts);

    for (const d of filterDistricts) {
      const markets = districts[d];
      if (!markets) continue;

      const filterMarkets = market && market !== 'All'
        ? markets.filter(m => m === market)
        : markets;

      for (const m of filterMarkets) {
        for (const c of filterCommodities) {
          const config = commodities[c];
          if (!config) continue;

          const minPrice = rand(config.minRange[0], config.minRange[1]);
          const maxPrice = rand(config.maxRange[0], config.maxRange[1]);
          const modalPrice = rand(minPrice, maxPrice);
          const trend = trends[rand(0, 2)];
          const changePercent = trend === 'up' 
            ? +(Math.random() * 5).toFixed(1)
            : trend === 'down' 
              ? -(+(Math.random() * 5).toFixed(1))
              : +(Math.random() * 0.5).toFixed(1);

          results.push({
            commodity: c,
            market: m,
            district: d,
            state: s,
            date: today,
            min_price: minPrice,
            max_price: maxPrice,
            modal_price: modalPrice,
            trend,
            change_percent: changePercent,
          });
        }
      }
    }
  }

  return results.slice(0, 50); // Limit results
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const state = url.searchParams.get('state') || 'All';
    const district = url.searchParams.get('district') || 'All';
    const commodity = url.searchParams.get('commodity') || 'All';
    const market = url.searchParams.get('market') || 'All';

    const apiKey = Deno.env.get('MARKET_API_KEY');

    if (apiKey) {
      // Real API call to data.gov.in Agmarknet resource
      try {
        const params = new URLSearchParams({
          'api-key': apiKey,
          format: 'json',
          limit: '50',
          offset: '0',
        });

        if (state !== 'All') params.append('filters[state.keyword]', state);
        if (district !== 'All') params.append('filters[district]', district);
        if (commodity !== 'All') params.append('filters[commodity]', commodity);
        if (market !== 'All') params.append('filters[market]', market);

        const apiUrl = `https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070?${params.toString()}`;
        const response = await fetch(apiUrl);
        
        if (response.ok) {
          const data = await response.json();
          const records = (data.records || []).map((r: Record<string, string>) => ({
            commodity: r.commodity,
            market: r.market,
            district: r.district,
            state: r.state,
            date: r.arrival_date,
            min_price: parseInt(r.min_price) || 0,
            max_price: parseInt(r.max_price) || 0,
            modal_price: parseInt(r.modal_price) || 0,
            trend: 'stable',
            change_percent: 0,
          }));

          return new Response(
            JSON.stringify({ records, source: 'live', total: data.total || records.length }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          );
        }
      } catch (apiError) {
        console.error('Real API failed, falling back to mock:', apiError);
      }
    }

    // Fallback to mock data
    const records = generateMockData(state, district, commodity, market);
    return new Response(
      JSON.stringify({ records, source: 'mock', total: records.length }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in get-mandi-prices:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
