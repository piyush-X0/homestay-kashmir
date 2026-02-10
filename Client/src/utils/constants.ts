export const AMENITIES = [
  { id: 'lakeView', label: 'Lake View' },
  { id: 'garden', label: 'Garden' },
  { id: 'wifi', label: 'Free WiFi' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'swimmingPool', label: 'Swimming Pool' },
  { id: 'heater', label: 'Heater' }
] as const;

export const NEARBY_PLACES = [
  { id: 'school', label: 'Schools' },
  { id: 'airport', label: 'Airport' },
  { id: 'hospital', label: 'Hospital' },
  { id: 'busStand', label: 'Bus Stand' }
] as const;

export const DISTANCE_OPTIONS = [
  { value: 1, label: 'Under 1 km' },
  { value: 2, label: 'Under 2 km' },
  { value: 3, label: 'Under 3 km' }
] as const;