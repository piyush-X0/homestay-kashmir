import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import UserTypeToggle from '../components/auth/UserTypeToggle';

const SignIn = () => {
  const [isHomeStayer, setIsHomeStayer] = useState(false);

  return (
    <AuthLayout
      title={isHomeStayer ? 'Sign in as Home Stayer' : 'Welcome back'}
      subtitle="Please enter your details to continue"
    >
      <LoginForm userType={isHomeStayer ? 'home-stayer' : 'user'} />

      <div className="mt-6">
        <UserTypeToggle
          isHomeStayer={isHomeStayer}
          onToggle={() => setIsHomeStayer(!isHomeStayer)}
        />
      </div>
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn;