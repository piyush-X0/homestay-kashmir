import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Phone, MapPin, CreditCard } from 'lucide-react';
import { profileSchema } from '../../utils/validation';
import FormInput from '../auth/FormInput';
import SubmitButton from '../auth/SubmitButton';
import { useAuth } from '../../contexts/AuthContext';

const ProfileForm = () => {
  const { user, updateProfile } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      phone: user?.phone || '',
      address: user?.address || '',
      aadhaarNumber: user?.aadhaarNumber || ''
    }
  });

  const onSubmit = async (data: any) => {
    try {
      await updateProfile(data);
    } catch (error: any) {
      setError('root', {
        type: 'manual',
        message: error.response?.data?.message || 'Failed to update profile'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        id="name"
        type="text"
        label="Full Name"
        placeholder="Your full name"
        icon={User}
        error={errors.name?.message}
        {...register('name')}
      />

      <div className="opacity-50">
        <FormInput
          id="email"
          type="email"
          label="Email"
          placeholder="Your email"
          value={user?.email}
          disabled
          icon={Mail}
        />
      </div>

      <FormInput
        id="phone"
        type="tel"
        label="Phone Number"
        placeholder="Your phone number"
        icon={Phone}
        error={errors.phone?.message}
        {...register('phone')}
      />

      {user?.role === 'home-stayer' && (
        <>
          <FormInput
            id="address"
            type="text"
            label="Address"
            placeholder="Your address"
            icon={MapPin}
            error={errors.address?.message}
            {...register('address')}
          />

          <FormInput
            id="aadhaarNumber"
            type="text"
            label="Aadhaar Number"
            placeholder="12-digit Aadhaar number"
            icon={CreditCard}
            error={errors.aadhaarNumber?.message}
            {...register('aadhaarNumber')}
          />
        </>
      )}

      {errors.root && (
        <div className="text-red-600 text-sm">{errors.root.message}</div>
      )}

      <SubmitButton loading={isSubmitting}>
        Update Profile
      </SubmitButton>
    </form>
  );
};

export default ProfileForm;