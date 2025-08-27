import React from 'react';
import { Calendar } from 'lucide-react';
import { ForecastData } from '../types/weather';

interface ForecastCardProps {
  forecast: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecast }) => {
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

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar size={24} className="text-blue-600" />
        <h3 className="text-xl font-bold text-gray-800">5-Day Forecast</h3>
        <span className="text-gray-500">• {forecast.city.name}</span>
      </div>

      <div className="space-y-4">
        {forecast.list.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className="text-2xl">
                {getWeatherIcon(item.weather[0].icon)}
              </div>
              <div>
                <div className="font-semibold text-gray-800">
                  {formatDate(item.dt)}
                </div>
                <div className="text-sm text-gray-600 capitalize">
                  {item.weather[0].description}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-bold text-lg text-gray-800">
                {Math.round(item.main.temp)}°C
              </div>
              <div className="text-sm text-gray-500">
                {Math.round(item.main.temp_min)}° / {Math.round(item.main.temp_max)}°
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;