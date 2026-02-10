import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('user' | 'home-stayer' | 'admin')[];
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = ['user', 'home-stayer', 'admin'],
  redirectPath = '/signin',
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Store the intended destination only if it’s a booking page
    if (location.pathname.startsWith('/book/')) {
      const roomId = location.pathname.split('/book/')[1];
      localStorage.setItem('pendingBookingRoomId', roomId);
      window.__pendingBookingRoomId__ = roomId;
    }
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;