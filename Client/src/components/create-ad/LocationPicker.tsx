import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface LocationPickerProps {
  selectedLocation: LatLng | null;
  onLocationSelect: (location: LatLng) => void;
}

const LocationMarker: React.FC<LocationPickerProps> = ({
  selectedLocation,
  onLocationSelect
}) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });

  return selectedLocation ? (
    <Marker position={selectedLocation} />
  ) : null;
};

const LocationPicker: React.FC<LocationPickerProps> = ({
  selectedLocation,
  onLocationSelect
}) => {
  const defaultCenter: LatLng = new LatLng(34.0837, 74.7973); // Srinagar coordinates

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Select Location</h3>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={selectedLocation || defaultCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker
            selectedLocation={selectedLocation}
            onLocationSelect={onLocationSelect}
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default LocationPicker;