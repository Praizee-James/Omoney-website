// src/components/dashboard/RecentTransactions.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiArrowUp,
  HiArrowDown,
  HiGlobe,
  HiArrowRight,
} from 'react-icons/hi';
import { useTransactions } from '@/context/TransactionContext';
import { formatCurrency, timeAgo } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

export default function RecentTransactions() {
  const { transactions } = useTransactions();
  const recent = transactions.slice(0, 5);

  const getIcon = (type: string, category: string) => {
    if (category === 'international') return <HiGlobe className="text-blue-500" size={18} />;
    if (type === 'credit') return <HiArrowDown className="text-emerald-500" size={18} />;
    return <HiArrowUp className="text-red-500" size={18} />;
  };

  const getStatusBadge = (status: string) => {
    const map: Record<string, 'success' | 'warning' | 'error'> = {
      completed: 'success',
      pending: 'warning',
      failed: 'error',
    };
    return <Badge variant={map[status] || 'default'}>{status}</Badge>;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>
        <Link href="/history" className="flex items-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View all <HiArrowRight size={14} />
        </Link>
      </div>

      <div className="space-y-2">
        {recent.map((txn, index) => (
          <motion.div
            key={txn.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                {getIcon(txn.type, txn.category)}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {txn.recipientName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {timeAgo(txn.date)} • {txn.recipientBank}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className={`text-sm font-semibold ${
                txn.type === 'credit' ? 'text-emerald-600' : 'text-gray-900 dark:text-white'
              }`}>
                {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount, txn.currency)}
              </p>
              {getStatusBadge(txn.status)}
            </div>
          </motion.div>
        ))}
      </div>

      {recent.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No transactions yet</p>
        </div>
      )}
    </div>
  );
}