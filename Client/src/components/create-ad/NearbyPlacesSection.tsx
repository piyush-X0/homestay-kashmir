import React from 'react';
import { NEARBY_PLACES, DISTANCE_OPTIONS } from '../../utils/constants';

interface NearbyPlace {
  available: boolean;
  distance?: number;
}

interface NearbyPlacesSectionProps {
  nearbyPlaces: Record<string, NearbyPlace>;
  onUpdateNearbyPlace: (placeId: string, data: NearbyPlace) => void;
}

const NearbyPlacesSection: React.FC<NearbyPlacesSectionProps> = ({
  nearbyPlaces,
  onUpdateNearbyPlace
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Nearby Places</h3>
      <div className="space-y-4">
        {NEARBY_PLACES.map((place) => (
          <div key={place.id} className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={nearbyPlaces[place.id]?.available || false}
                onChange={(e) =>
                  onUpdateNearbyPlace(place.id, {
                    ...nearbyPlaces[place.id],
                    available: e.target.checked
                  })
                }
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span>{place.label}</span>
            </label>

            {nearbyPlaces[place.id]?.available && (
              <select
                value={nearbyPlaces[place.id]?.distance || ''}
                onChange={(e) =>
                  onUpdateNearbyPlace(place.id, {
                    ...nearbyPlaces[place.id],
                    distance: Number(e.target.value)
                  })
                }
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select distance</option>
                {DISTANCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyPlacesSection;