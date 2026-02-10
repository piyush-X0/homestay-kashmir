import React from 'react';
import { Mountain } from 'lucide-react';

const Logo = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-lg transform rotate-3 shadow-lg"></div>
        <Mountain className="absolute inset-0 w-full h-full text-white p-2" />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          HomeStayKashmir
        </span>
        <span className="text-xs text-gray-500">Paradise Awaits</span>
      </div>
    </div>
  );
};

export default Logo;