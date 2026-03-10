// src/components/layout/TopNav.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiMenu,
  HiBell,
  HiSearch,
  HiMoon,
  HiSun,
} from 'react-icons/hi';
import { useAuth } from '@/context/AuthContext';
import { MOCK_NOTIFICATIONS } from '@/lib/constants';
import { getInitials, getGreeting, timeAgo } from '@/lib/utils';

interface TopNavProps {
  onMenuClick: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  const { user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-4 lg:px-8 h-16">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <HiMenu size={24} className="text-gray-600 dark:text-gray-400" />
          </button>
          <div className="hidden sm:block">
            <h2 className="text-sm text-gray-500 dark:text-gray-400">{getGreeting()},</h2>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
              {user?.firstName} {user?.lastName}
            </h1>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 240, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                className="hidden sm:block overflow-hidden"{...{} as any}
              >
                <input
                  type="text"
                  placeholder="Search transactions..."
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                  autoFocus
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors hidden sm:block"
          >
            <HiSearch size={20} className="text-gray-500 dark:text-gray-400" />
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? (
              <HiSun size={20} className="text-yellow-400" />
            ) : (
              <HiMoon size={20} className="text-gray-500" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
            >
              <HiBell size={20} className="text-gray-500 dark:text-gray-400" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowNotifications(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-12 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-20"{...{} as any}
                  >
                    <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                      <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    </div>
                    <div className="max-h-80 overflow-y-auto">
                      {MOCK_NOTIFICATIONS.map(notif => (
                        <div
                          key={notif.id}
                          className={`p-4 border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors ${
                            !notif.read ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''
                          }`}
                        >
                          <div className="flex justify-between items-start mb-1">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">{notif.title}</p>
                            {!notif.read && <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1" />}
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{notif.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{timeAgo(notif.date)}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 text-center">
                      <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* User Avatar */}
          <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold ml-2">
            {user ? getInitials(user.firstName, user.lastName) : 'U'}
          </div>
        </div>
      </div>
    </header>
  );
}