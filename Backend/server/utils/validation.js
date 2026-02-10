import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Invalid phone number'),
  role: z.enum(['user', 'home-stayer']),
  address: z.string().optional(),
  aadhaarNumber: z.string().optional()
}).refine((data) => {
  if (data.role === 'home-stayer') {
    return data.address && data.aadhaarNumber;
  }
  return true;
}, {
  message: "Address and Aadhaar number are required for home stayers",
  path: ["role"]
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});