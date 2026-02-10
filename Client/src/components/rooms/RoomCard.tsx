import React, { useState } from 'react';
import { MapPin, Wifi, Coffee, Car, ThermometerSun, Trees, Waves, Snowflake } from 'lucide-react';
import PhotoCarousel from '../photos/PhotoCarousel';
import PhotoGallery from '../photos/PhotoGallary';

interface RoomCardProps {
  room: Room;
  onBook: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ room, onBook }) => {
  const [showGallery, setShowGallery] = useState(false);

  const locationStr = room.location?.lat && room.location?.lng
    ? `${room.location.lat}, ${room.location.lng}`
    : "Location unavailable";

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {room.images?.length > 0 ? (
        <PhotoCarousel
          photos={room.images}
          onPhotoClick={() => setShowGallery(true)}
        />
      ) : (
        <div className="h-40 bg-gray-200 flex items-center justify-center">
          <span className="text-gray-500">No images available</span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{room.title || "Untitled Room"}</h3>
        <div className="flex items-center text-gray-600 mb-4">
          <MapPin className="h-5 w-5 mr-2" />
          <span>{locationStr}</span>
        </div>
        <p className="text-gray-600 mb-4">{room.description || "No description available"}</p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {room.amenities?.length > 0 ? (
            room.amenities.map((amenity, index) => (
              <div key={index} className="flex items-center">
                {amenity === "wifi" && <Wifi className="h-5 w-5 mr-2 text-gray-500" />}
                {amenity === "breakfast" && <Coffee className="h-5 w-5 mr-2 text-gray-500" />}
                {amenity === "parking" && <Car className="h-5 w-5 mr-2 text-gray-500" />}
                {amenity === "heater" && <ThermometerSun className="h-5 w-5 mr-2 text-gray-500" />}
                {amenity === "lakeView" && <Snowflake className="h-5 w-5 mr-2 text-gray-500" />}
                {amenity === "garden" && <Trees className="h-5 w-5 mr-2 text-gray-500" />}
                {amenity === "swimmingPool" && <Waves className="h-5 w-5 mr-2 text-gray-500" />}
                <span className="capitalize">{amenity}</span>
              </div>
            ))
          ) : (
            <span className="text-gray-500">No amenities listed</span>
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-indigo-600">
            ₹{room.price || 0}/night
          </div>
          <button
            onClick={onBook}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
      {showGallery && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
          <button
            onClick={() => setShowGallery(false)}
            className="absolute top-4 right-4 text-white"
            aria-label="Close gallery"
          >
            Close
          </button>
          <div className="h-full flex items-center justify-center">
            <PhotoGallery photos={room.images || []} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;