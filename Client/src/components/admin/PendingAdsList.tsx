import  { useState, useEffect } from 'react';
import { CheckCircle, XCircle, MapPin, IndianRupee, BedDouble, Image } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../utils/api';
import { getImageUrl } from '../../utils/api';
import RejectModal from './RejectModal';
import PhotoGrid from './PhotoGrid';

interface Ad {
  _id: string;
  title: string;
  description: string;
  price: number;
  roomCount: number;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  images: string[];
  user: {
    name: string;
    email: string;
  };
}

const PendingAdsList = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAd, setSelectedAd] = useState<string | null>(null);
  const [selectedPhotos, setSelectedPhotos] = useState<Ad | null>(null); // State for PhotoGrid
  const [showRejectModal, setShowRejectModal] = useState(false);

  useEffect(() => {
    fetchPendingAds();
  }, []);

  const fetchPendingAds = async () => {
    try {
      const response = await api.get('/admin/pending-ads');
      setAds(response.data);
    } catch (error: any) {
      console.error('Error fetching pending ads:', error);
      toast.error('Failed to fetch pending ads');
      if (error.response?.status === 401) {
        window.location.href = '/signin';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (adId: string) => {
    try {
      await api.post(
        `/admin/ads/${adId}/approve`,
        {}
      );
      toast.success('Ad approved successfully');
      setAds(ads.filter((ad) => ad._id !== adId));
    } catch (error) {
      toast.error('Failed to approve ad');
    }
  };

  const handleReject = async (adId: string, reason: string) => {
    try {
      await api.post(
        `/admin/ads/${adId}/reject`,
        { reason }
      );
      toast.success('Ad rejected successfully');
      setAds(ads.filter((ad) => ad._id !== adId));
      setShowRejectModal(false);
    } catch (error) {
      toast.error('Failed to reject ad');
    }
  };

  // getImageUrl is imported from utils/api

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pending Ads</h2>

      {ads.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No pending ads to review</p>
      ) : (
        <div className="grid gap-6">
          {ads.map((ad) => (
            <div key={ad._id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-64">
                  {ad.images[0] && (
                    <img
                      src={getImageUrl(ad.images[0])} // Using the getImageUrl function
                      alt={ad.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{ad.title}</h3>
                      <p className="text-gray-600 mt-1">{ad.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(ad._id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        title="Approve"
                      >
                        <CheckCircle className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAd(ad._id);
                          setShowRejectModal(true);
                        }}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Reject"
                      >
                        <XCircle className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => setSelectedPhotos(ad)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="View Photos"
                      >
                        <Image className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-5 w-5 mr-2" />
                      <span>{ad.location.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <IndianRupee className="h-5 w-5 mr-2" />
                      <span>₹{ad.price}/night</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BedDouble className="h-5 w-5 mr-2" />
                      <span>{ad.roomCount} Rooms</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="font-medium text-gray-700">Posted by:</h4>
                    <p className="text-gray-600">{ad.user.name}</p>
                    <p className="text-gray-600">{ad.user.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showRejectModal && selectedAd && (
        <RejectModal
          onClose={() => {
            setShowRejectModal(false);
            setSelectedAd(null);
          }}
          onReject={(reason) => handleReject(selectedAd, reason)}
        />
      )}

      {selectedPhotos && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <PhotoGrid
              photos={selectedPhotos.images.map((url) => ({
                url: getImageUrl(url), // Using the getImageUrl function
                uploadDate: new Date().toISOString(),
              }))}
              onApprove={() => {
                toast.success('Photos approved successfully');
                setSelectedPhotos(null);
              }}
              onReject={() => {
                toast.error('Photos rejected');
                setSelectedPhotos(null);
              }}
            />
            <button
              onClick={() => setSelectedPhotos(null)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAdsList;
