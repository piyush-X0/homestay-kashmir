import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import  api  from '../utils/api';
declare global {
  interface Window {
    __pendingBookingRoomId__: string | null;
  }
}
interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'home-stayer' | 'admin';
  phone?: string;
  address?: string;
  aadhaarNumber?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, userType: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          try {
            const response = await api.get('/auth/verify');
            const freshUser = response.data.user;
            setUser(freshUser);
            localStorage.setItem('user', JSON.stringify(freshUser));
          } catch (verifyError: any) {
            console.warn('Verify endpoint failed, using stored user:', verifyError.response?.status);
            // Only clear if token is invalid (401), not 404
            if (verifyError.response?.status === 401) {
              localStorage.removeItem('token');
              localStorage.removeItem('user');
              delete axios.defaults.headers.common['Authorization'];
              setUser(null);
            }
          }
        } catch (parseError) {
          console.error('Failed to parse stored user:', parseError);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string, userType: string) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password,
        userType,
      });

      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData);

      toast.success('Login successful!');

      const pendingRoomId = localStorage.getItem('pendingBookingRoomId') || window.__pendingBookingRoomId__;

      if (pendingRoomId) {
        console.log('Redirecting to booking:', pendingRoomId);
        localStorage.removeItem('pendingBookingRoomId');
        window.__pendingBookingRoomId__ = null;
        navigate(`/book/${pendingRoomId}`, { replace: true });
      } else if (userData.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/profile', { replace: true });
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  const register = async (userData: any) => {
    try {
      await api.post('/auth/register', userData);
      toast.success('Registration successful! Please login.');
      navigate('/signin');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await api.put('/users/profile', data);
      const updatedUser = response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;