interface Location {
  lat: number | null;
  lng: number | null;
  _id?: string;
}

interface NearbyPlaces {
  hospital: string;
  market: string;
  tourist: string[];
}

export interface Room {
  _id: string;
  title: string;
  images: string[];
  price: number;
  description: string;
  amenities: string[];
  location: Location;
  nearbyPlaces: NearbyPlaces;
  furnished: boolean;
  ac: boolean;
  heater: boolean;
  status: string;
  owner: {
    _id: string;
    name: string;
    email: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}