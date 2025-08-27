import React from 'react';
import { MapPin, Plus } from 'lucide-react';

interface CityGridProps {
  cities: string[];
  selectedCity: string | null;
  onCitySelect: (city: string) => void;
  onAddCity: () => void;
}

const CityGrid: React.FC<CityGridProps> = ({ 
  cities, 
  selectedCity, 
  onCitySelect, 
  onAddCity 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
        <MapPin size={24} className="text-blue-600" />
        <span>Cities</span>
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {cities.map((city) => (
          <button
            key={city}
            onClick={() => onCitySelect(city)}
            className={`p-3 rounded-lg text-center font-medium transition-all duration-200 ${
              selectedCity === city
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {city}
          </button>
        ))}
        
        <button
          onClick={onAddCity}
          className="p-3 rounded-lg text-center font-medium bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all duration-200 border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center space-x-2"
        >
          <Plus size={16} />
          <span>Add City</span>
        </button>
      </div>
    </div>
  );
};

export default CityGrid;