import { useState, useCallback } from 'react';

export interface MandiPrice {
  commodity: string;
  market: string;
  district: string;
  state: string;
  date: string;
  min_price: number;
  max_price: number;
  modal_price: number;
  trend: 'up' | 'down' | 'stable';
  change_percent: number;
}

export interface MandiFilters {
  state: string;
  district: string;
  commodity: string;
  market: string;
}

interface MandiResponse {
  records: MandiPrice[];
  source: 'live' | 'mock';
  total: number;
}

export const STATES = [
  'All', 'Haryana', 'Punjab', 'Uttar Pradesh', 'Madhya Pradesh',
  'Rajasthan', 'Maharashtra', 'Gujarat', 'Karnataka',
];

export const DISTRICTS: Record<string, string[]> = {
  'All': ['All'],
  'Haryana': ['All', 'Hisar', 'Karnal', 'Ambala', 'Sirsa', 'Rohtak', 'Sonipat', 'Panipat', 'Kurukshetra', 'Jind', 'Fatehabad', 'Bhiwani', 'Rewari'],
  'Punjab': ['All', 'Ludhiana', 'Amritsar', 'Patiala', 'Bathinda', 'Jalandhar', 'Sangrur', 'Moga'],
  'Uttar Pradesh': ['All', 'Lucknow', 'Agra', 'Meerut', 'Varanasi', 'Kanpur', 'Allahabad', 'Bareilly'],
  'Madhya Pradesh': ['All', 'Indore', 'Bhopal', 'Jabalpur', 'Ujjain', 'Gwalior'],
  'Rajasthan': ['All', 'Jaipur', 'Jodhpur', 'Kota', 'Udaipur', 'Bikaner', 'Alwar'],
  'Maharashtra': ['All', 'Pune', 'Nashik', 'Nagpur', 'Ahmednagar', 'Solapur'],
  'Gujarat': ['All', 'Ahmedabad', 'Rajkot', 'Surat', 'Junagadh', 'Mehsana'],
  'Karnataka': ['All', 'Bangalore', 'Hubli', 'Mysore', 'Belgaum', 'Davangere'],
};

export const COMMODITIES = [
  'All', 'Wheat', 'Rice', 'Onion', 'Potato', 'Tomato', 'Cotton',
  'Mustard', 'Sugarcane', 'Maize', 'Soybean', 'Chana (Gram)',
  'Bajra', 'Jowar', 'Groundnut', 'Turmeric',
];

export function useMandiPrices() {
  const [prices, setPrices] = useState<MandiPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<'live' | 'mock' | null>(null);

  const fetchPrices = useCallback(async (filters: MandiFilters) => {
    setLoading(true);
    setError(null);

    try {
      const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/get-mandi-prices?state=${encodeURIComponent(filters.state)}&district=${encodeURIComponent(filters.district)}&commodity=${encodeURIComponent(filters.commodity)}&market=${encodeURIComponent(filters.market)}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch market data');
      }

      const responseData: MandiResponse = await response.json();
      setPrices(responseData.records);
      setSource(responseData.source);
    } catch (err) {
      console.error('Error fetching mandi prices:', err);
      setError('Unable to fetch market data. Please try again later.');
      setPrices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { prices, loading, error, source, fetchPrices };
}
