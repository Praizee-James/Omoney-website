// src/types/index.ts
export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
  accountNumber: string;
  bvn?: string;
  dateOfBirth?: string;
  address?: string;
  country: string;
  currency: string;
  isVerified: boolean;
  createdAt: string;
}

export interface Account {
  id: string;
  userId: string;
  accountNumber: string;
  accountName: string;
  balance: number;
  currency: string;
  type: 'savings' | 'current' | 'domiciliary';
  status: 'active' | 'frozen' | 'closed';
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  category: 'transfer' | 'payment' | 'deposit' | 'withdrawal' | 'international';
  amount: number;
  currency: string;
  description: string;
  reference: string;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  recipientName: string;
  recipientBank: string;
  recipientAccount: string;
  recipientCountry?: string;
  fee: number;
  date: string;
  balanceAfter: number;
}

export interface Card {
  id: string;
  userId: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  type: 'visa' | 'mastercard' | 'verve';
  variant: 'virtual' | 'physical';
  status: 'active' | 'frozen' | 'expired';
  balance: number;
  currency: string;
  dailyLimit: number;
}

export interface Bank {
  code: string;
  name: string;
  slug: string;
}

export interface CurrencyRate {
  from: string;
  to: string;
  rate: number;
  change: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  date: string;
}

export interface TransferPayload {
  recipientAccount: string;
  recipientBank: string;
  recipientName: string;
  amount: number;
  currency: string;
  narration: string;
  pin: string;
  saveAsBeneficiary?: boolean;
}

export interface InternationalTransferPayload extends TransferPayload {
  recipientCountry: string;
  swiftCode: string;
  routingNumber?: string;
  recipientAddress: string;
  purpose: string;
}

export interface Beneficiary {
  id: string;
  accountNumber: string;
  accountName: string;
  bankName: string;
  bankCode: string;
  country: string;
  isInternational: boolean;
}