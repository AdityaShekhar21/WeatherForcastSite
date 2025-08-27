import React, { useState, useEffect } from 'react';
import { Cloud, AlertCircle, Loader } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import SearchBar from './components/SearchBar';
import CityGrid from './components/CityGrid';
import { WeatherData, ForecastData } from './types/weather';
import { getCurrentWeather, getForecast } from './services/weatherApi';

function App() {
  const [selectedCity, setSelectedCity] = useState<string>('New York');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  
  const defaultCities = ['New York', 'London', 'Tokyo', 'Paris', 'Sydney'];
  const [cities, setCities] = useState<string[]>(defaultCities);

  const loadWeatherData = async (city: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [weather, forecast] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city)
      ]);
      
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData(selectedCity);
  }, [selectedCity]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedCity) {
        loadWeatherData(selectedCity);
      }
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [selectedCity]);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowSearch(false);
    
    // Add city to list if not already present
    if (!cities.includes(city)) {
      setCities(prev => [...prev, city]);
    }
  };

  const handleRefresh = () => {
    if (selectedCity) {
      loadWeatherData(selectedCity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600">
      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Cloud size={32} className="text-white" />
              <h1 className="text-2xl font-bold text-white">WeatherNow</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <SearchBar onCitySelect={handleCitySelect} />
              <div className="text-white text-sm">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <CityGrid
              cities={cities}
              selectedCity={selectedCity}
              onCitySelect={handleCitySelect}
              onAddCity={() => setShowSearch(true)}
            />
          </div>

          {/* Weather Content */}
          <div className="lg:col-span-3 space-y-8">
            {isLoading && !weatherData ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center text-white">
                  <Loader size={48} className="animate-spin mx-auto mb-4" />
                  <p className="text-xl">Loading weather data...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-2xl flex items-center space-x-3">
                <AlertCircle size={24} />
                <div>
                  <h3 className="font-semibold">Error loading weather data</h3>
                  <p>{error}</p>
                  <button
                    onClick={handleRefresh}
                    className="mt-2 text-red-600 hover:text-red-800 underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            ) : weatherData ? (
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <WeatherCard
                    weather={weatherData}
                    onRefresh={handleRefresh}
                    isLoading={isLoading}
                  />
                </div>
                <div>
                  {forecastData && <ForecastCard forecast={forecastData} />}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-white">
            <p className="mb-2">WeatherNow - Real-time Weather Information</p>
            <p className="text-sm text-white/70">
              Stay updated with current weather conditions and forecasts for cities worldwide
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;