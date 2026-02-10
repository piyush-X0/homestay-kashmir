import React from 'react';
import { Toggle } from '../ui/Toggle';
import { AMENITIES } from '../../utils/constants';

interface AmenitiesSectionProps {
  selectedAmenities: Set<string>;
  onToggleAmenity: (amenityId: string) => void;
}

const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({
  selectedAmenities,
  onToggleAmenity
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {AMENITIES.map((amenity) => (
          <Toggle
            key={amenity.id}
            pressed={selectedAmenities.has(amenity.id)}
            onPressedChange={() => onToggleAmenity(amenity.id)}
            className="w-full"
          >
            {amenity.label}
          </Toggle>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;