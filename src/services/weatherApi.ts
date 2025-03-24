
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
 * Using OpenWeatherMap API
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
      return weatherCache[cacheKey].data;
    }
    
    // API key - in a real app, this would be stored in environment variables
    // Using a free API key for demo purposes
    const apiKey = 'bf1b5b65bae5d1052f8dbfbadfe4d680';
    
    // Fetch weather data
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&units=metric&appid=${apiKey}`
    );
    
    if (!response.ok) {
      throw new Error(`Weather API error: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Format response
    const weatherData: WeatherData = {
      location: data.name,
      temp: Math.round(data.main.temp),
      condition: data.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
    
    // Cache the result
    weatherCache[cacheKey] = {
      data: weatherData,
      timestamp: now,
    };
    
    return weatherData;
  } catch (error) {
    console.error('Failed to fetch weather:', error);
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
