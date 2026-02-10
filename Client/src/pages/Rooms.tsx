import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import RoomCard from '../components/rooms/RoomCard';
import { Room } from '../interfaces/Room';

const Rooms: React.FC = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/rooms', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        console.log('Rooms API response:', response.data); // Debug log
        setRooms(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load rooms');
        console.error('Error fetching rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleBookRoom = (roomId: string) => {
    if (!isAuthenticated) {
      localStorage.setItem('pendingBookingRoomId', roomId);
      navigate('/signin', {
        state: {
          from: {
            pathname: `/book/${roomId}`,
            search: window.location.search,
          },
        },
      });
    } else {
      navigate(`/book/${roomId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Available Rooms</h1>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Available Rooms</h1>
      {rooms.length === 0 ? (
        <p>No rooms available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => (
            <RoomCard
              key={room._id} // Changed from room.id to room._id
              room={room}
              onBook={() => handleBookRoom(room._id)} // Changed to room._id
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Rooms;