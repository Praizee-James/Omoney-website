// src/context/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Account } from '@/types';
import { generateAccountNumber } from '@/lib/utils';

interface AuthState {
  user: User | null;
  accounts: Account[];
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (data: SignUpData) => Promise<boolean>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface SignUpData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accounts: [],
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const stored = localStorage.getItem('omoney_user');
    const storedAccounts = localStorage.getItem('omoney_accounts');
    if (stored) {
      setState({
        user: JSON.parse(stored),
        accounts: storedAccounts ? JSON.parse(storedAccounts) : [],
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const storedUsers = JSON.parse(localStorage.getItem('omoney_users') || '[]');
    const found = storedUsers.find((u: any) => u.email === email && u.password === password);

    if (found) {
      const { password: _, ...user } = found;
      const accountNum = found.accountNumber || generateAccountNumber();
      const accounts: Account[] = [
        {
          id: 'acc_001',
          userId: user.id,
          accountNumber: accountNum,
          accountName: `${user.firstName} ${user.lastName}`,
          balance: 2500000,
          currency: 'NGN',
          type: 'savings',
          status: 'active',
        },
        {
          id: 'acc_002',
          userId: user.id,
          accountNumber: generateAccountNumber(),
          accountName: `${user.firstName} ${user.lastName}`,
          balance: 850,
          currency: 'USD',
          type: 'domiciliary',
          status: 'active',
        },
      ];

      localStorage.setItem('omoney_user', JSON.stringify(user));
      localStorage.setItem('omoney_accounts', JSON.stringify(accounts));

      setState({
        user,
        accounts,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }

    // Demo login
    if (email === 'demo@omoney.com' && password === 'Demo@1234') {
      const user: User = {
        id: 'usr_001',
        firstName: 'Oluwaseun',
        lastName: 'Adeyemi',
        email: 'demo@omoney.com',
        phone: '+2348012345678',
        accountNumber: '3012345678',
        country: 'NG',
        currency: 'NGN',
        isVerified: true,
        createdAt: new Date().toISOString(),
      };

      const accounts: Account[] = [
        {
          id: 'acc_001',
          userId: 'usr_001',
          accountNumber: '3012345678',
          accountName: 'Oluwaseun Adeyemi',
          balance: 2500000,
          currency: 'NGN',
          type: 'savings',
          status: 'active',
        },
        {
          id: 'acc_002',
          userId: 'usr_001',
          accountNumber: '3087654321',
          accountName: 'Oluwaseun Adeyemi',
          balance: 850,
          currency: 'USD',
          type: 'domiciliary',
          status: 'active',
        },
      ];

      localStorage.setItem('omoney_user', JSON.stringify(user));
      localStorage.setItem('omoney_accounts', JSON.stringify(accounts));

      setState({
        user,
        accounts,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }

    setState(prev => ({ ...prev, isLoading: false }));
    return false;
  }, []);

  const signUp = useCallback(async (data: SignUpData): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));

    await new Promise(resolve => setTimeout(resolve, 2000));

    const accountNumber = generateAccountNumber();
    const user: User = {
      id: `usr_${Date.now()}`,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      accountNumber,
      country: 'NG',
      currency: 'NGN',
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    const storedUsers = JSON.parse(localStorage.getItem('omoney_users') || '[]');
    if (storedUsers.some((u: any) => u.email === data.email)) {
      setState(prev => ({ ...prev, isLoading: false }));
      return false;
    }
    storedUsers.push({ ...user, password: data.password });
    localStorage.setItem('omoney_users', JSON.stringify(storedUsers));

    const accounts: Account[] = [
      {
        id: `acc_${Date.now()}`,
        userId: user.id,
        accountNumber,
        accountName: `${data.firstName} ${data.lastName}`,
        balance: 0,
        currency: 'NGN',
        type: 'savings',
        status: 'active',
      },
    ];

    localStorage.setItem('omoney_user', JSON.stringify(user));
    localStorage.setItem('omoney_accounts', JSON.stringify(accounts));

    setState({
      user,
      accounts,
      isAuthenticated: true,
      isLoading: false,
    });
    return true;
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('omoney_user');
    localStorage.removeItem('omoney_accounts');
    setState({
      user: null,
      accounts: [],
      isAuthenticated: false,
      isLoading: false,
    });
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setState(prev => {
      if (!prev.user) return prev;
      const updated = { ...prev.user, ...data };
      localStorage.setItem('omoney_user', JSON.stringify(updated));
      return { ...prev, user: updated };
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, signIn, signUp, signOut, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}