export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'home-stayer' | 'admin';
  phone?: string;
  address?: string;
}

export interface Room {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  amenities: string[];
  nearbyPlaces: {
    [key: string]: {
      available: boolean;
      distance?: number;
    };
  };
  status: 'available' | 'booked' | 'pending';
  owner: User;
}

export interface Transaction {
  _id: string;
  user: User;
  room: Room;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  paymentDate: string;
  documents: string[];
}

export interface Ad {
  _id: string;
  user: User;
  title: string;
  description: string;
  roomCount: number;
  price: number;
  location: string;
  images: string[];
  amenities: string[];
  nearbyPlaces: {
    [key: string]: {
      available: boolean;
      distance?: number;
    };
  };
  status: 'pending' | 'active' | 'rejected';
  createdAt: string;
}