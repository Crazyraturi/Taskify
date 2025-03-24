
import { toast } from 'sonner';

// Weather data interface
export interface WeatherData {
  location: string;
  temp: number;
  condition: string;
  icon: string;
}

// Cache for weather data to avoid excessive API calls
const weatherCache: Record<string, { data: WeatherData; timestamp: number }> = {};
const CACHE_EXPIRY = 30 * 60 * 1000; // 30 minutes

/**
 * Get weather data for a location
 * Using WeatherAPI.com
 */
export const getWeatherForLocation = async (location: string): Promise<WeatherData | null> => {
  try {
    // Check cache first
    const now = Date.now();
    const cacheKey = location.toLowerCase().trim();
    
    if (
      weatherCache[cacheKey] && 
      now - weatherCache[cacheKey].timestamp < CACHE_EXPIRY
    ) {
      console.log('Returning cached weather data for:', location);
      return weatherCache[cacheKey].data;
    }
    
    // API key - This is a public API key for the demo
    const apiKey = '6661b9978e594f1ab07145010252403';
    const baseUrl = 'https://api.weatherapi.com/v1'; // Changed to https
    
    console.log('Fetching weather data for:', location);
    toast.info(`Fetching weather data for ${location}...`);
    
    // Fetch weather data from WeatherAPI.com using the /current.json endpoint
    const response = await fetch(
      `${baseUrl}/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Weather API error:', errorData);
      
      if (response.status === 404) {
        toast.error(`Location "${location}" not found. Please check spelling.`);
      } else {
        toast.error(`Weather API error: ${errorData.error?.message || response.statusText}`);
      }
      
      return null;
    }
    
    const data = await response.json();
    console.log('Weather API response:', data); // Log the full response for debugging
    
    // Format response
    const weatherData: WeatherData = {
      location: data.location.name,
      temp: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      icon: 'https:' + data.current.condition.icon, // Add https: prefix to icon URLs
    };
    
    // Cache the result
    weatherCache[cacheKey] = {
      data: weatherData,
      timestamp: now,
    };
    
    toast.success(`Weather data loaded for ${weatherData.location}`);
    return weatherData;
  } catch (error) {
    console.error('Failed to fetch weather:', error);
    toast.error('Network error fetching weather data. Please try again.');
    return null;
  }
};

/**
 * Get weather data with error handling
 */
export const fetchWeatherWithErrorHandling = async (location: string): Promise<WeatherData | null> => {
  try {
    if (!location) return null;
    
    const weatherData = await getWeatherForLocation(location);
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    toast.error('Failed to fetch weather data');
    return null;
  }
};
