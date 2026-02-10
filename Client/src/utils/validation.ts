import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
  phone: z.string().regex(/^[0-9]{10}$/, 'Invalid phone number'),
  role: z.enum(['user', 'home-stayer']),
  address: z.string().optional(),
  aadhaarNumber: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
}).refine((data) => {
  if (data.role === 'home-stayer') {
    return data.address && data.aadhaarNumber;
  }
  return true;
}, {
  message: "Address and Aadhaar number are required for home stayers",
  path: ["role"]
});

export const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Invalid phone number'),
  address: z.string().optional(),
  aadhaarNumber: z.string().optional(),
});