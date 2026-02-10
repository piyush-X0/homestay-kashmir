import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../../utils/validation';
import FormInput from './FormInput';
import SubmitButton from './SubmitButton';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  userType: 'user' | 'home-stayer';
}

const LoginForm: React.FC<LoginFormProps> = ({ userType }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: any) => {
    try {
      // The original login function
      await login(data.email, data.password, userType);
      
      // After successful login, check for pending booking
      // This will be handled by the effect in SignIn.tsx
    } catch (error: any) {
      setError('email', {
        type: 'manual',
        message: error.response?.data?.message || 'Login failed'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        id="email"
        type="email"
        label="Email"
        placeholder="Email address"
        icon={Mail}
        error={errors.email?.message}
        {...register('email')}
      />
      <FormInput
        id="password"
        type="password"
        label="Password"
        placeholder="Password"
        icon={Lock}
        error={errors.password?.message}
        {...register('password')}
      />
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link 
            to="/forgot-password"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
      <SubmitButton loading={isSubmitting}>
        Sign in as {userType === 'user' ? 'Normal User' : 'Home Stayer'}
      </SubmitButton>
    </form>
  );
};

export default LoginForm;
