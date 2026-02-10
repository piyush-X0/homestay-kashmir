import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col items-center">
          <Link to="/" className="mb-6">
            <Logo />
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-center text-sm text-gray-600">{subtitle}</p>
          )}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;