import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import api from '../../utils/api';
import { toast } from 'react-toastify';

interface Property {
  _id: string;
  title: string;
  price: number;
  status: 'pending' | 'active' | 'rejected' | 'expired';
  rejectionReason?: string;
  images: string[];
  createdAt: string;
}

const PropertyList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.warn('No authentication token available');
        setProperties([]);
        setLoading(false);
        return;
      }

      console.log('Fetching user properties...');
      const response = await api.get('/ads/my-ads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Properties fetched:', response.data);
      setProperties(response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch properties';
      console.error('PropertyList fetch error:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: errorMessage,
        url: error.config?.url
      });
      toast.error(errorMessage);
      setProperties([]);
    } finally {
      setLoading(false);
    }
  };

  // Function to clean up image URLs
  const getImageUrl = (imagePath: string) => {
    // Remove '/server' from the image path if present
    const cleanedPath = imagePath.replace('/server', '');

    // Check if the path already contains "http"
    if (cleanedPath.startsWith('http')) {
      return cleanedPath;
    }
    return getImageUrl(cleanedPath);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'active':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'expired':
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending Verification';
      case 'active':
        return 'Active';
      case 'rejected':
        return 'Rejected';
      case 'expired':
        return 'Expired';
      default:
        return status;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Properties</h2>

      {properties.length === 0 ? (
        <p className="text-gray-500">No properties listed yet</p>
      ) : (
        <div className="grid gap-6">
          {properties.map((property) => (
            <div key={property._id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{property.title}</h3>
                  <p className="font-semibold mt-2">₹{property.price}/night</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {getStatusIcon(property.status)}
                    <span
                      className={`text-sm ${
                        property.status === 'active'
                          ? 'text-green-600'
                          : property.status === 'rejected'
                          ? 'text-red-600'
                          : property.status === 'expired'
                          ? 'text-gray-600'
                          : 'text-yellow-600'
                      }`}
                    >
                      {getStatusText(property.status)}
                    </span>
                  </div>
                  {property.rejectionReason && (
                    <p className="mt-2 text-sm text-red-600">
                      Reason: {property.rejectionReason}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mt-2">
                    Listed on: {new Date(property.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-4 gap-2">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={getImageUrl(image)} // Use the getImageUrl function here
                    alt={`Property ${index + 1}`}
                    className="w-full h-24 object-cover rounded-md"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
