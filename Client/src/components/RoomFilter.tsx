import React, { useState } from 'react';
import { Search, MapPin, Home, IndianRupee } from 'lucide-react';

const RoomFilter = () => {
  const [location, setLocation] = useState('');
  const [roomType, setRoomType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement filter logic
    console.log({ location, roomType, priceRange });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 -mt-16 relative z-10">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where to?"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
          <div className="relative">
            <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="">Select type</option>
              <option value="private">Private Room</option>
              <option value="shared">Shared Room</option>
              <option value="entire">Entire Place</option>
            </select>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
          <div className="relative">
            <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 appearance-none"
            >
              <option value="">Select range</option>
              <option value="0-1000">₹0 - ₹1,000</option>
              <option value="1000-2000">₹1,000 - ₹2,000</option>
              <option value="2000-5000">₹2,000 - ₹5,000</option>
              <option value="5000+">₹5,000+</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default RoomFilter;