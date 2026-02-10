import React from 'react';
import { MapPin } from 'lucide-react';

const destinations = [
  {
    name: 'Dal Lake',
    location: 'Srinagar',
    image: 'https://images.unsplash.com/photo-1683557027360-3011046b22bf?q=80&w=1902&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    properties: 15,
    description: 'Experience the serenity of houseboats and lakeside gardens'
  },
  {
    name: 'Gulmarg',
    location: 'Baramulla',
    image: 'https://images.unsplash.com/photo-1649794759593-ad80231b7b7c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    properties: 12,
    description: 'Ski resorts and stunning mountain views await'
  },
  {
    name: 'Pahalgam',
    location: 'Anantnag',
    image: 'https://images.unsplash.com/photo-1661747340818-df15f186554e?q=80&w=1790&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    properties: 10,
    description: 'Discover the beauty of Lidder Valley'
  },
  {
    name: 'Sonamarg',
    location: 'Ganderbal',
    image: 'https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=600&h=400',
    properties: 8,
    description: 'Gateway to the majestic Thajiwas Glacier'
  }
];

const PopularDestinations = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">Popular Destinations</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Explore our most sought-after locations across Kashmir, each offering unique experiences and breathtaking views
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-xl font-semibold mb-1">{destination.name}</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{destination.location}</span>
                  </div>
                  <p className="text-sm opacity-90">{destination.description}</p>
                  <div className="mt-2 text-sm">
                    <span className="bg-white/20 px-2 py-1 rounded">
                      {destination.properties} properties
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularDestinations;