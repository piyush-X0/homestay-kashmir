import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Upload, AlertCircle, MapPin, Wifi, Coffee, Car, ThermometerSun, Trees, Waves, Snowflake } from 'lucide-react';
import api from '../utils/api';
import { Room } from '../interfaces/Room';

// Static mapping of room IDs to image paths in public/owner-photos/
const ownerPhotos: { [key: string]: string } = {
  '67cb96e10d88d583451a981e': '/owner-photos/67cb96e10d88d583451a981e.jpg',
  '67cb97180d88d583451a985a': '/owner-photos/67cb97180d88d583451a985a.jpg',
  '67cb970e0d88d583451a9850': '/owner-photos/67cb970e0d88d583451a9850.jpg',
  '67cb97070d88d583451a9846': '/owner-photos/67cb97070d88d583451a9846.jpg',
  '67cb96f10d88d583451a9833': '/owner-photos/67cb96f10d88d583451a9833.jpg',
  '67cb96eb0d88d583451a9829': '/owner-photos/67cb96eb0d88d583451a9829.jpg',
  '67cb97290d88d583451a9864': '/owner-photos/67cb97290d88d583451a9864.jpg',
  '67cb96d70d88d583451a9814': '/owner-photos/67cb96d70d88d583451a9814.jpg',
  '67cb96d00d88d583451a980b': '/owner-photos/67cb96d00d88d583451a980b.jpg',
  '67cb96cd0d88d583451a9800': '/owner-photos/67cb96cd0d88d583451a9800.jpg',
  '67cbaa6c0d88d583451a9a7b': '/owner-photos/67cbaa6c0d88d583451a9a7b.jpg',
  '67c81327f5de3b39504f3f93': '/owner-photos/67c81327f5de3b39504f3f93.jpg',
  '67cbaa650d88d583451a9a71': '/owner-photos/67cbaa650d88d583451a9a71.jpg',
  '67cbaa610d88d583451a9a67': '/owner-photos/67cbaa610d88d583451a9a67.jpg',
  '67cbaa5d0d88d583451a9a5d': '/owner-photos/67cbaa5d0d88d583451a9a5d.jpg',
  '67cbaa5a0d88d583451a9a53': '/owner-photos/67cbaa5a0d88d583451a9a53.jpg',
  '67cbaa560d88d583451a9a49': '/owner-photos/67cbaa560d88d583451a9a49.jpg',
  '67cbaa520d88d583451a9a3f': '/owner-photos/67cbaa520d88d583451a9a3f.jpg',
  '67cbaa4e0d88d583451a9a35': '/owner-photos/67cbaa4e0d88d583451a9a35.jpg',
  '67cbaa4a0d88d583451a9a2b': '/owner-photos/67cbaa4a0d88d583451a9a2b.jpg',
  '67cbaa430d88d583451a9a21': '/owner-photos/67cbaa430d88d583451a9a21.jpg',
  '67cbaa400d88d583451a9a17': '/owner-photos/67cbaa400d88d583451a9a17.jpg',
  '67cbaa390d88d583451a9a0d': '/owner-photos/67cbaa390d88d583451a9a0d.jpg',
  '67cbaa350d88d583451a9a03': '/owner-photos/67cbaa350d88d583451a9a03.jpg',
  '67cbaa310d88d583451a99f9': '/owner-photos/67cbaa310d88d583451a99f9.jpg',
  '67cbaa2d0d88d583451a99ee': '/owner-photos/67cbaa2d0d88d583451a99ee.jpg',
  '67cbaa1e0d88d583451a99d0': '/owner-photos/67cbaa1e0d88d583451a99d0.jpg',
  '67cbaa190d88d583451a99c6': '/owner-photos/67cbaa190d88d583451a99c6.jpg',
  '67cbaa160d88d583451a99bc': '/owner-photos/67cbaa160d88d583451a99bc.jpg',
  '67cbaa120d88d583451a99b2': '/owner-photos/67cbaa120d88d583451a99b2.jpg',
  '67cc6c6d12793d019edf7692': '/owner-photos/67cc6c6d12793d019edf7692.jpg',
  '67cc6c6412793d019edf7676': '/owner-photos/67cc6c6412793d019edf7676.jpg',
  '67cc6c8f12793d019edf7717': '/owner-photos/67cc6c8f12793d019edf7717.jpg',
  '67cc6c6212793d019edf766c': '/owner-photos/67cc6c6212793d019edf766c.jpg',
  '67cc6c6012793d019edf7662': '/owner-photos/67cc6c6012793d019edf7662.jpg',
  '67cc6c9512793d019edf772b': '/owner-photos/67cc6c9512793d019edf772b.jpg',
  '67cc6c5d12793d019edf7657': '/owner-photos/67cc6c5d12793d019edf7657.jpg',
  '67cc6c7012793d019edf769d': '/owner-photos/67cc6c7012793d019edf769d.jpg',
  '67cc6c5a12793d019edf764d': '/owner-photos/67cc6c5a12793d019edf764d.jpg',
  '67cc6c7212793d019edf76a7': '/owner-photos/67cc6c7212793d019edf76a7.jpg',
  '67cc6c7312793d019edf76b1': '/owner-photos/67cc6c7312793d019edf76b1.jpg',
  '67cc6c5612793d019edf7639': '/owner-photos/67cc6c5612793d019edf7639.jpg',
  '67cc6c7512793d019edf76bb': '/owner-photos/67cc6c7512793d019edf76bb.jpg',
  '67cc6c7712793d019edf76c5': '/owner-photos/67cc6c7712793d019edf76c5.jpg',
  '67cc6c5012793d019edf7625': '/owner-photos/67cc6c5012793d019edf7625.jpg',
  '67cc6c7812793d019edf76d0': '/owner-photos/67cc6c7812793d019edf76d0.jpg',
  '67cc6c4c12793d019edf7611': '/owner-photos/67cc6c4c12793d019edf7611.jpg',
  '67cc6c4412793d019edf7607': '/owner-photos/67cc6c4412793d019edf7607.jpg',
  '67cc6c4112793d019edf75f1': '/owner-photos/67cc6c4112793d019edf75f1.jpg',
  '67cc6c3112793d019edf75e7': '/owner-photos/67cc6c3112793d019edf75e7.jpg',
  '67cc6c2812793d019edf75dd': '/owner-photos/67cc6c2812793d019edf75dd.jpg',
  '67cc6c2312793d019edf75d3': '/owner-photos/67cc6c2312793d019edf75d3.jpg',
  '67cc6c1f12793d019edf75c9': '/owner-photos/67cc6c1f12793d019edf75c9.jpg',
  '67cc6c1a12793d019edf75bf': '/owner-photos/67cc6c1a12793d019edf75bf.jpg',
  '67cc6c1612793d019edf75b5': '/owner-photos/67cc6c1612793d019edf75b5.jpg',
  '67cc6c1212793d019edf75ab': '/owner-photos/67cc6c1212793d019edf75ab.jpg',
  '67cc6c0d12793d019edf75a1': '/owner-photos/67cc6c0d12793d019edf75a1.jpg',
  '67cc6c0a12793d019edf7597': '/owner-photos/67cc6c0a12793d019edf7597.jpg',
  '67cc6c0512793d019edf758d': '/owner-photos/67cc6c0512793d019edf758d.jpg',
  '67cc6bff12793d019edf7583': '/owner-photos/67cc6bff12793d019edf7583.jpg'
};

const BookingPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [documents, setDocuments] = useState<FileList | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/rooms/${roomId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
          withCredentials: true,
        });
        console.log('Room API response:', response.data);
        setRoom(response.data);
      } catch (error: any) {
        console.error('Failed to fetch room:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message,
        });
        setError(error.response?.data?.message || 'Failed to fetch room details');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await initializeRazorpay();
      if (!res) {
        setError('Razorpay SDK failed to load');
        return;
      }

      const orderResponse = await api.post('/payment/create-order', {
        amount: room?.price,
        roomId,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "HomeStay Kashmir",
        description: `Booking for ${room?.title}`,
        order_id: orderResponse.data.id,
        handler: async (response: any) => {
          try {
            const formData = new FormData();
            if (documents) {
              Array.from(documents).forEach(file => formData.append('documents', file));
            }
            formData.append('paymentId', response.razorpay_payment_id);
            formData.append('orderId', response.razorpay_order_id);
            formData.append('signature', response.razorpay_signature);

            await api.post(`/rooms/${roomId}/book`, formData, {
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
            });

            navigate('/transactions');
          } catch (error: any) {
            setError(error.response?.data?.message || 'Booking failed');
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: { color: "#4F46E5" },
      };

      const paymentObject = new (window as any).Razorpay(options);
      paymentObject.open();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Payment initialization failed');
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
        <div className="max-w-2xl mx-auto">
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <p className="ml-3 text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const ownerImage = roomId && ownerPhotos[roomId] ? ownerPhotos[roomId] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

        {/* Full-width Property Image */}
        {ownerImage ? (
          <div className="mb-8">
            <img
              src={ownerImage}
              alt="Property preview"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        ) : (
          <div className="mb-8">
            <div className="w-full h-64 bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-500">
              No image available
            </div>
          </div>
        )}

        {/* Room Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">{room?.title}</h2>
          <div className="space-y-4">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <span>{room?.location?.lat && room?.location?.lng ? `${room.location.lat}, ${room.location.lng}` : 'Location unavailable'}</span>
            </div>
            <p className="text-gray-600">{room?.description || 'No description available'}</p>
            <div>
              <h3 className="text-lg font-medium mb-2">Amenities</h3>
              {room?.amenities && room.amenities.length > 0 ? (
                <div className="grid grid-cols-2 gap-2">
                  {room.amenities.map((amenity, index) => (
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
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No amenities listed</p>
              )}
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Nearby Places</h3>
              {room?.nearbyPlaces && (room.nearbyPlaces.hospital || room.nearbyPlaces.market || room.nearbyPlaces.tourist?.length > 0) ? (
                <ul className="list-disc list-inside text-gray-600">
                  <li>Hospital: {room.nearbyPlaces.hospital || 'N/A'}</li>
                  <li>Market: {room.nearbyPlaces.market || 'N/A'}</li>
                  <li>Tourist Spots: {room.nearbyPlaces.tourist?.length > 0 ? room.nearbyPlaces.tourist.join(', ') : 'N/A'}</li>
                </ul>
              ) : (
                <p className="text-gray-500">No nearby places listed</p>
              )}
            </div>
            <p><span className="font-medium">Price:</span> ₹{room?.price || 0}/night</p>
            <p><span className="font-medium">Furnished:</span> {room?.furnished ? 'Yes' : 'No'}</p>
            <p><span className="font-medium">AC:</span> {room?.ac ? 'Yes' : 'No'}</p>
            <p><span className="font-medium">Heater:</span> {room?.heater ? 'Yes' : 'No'}</p>
          </div>
        </div>

        {/* Host Information Section */}
        {room?.owner && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Hosted By</h2>
            <div>
              <p className="text-lg font-medium">{room.owner.name || 'Unknown Host'}</p>
              <p className="text-gray-600">{room.owner.email || 'No email provided'}</p>
            </div>
          </div>
        )}

        {/* Booking Form */}
        <form onSubmit={handlePayment} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Upload Documents</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                    <span>Upload files</span>
                    <input
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={(e) => setDocuments(e.target.files)}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={!room || !user}
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingPage;