// src/components/dashboard/BalanceCard.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiEye, HiEyeOff, HiPlus } from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import { formatCurrency, maskAccountNumber } from '@/lib/utils';
import AnimatedCounter from '@/components/shared/AnimatedCounter';

export default function BalanceCard() {
  const { user, accounts } = useAuth();
  const [showBalance, setShowBalance] = useState(true);
  const [activeAccount, setActiveAccount] = useState(0);
  const account = accounts[activeAccount];

  if (!account) return null;

  const currencySymbols: Record<string, string> = {
    NGN: '₦',
    USD: '$',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 p-6 lg:p-8 text-white shadow-2xl shadow-emerald-900/30"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/20" />
        <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-white/10" />
        <div className="absolute right-20 bottom-10 w-32 h-32 rounded-full bg-white/5" />
      </div>

      <div className="relative z-10">
        {/* Account Tabs */}
        <div className="flex gap-2 mb-6">
          {accounts.map((acc, idx) => (
            <button
              key={acc.id}
              onClick={() => setActiveAccount(idx)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                idx === activeAccount
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {acc.currency} {acc.type.charAt(0).toUpperCase() + acc.type.slice(1)}
            </button>
          ))}
        </div>

        {/* Balance */}
        <div className="mb-1">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-sm text-emerald-200">Available Balance</p>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              {showBalance ? <HiEye size={16} /> : <HiEyeOff size={16} />}
            </button>
          </div>
          <div className="text-3xl lg:text-4xl font-bold font-display tracking-tight">
            {showBalance ? (
              <>
                {currencySymbols[account.currency] || account.currency}
                <AnimatedCounter value={account.balance} />
              </>
            ) : (
              '••••••••'
            )}
          </div>
        </div>

        {/* Account Info */}
        <div className="flex items-center justify-between mt-6">
          <div>
            <p className="text-xs text-emerald-200">Account Number</p>
            <p className="text-sm font-mono font-medium">
              {showBalance ? account.accountNumber : maskAccountNumber(account.accountNumber)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-emerald-200">Account Name</p>
            <p className="text-sm font-medium">{account.accountName}</p>
          </div>
        </div>

        {/* Action */}
        <div className="mt-6">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/15 hover:bg-white/25 rounded-xl text-sm font-medium transition-all backdrop-blur-sm">
            <HiPlus size={16} />
            <span>Add Money</span>
          </button>
        </div>
      </div>

      {/* Shine Effect */}
      <div className="absolute inset-0 card-shine pointer-events-none" />
    </motion.div>
  );
}