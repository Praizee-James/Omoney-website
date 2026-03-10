// src/components/dashboard/CurrencyRates.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HiArrowUp, HiArrowDown } from 'react-icons/hi';
import { CURRENCY_RATES } from '@/lib/constants';

const flags: Record<string, string> = {
  USD: '🇺🇸',
  GBP: '🇬🇧',
  EUR: '🇪🇺',
  GHS: '🇬🇭',
  KES: '🇰🇪',
};

export default function CurrencyRates() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Exchange Rates</h3>
      <div className="space-y-3">
        {CURRENCY_RATES.map((rate, index) => (
          <motion.div
            key={`${rate.from}-${rate.to}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{flags[rate.to]}</span>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {rate.from}/{rate.to}
                </p>
                <p className="text-xs text-gray-500">
                  1 {rate.from} = {rate.rate} {rate.to}
                </p>
              </div>
            </div>
            <div className={`flex items-center gap-1 text-xs font-medium ${
              rate.change > 0 ? 'text-emerald-600' : 'text-red-500'
            }`}>
              {rate.change > 0 ? <HiArrowUp size={12} /> : <HiArrowDown size={12} />}
              {Math.abs(rate.change)}%
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}