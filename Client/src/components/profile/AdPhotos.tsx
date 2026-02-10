import React from 'react';
import { format } from 'date-fns';
import PhotoGallery from '../photos/PhotoGallary';

interface Ad {
  _id: string;
  title: string;
  status: 'active' | 'expired' | 'rejected';
  photos: Array<{
    url: string;
    uploadDate: string;
  }>;
}

interface AdPhotosProps {
  ads: Ad[];
}

const AdPhotos: React.FC<AdPhotosProps> = ({ ads }) => {
  const groupedAds = ads.reduce((acc, ad) => {
    if (!acc[ad.status]) {
      acc[ad.status] = [];
    }
    acc[ad.status].push(ad);
    return acc;
  }, {} as Record<string, Ad[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedAds).map(([status, statusAds]) => (
        <div key={status}>
          <h2 className="text-xl font-bold mb-4 capitalize">{status} Ads</h2>
          <div className="space-y-6">
            {statusAds.map(ad => (
              <div key={ad._id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">{ad.title}</h3>
                <PhotoGallery photos={ad.photos.map(p => p.url)} />
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-500">Upload Details:</h4>
                  <ul className="mt-2 space-y-2">
                    {ad.photos.map((photo, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        Photo {index + 1} - Uploaded on {format(new Date(photo.uploadDate), 'MMM d, yyyy')}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};