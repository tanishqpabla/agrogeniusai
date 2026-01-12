import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  loading: boolean;
  error: string | null;
  coordinates: {
    latitude: number;
    longitude: number;
  } | null;
  city: string | null;
}

export const useGeolocation = () => {
  const [state, setState] = useState<GeolocationState>({
    loading: false,
    error: null,
    coordinates: null,
    city: null,
  });

  const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'AgroGeniusAI/1.0',
          },
        }
      );
      const data = await response.json();
      
      // Try to get city, town, village, or district
      const city = 
        data.address?.city || 
        data.address?.town || 
        data.address?.village || 
        data.address?.district ||
        data.address?.county ||
        data.address?.state_district ||
        'Unknown Location';
      
      return city;
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return 'Unknown Location';
    }
  };

  const getCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser',
        loading: false,
      }));
      return null;
    }

    setState(prev => ({ ...prev, loading: true, error: null }));

    return new Promise<{ city: string; coordinates: { latitude: number; longitude: number } } | null>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const city = await reverseGeocode(latitude, longitude);
          
          setState({
            loading: false,
            error: null,
            coordinates: { latitude, longitude },
            city,
          });
          
          resolve({ city, coordinates: { latitude, longitude } });
        },
        (error) => {
          let errorMessage = 'Failed to get location';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          
          setState({
            loading: false,
            error: errorMessage,
            coordinates: null,
            city: null,
          });
          
          resolve(null);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // Cache for 5 minutes
        }
      );
    });
  }, []);

  return {
    ...state,
    getCurrentLocation,
  };
};
