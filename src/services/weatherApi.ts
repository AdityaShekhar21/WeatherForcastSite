import { WeatherData, ForecastData, City } from '../types/weather';

const API_KEY = 'demo_key'; // In production, use environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// For demo purposes, we'll use mock data since we don't have a real API key
const mockWeatherData: { [key: string]: WeatherData } = {
  'new york': {
    id: 5128581,
    name: 'New York',
    country: 'US',
    coord: { lat: 40.7128, lon: -74.0060 },
    main: {
      temp: 22,
      feels_like: 24,
      temp_min: 18,
      temp_max: 26,
      pressure: 1013,
      humidity: 65
    },
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: { speed: 3.5, deg: 180 },
    clouds: { all: 0 },
    visibility: 10000,
    dt: Date.now() / 1000,
    sys: {
      country: 'US',
      sunrise: 1640000000,
      sunset: 1640040000
    },
    timezone: -18000
  },
  'london': {
    id: 2643743,
    name: 'London',
    country: 'GB',
    coord: { lat: 51.5074, lon: -0.1278 },
    main: {
      temp: 15,
      feels_like: 13,
      temp_min: 12,
      temp_max: 18,
      pressure: 1020,
      humidity: 78
    },
    weather: [{
      id: 803,
      main: 'Clouds',
      description: 'broken clouds',
      icon: '04d'
    }],
    wind: { speed: 4.2, deg: 220 },
    clouds: { all: 75 },
    visibility: 8000,
    dt: Date.now() / 1000,
    sys: {
      country: 'GB',
      sunrise: 1640005000,
      sunset: 1640035000
    },
    timezone: 0
  },
  'tokyo': {
    id: 1850147,
    name: 'Tokyo',
    country: 'JP',
    coord: { lat: 35.6762, lon: 139.6503 },
    main: {
      temp: 28,
      feels_like: 31,
      temp_min: 25,
      temp_max: 32,
      pressure: 1008,
      humidity: 72
    },
    weather: [{
      id: 500,
      main: 'Rain',
      description: 'light rain',
      icon: '10d'
    }],
    wind: { speed: 2.8, deg: 90 },
    clouds: { all: 60 },
    visibility: 7000,
    dt: Date.now() / 1000,
    sys: {
      country: 'JP',
      sunrise: 1639995000,
      sunset: 1640030000
    },
    timezone: 32400
  },
  'paris': {
    id: 2988507,
    name: 'Paris',
    country: 'FR',
    coord: { lat: 48.8566, lon: 2.3522 },
    main: {
      temp: 19,
      feels_like: 18,
      temp_min: 16,
      temp_max: 22,
      pressure: 1015,
      humidity: 68
    },
    weather: [{
      id: 801,
      main: 'Clouds',
      description: 'few clouds',
      icon: '02d'
    }],
    wind: { speed: 3.1, deg: 200 },
    clouds: { all: 20 },
    visibility: 10000,
    dt: Date.now() / 1000,
    sys: {
      country: 'FR',
      sunrise: 1640003000,
      sunset: 1640037000
    },
    timezone: 3600
  },
  'sydney': {
    id: 2147714,
    name: 'Sydney',
    country: 'AU',
    coord: { lat: -33.8688, lon: 151.2093 },
    main: {
      temp: 25,
      feels_like: 27,
      temp_min: 22,
      temp_max: 28,
      pressure: 1018,
      humidity: 60
    },
    weather: [{
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01d'
    }],
    wind: { speed: 4.5, deg: 150 },
    clouds: { all: 5 },
    visibility: 10000,
    dt: Date.now() / 1000,
    sys: {
      country: 'AU',
      sunrise: 1639990000,
      sunset: 1640045000
    },
    timezone: 39600
  }
};

export const getCurrentWeather = async (city: string): Promise<WeatherData> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const cityKey = city.toLowerCase();
  const data = mockWeatherData[cityKey];
  
  if (!data) {
    throw new Error('City not found');
  }
  
  // Add some randomness to simulate real-time updates
  const variation = (Math.random() - 0.5) * 4; // ±2 degrees
  return {
    ...data,
    main: {
      ...data.main,
      temp: Math.round((data.main.temp + variation) * 10) / 10
    }
  };
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const cityKey = city.toLowerCase();
  const baseData = mockWeatherData[cityKey];
  
  if (!baseData) {
    throw new Error('City not found');
  }
  
  // Generate 5-day forecast
  const forecast = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    
    const tempVariation = (Math.random() - 0.5) * 6;
    forecast.push({
      dt: date.getTime() / 1000,
      main: {
        temp: Math.round((baseData.main.temp + tempVariation) * 10) / 10,
        temp_min: Math.round((baseData.main.temp_min + tempVariation) * 10) / 10,
        temp_max: Math.round((baseData.main.temp_max + tempVariation) * 10) / 10,
        humidity: baseData.main.humidity + Math.floor((Math.random() - 0.5) * 20)
      },
      weather: baseData.weather,
      dt_txt: date.toISOString()
    });
  }
  
  return {
    list: forecast,
    city: {
      name: baseData.name,
      country: baseData.country
    }
  };
};

export const searchCities = async (query: string): Promise<City[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const cities = Object.values(mockWeatherData).map(data => ({
    name: data.name,
    country: data.country,
    lat: data.coord.lat,
    lon: data.coord.lon
  }));
  
  return cities.filter(city => 
    city.name.toLowerCase().includes(query.toLowerCase())
  );
};