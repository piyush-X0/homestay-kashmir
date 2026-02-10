import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import ProfileForm from '../components/profile/ProfileForm';
import PropertyList from '../components/profile/PropertyList';

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Account Information</h2>
            <p className="text-gray-600">
              Update your personal information and account settings
            </p>
          </div>

          <ProfileForm />
        </div>

        {user?.role === 'home-stayer' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <PropertyList />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;