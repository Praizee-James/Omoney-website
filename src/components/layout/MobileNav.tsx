// src/components/layout/MobileNav.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HiHome,
  HiSwitchHorizontal,
  HiClock,
  HiCreditCard,
  HiDotsHorizontal,
} from 'react-icons/hi';
import { cn } from '@/lib/utils';

const items = [
  { href: '/dashboard', label: 'Home', icon: HiHome },
  { href: '/transfer', label: 'Transfer', icon: HiSwitchHorizontal },
  { href: '/history', label: 'History', icon: HiClock },
  { href: '/cards', label: 'Cards', icon: HiCreditCard },
  { href: '/settings', label: 'More', icon: HiDotsHorizontal },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 safe-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className="relative flex flex-col items-center gap-1 py-1 px-3">
              {isActive && (
                <motion.div
                  layoutId="mobile-nav-indicator"
                  className="absolute -top-2 w-8 h-1 bg-emerald-600 rounded-full"{...{} as any}
                  transition={{ duration: 0.2 }}
                />
              )}
              <item.icon
                size={22}
                className={cn(
                  'transition-colors',
                  isActive ? 'text-emerald-600' : 'text-gray-400'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium transition-colors',
                  isActive ? 'text-emerald-600' : 'text-gray-400'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}