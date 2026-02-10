import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Phone, MapPin, CreditCard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthLayout from '../components/auth/AuthLayout';
import FormInput from '../components/auth/FormInput';
import SubmitButton from '../components/auth/SubmitButton';
import UserTypeToggle from '../components/auth/UserTypeToggle';
import useForm from '../hooks/useForm';
import { registerSchema } from '../utils/validation';

const SignUp = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [isHomeStayer, setIsHomeStayer] = React.useState(false);

  const {
    values,
    errors,
    loading,
    handleChange,
    handleSubmit,
    setValues,
    setErrors
  } = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      role: 'user' as const,
      address: '',
      aadhaarNumber: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await register({
          ...values,
          role: isHomeStayer ? 'home-stayer' : 'user'
        });
        navigate('/signin');
      } catch (error: any) {
        console.error('Registration error:', error); // For debugging
        const message = error.response?.data?.message || error.message || 'Registration failed';
        setErrors({
          email: message
        });
      }
    }
  });

  React.useEffect(() => {
    setValues(prev => ({
      ...prev,
      role: isHomeStayer ? 'home-stayer' : 'user'
    }));
  }, [isHomeStayer, setValues]);

  return (
    <AuthLayout
      title={isHomeStayer ? 'Create a Home Stayer Account' : 'Create your account'}
      subtitle="Please fill in the details below"
    >
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div className="rounded-md space-y-4">
          <FormInput
            id="name"
            name="name"
            type="text"
            label="Full Name"
            placeholder="Full Name"
            icon={User}
            value={values.name}
            onChange={handleChange}
            error={errors.name}
            required
          />

          <FormInput
            id="email"
            name="email"
            type="email"
            label="Email address"
            placeholder="Email address"
            icon={Mail}
            value={values.email}
            onChange={handleChange}
            error={errors.email}
            required
          />

          <FormInput
            id="phone"
            name="phone"
            type="tel"
            label="Phone Number"
            placeholder="Phone Number"
            icon={Phone}
            value={values.phone}
            onChange={handleChange}
            error={errors.phone}
            required
          />

          {isHomeStayer && (
            <>
              <FormInput
                id="address"
                name="address"
                type="text"
                label="Address"
                placeholder="Full Address"
                icon={MapPin}
                value={values.address}
                onChange={handleChange}
                error={errors.address}
                required
              />

              <FormInput
                id="aadhaarNumber"
                name="aadhaarNumber"
                type="text"
                label="Aadhaar Number"
                placeholder="12-digit Aadhaar Number"
                icon={CreditCard}
                value={values.aadhaarNumber}
                onChange={handleChange}
                error={errors.aadhaarNumber}
                required
              />
            </>
          )}

          <FormInput
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            icon={Lock}
            value={values.password}
            onChange={handleChange}
            error={errors.password}
            required
          />

          <FormInput
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm Password"
            icon={Lock}
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
            required
          />
        </div>

        <SubmitButton loading={loading}>
          Create Account
        </SubmitButton>

        <UserTypeToggle
          isHomeStayer={isHomeStayer}
          onToggle={() => setIsHomeStayer(!isHomeStayer)}
        />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;