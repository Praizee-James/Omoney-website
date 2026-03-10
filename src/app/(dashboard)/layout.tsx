// src/app/(dashboard)/layout.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import TopNav from '@/components/layout/TopNav';
import MobileNav from '@/components/layout/MobileNav';
import Loader from '@/components/ui/Loader';
import { useAuth } from '@/context/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      router.push('/signin');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <Loader />;
  if (!isAuthenticated) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:ml-64">
        <TopNav onMenuClick={() => setSidebarOpen(true)} />

        <main className="p-4 lg:p-8 pb-24 lg:pb-8">
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </main>
      </div>

      <MobileNav />
    </div>
  );
}