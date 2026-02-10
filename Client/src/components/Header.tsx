import React, { useState } from 'react';
import { Menu, X, Home, PlusCircle, User, Receipt, LogOut, LogIn, UserPlus, Bed } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getMenuItems = () => {
    const commonItems = [
      { icon: Home, label: 'Home', href: '/' },
      { icon: Bed, label: 'Rooms', href: '/rooms' },
    ];

    if (!isAuthenticated) {
      return [
        ...commonItems,
        { icon: LogIn, label: 'Sign In', href: '/signin' },
        { icon: UserPlus, label: 'Sign Up', href: '/signup' },
      ];
    }

    const authenticatedItems = [
      ...commonItems,
      { icon: User, label: 'Profile', href: '/profile' },
    ];

    if (user?.role === 'user') {
      authenticatedItems.push(
        { icon: Receipt, label: 'My Transactions', href: '/transactions' }
      );
    }

    if (user?.role === 'home-stayer') {
      authenticatedItems.push(
        { icon: PlusCircle, label: 'Create Ad', href: '/create-ad' }
      );
    }

    authenticatedItems.push({
      icon: LogOut,
      label: 'Logout',
      href: '#',
      onClick: handleLogout
    });

    return authenticatedItems;
  };

  const menuItems = getMenuItems();

  return (
    <header className="fixed top-0 w-full bg-white shadow-md z-50">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(({ icon: Icon, label, href, onClick }) => (
              onClick ? (
                <button
                  key={label}
                  onClick={onClick}
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ) : (
                <Link
                  key={label}
                  to={href}
                  className="flex items-center space-x-1 text-gray-600 hover:text-indigo-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600 hover:text-gray-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            {menuItems.map(({ icon: Icon, label, href, onClick }) => (
              onClick ? (
                <button
                  key={label}
                  onClick={() => {
                    onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-3 text-gray-600 hover:bg-gray-50"
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </button>
              ) : (
                <Link
                  key={label}
                  to={href}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                </Link>
              )
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;