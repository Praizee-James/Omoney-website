// src/context/TransactionContext.tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Transaction, TransferPayload } from '@/types';
import { MOCK_TRANSACTIONS } from '@/lib/constants';
import { generateReference } from '@/lib/utils';

interface TransactionContextType {
  transactions: Transaction[];
  isProcessing: boolean;
  makeTransfer: (payload: TransferPayload) => Promise<Transaction>;
  getTransactionById: (id: string) => Transaction | undefined;
  filterTransactions: (filters: TransactionFilters) => Transaction[];
}

interface TransactionFilters {
  type?: 'credit' | 'debit';
  category?: string;
  status?: string;
  dateFrom?: string;
  dateTo?: string;
  search?: string;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [isProcessing, setIsProcessing] = useState(false);

  const makeTransfer = useCallback(async (payload: TransferPayload): Promise<Transaction> => {
    setIsProcessing(true);

    await new Promise(resolve => setTimeout(resolve, 3000));

    const newTransaction: Transaction = {
      id: `txn_${Date.now()}`,
      userId: 'usr_001',
      type: 'debit',
      category: payload.currency !== 'NGN' ? 'international' : 'transfer',
      amount: payload.amount,
      currency: payload.currency || 'NGN',
      description: `Transfer to ${payload.recipientName}`,
      reference: generateReference(),
      status: 'completed',
      recipientName: payload.recipientName,
      recipientBank: payload.recipientBank,
      recipientAccount: payload.recipientAccount,
      fee: payload.amount > 5000 ? 25 : 10,
      date: new Date().toISOString(),
      balanceAfter: 2500000 - payload.amount,
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setIsProcessing(false);

    return newTransaction;
  }, []);

  const getTransactionById = useCallback((id: string) => {
    return transactions.find(t => t.id === id);
  }, [transactions]);

  const filterTransactions = useCallback((filters: TransactionFilters) => {
    return transactions.filter(t => {
      if (filters.type && t.type !== filters.type) return false;
      if (filters.category && t.category !== filters.category) return false;
      if (filters.status && t.status !== filters.status) return false;
      if (filters.search) {
        const query = filters.search.toLowerCase();
        return (
          t.description.toLowerCase().includes(query) ||
          t.recipientName.toLowerCase().includes(query) ||
          t.reference.toLowerCase().includes(query)
        );
      }
      return true;
    });
  }, [transactions]);

  return (
    <TransactionContext.Provider value={{
      transactions,
      isProcessing,
      makeTransfer,
      getTransactionById,
      filterTransactions,
    }}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (!context) throw new Error('useTransactions must be used within TransactionProvider');
  return context;
}