// src/lib/validators.ts
import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const signUpSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').max(15),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, 'You must accept the terms'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const localTransferSchema = z.object({
  recipientAccount: z.string().length(10, 'Account number must be 10 digits'),
  recipientBank: z.string().min(1, 'Please select a bank'),
  amount: z.number().min(100, 'Minimum transfer amount is ₦100').max(10000000, 'Maximum transfer amount is ₦10,000,000'),
  narration: z.string().max(100, 'Narration must be less than 100 characters').optional(),
  pin: z.string().length(4, 'PIN must be 4 digits'),
});

export const internationalTransferSchema = z.object({
  recipientAccount: z.string().min(5, 'Please enter a valid account number'),
  recipientBank: z.string().min(1, 'Please enter the bank name'),
  recipientName: z.string().min(2, 'Please enter the recipient name'),
  recipientCountry: z.string().min(1, 'Please select a country'),
  swiftCode: z.string().min(8, 'Please enter a valid SWIFT code').max(11),
  routingNumber: z.string().optional(),
  amount: z.number().min(1, 'Please enter an amount'),
  currency: z.string().min(1, 'Please select a currency'),
  purpose: z.string().min(1, 'Please select a purpose'),
  narration: z.string().max(100).optional(),
  pin: z.string().length(4, 'PIN must be 4 digits'),
});

export type SignInFormData = z.infer<typeof signInSchema>;
export type SignUpFormData = z.infer<typeof signUpSchema>;
export type LocalTransferFormData = z.infer<typeof localTransferSchema>;
export type InternationalTransferFormData = z.infer<typeof internationalTransferSchema>;