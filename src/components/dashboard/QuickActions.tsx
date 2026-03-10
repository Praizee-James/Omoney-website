// src/components/dashboard/QuickActions.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  HiSwitchHorizontal,
  HiGlobe,
  HiCreditCard,
  HiDeviceMobile,
  HiLightningBolt,
  HiWifi,
  HiCash,
  HiQrcode,
} from 'react-icons/hi';

const actions = [
  { icon: HiSwitchHorizontal, label: 'Transfer', href: '/transfer', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' },
  { icon: HiGlobe, label: 'International', href: '/international', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' },
  { icon: HiDeviceMobile, label: 'Airtime', href: '#', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600' },
  { icon: HiLightningBolt, label: 'Electricity', href: '#', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600' },
  { icon: HiWifi, label: 'Internet', href: '#', color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600' },
  { icon: HiCreditCard, label: 'Cards', href: '/cards', color: 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600' },
  { icon: HiCash, label: 'Savings', href: '#', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600' },
  { icon: HiQrcode, label: 'Scan QR', href: '#', color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600' },
];

export default function QuickActions() {
  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
      <div className="grid grid-cols-4 gap-3 lg:gap-4">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Link href={action.href}>
              <div className="flex flex-col items-center gap-2 p-3 lg:p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-200 group cursor-pointer">
                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon size={22} />
                </div>
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center">
                  {action.label}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}