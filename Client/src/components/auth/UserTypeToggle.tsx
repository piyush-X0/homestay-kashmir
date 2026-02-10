import React from 'react';

interface UserTypeToggleProps {
  isHomeStayer: boolean;
  onToggle: () => void;
}

const UserTypeToggle: React.FC<UserTypeToggleProps> = ({ isHomeStayer, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="w-full py-3 px-4 border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-50 transition-colors text-sm font-medium"
    >
      {isHomeStayer ? 'Switch to Normal User' : 'Switch to Home Stayer'}
    </button>
  );
};

export default UserTypeToggle;