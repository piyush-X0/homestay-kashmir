import React from 'react';
import { format } from 'date-fns';
import PhotoGallery from '../photos/PhotoGallary';

interface Photo {
  url: string;
  uploadDate: string;
}

interface PhotoGridProps {
  photos: Photo[];
  onApprove: () => void;
  onReject: () => void;
}

const PhotoGrid: React.FC<PhotoGridProps> = ({ photos, onApprove, onReject }) => {
  return (
    <div className="space-y-4">
      <PhotoGallery photos={photos.map(p => p.url)} />
      
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-500">Upload Details:</h4>
        <ul className="mt-2 space-y-2">
          {photos.map((photo, index) => (
            <li key={index} className="text-sm text-gray-600">
              Photo {index + 1} - Uploaded on {format(new Date(photo.uploadDate), 'MMM d, yyyy')}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex space-x-4 mt-4">
        <button
          onClick={onApprove}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
        >
          Approve Photos
        </button>
        <button
          onClick={onReject}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
          Reject Photos
        </button>
      </div>
    </div>
  );
};
export default PhotoGrid;