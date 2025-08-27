import React from 'react';
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  Gauge,
  Sunrise,
  Sunset,
  RefreshCw
} from 'lucide-react';
import { WeatherData } from '../types/weather';

interface WeatherCardProps {
  weather: WeatherData;
  onRefresh: () => void;
  isLoading?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, onRefresh, isLoading }) => {
  const getWeatherIcon = (iconCode: string) => {
    const iconMap: { [key: string]: string } = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️'
    };
    return iconMap[iconCode] || '🌤️';
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{weather.name}</h2>
          <p className="text-gray-500">{weather.sys.country}</p>
        </div>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors disabled:opacity-50"
        >
          <RefreshCw 
            size={20} 
            className={`text-blue-600 ${isLoading ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>

      {/* Main Weather Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="text-6xl">
            {getWeatherIcon(weather.weather[0].icon)}
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-800">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="text-gray-600 capitalize">
              {weather.weather[0].description}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Feels like</div>
          <div className="text-xl font-semibold text-gray-700">
            {Math.round(weather.main.feels_like)}°C
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Thermometer size={16} className="text-blue-600" />
            <span className="text-sm text-gray-600">Min/Max</span>
          </div>
          <div className="font-semibold text-gray-800">
            {Math.round(weather.main.temp_min)}° / {Math.round(weather.main.temp_max)}°
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Droplets size={16} className="text-green-600" />
            <span className="text-sm text-gray-600">Humidity</span>
          </div>
          <div className="font-semibold text-gray-800">{weather.main.humidity}%</div>
        </div>

        <div className="bg-purple-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Wind size={16} className="text-purple-600" />
            <span className="text-sm text-gray-600">Wind</span>
          </div>
          <div className="font-semibold text-gray-800">{weather.wind.speed} m/s</div>
        </div>

        <div className="bg-orange-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-1">
            <Gauge size={16} className="text-orange-600" />
            <span className="text-sm text-gray-600">Pressure</span>
          </div>
          <div className="font-semibold text-gray-800">{weather.main.pressure} hPa</div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Eye size={16} className="text-gray-500" />
          <span className="text-gray-600">Visibility: {weather.visibility / 1000} km</span>
        </div>
        <div className="flex items-center space-x-2">
          <Sunrise size={16} className="text-yellow-500" />
          <span className="text-gray-600">Sunrise: {formatTime(weather.sys.sunrise)}</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;