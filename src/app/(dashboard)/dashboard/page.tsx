// src/app/(dashboard)/dashboard/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BalanceCard from '@/components/dashboard/BalanceCard';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import SpendingChart from '@/components/dashboard/SpendingChart';
import CurrencyRates from '@/components/dashboard/CurrencyRates';
import Card from '@/components/ui/Card';

export default function DashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 lg:space-y-8"
    >
      {/* Balance & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        <div className="lg:col-span-2">
          <BalanceCard />
        </div>
        <div>
          <Card className="h-full">
            <CurrencyRates />
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card>
        <QuickActions />
      </Card>

      {/* Chart & Transactions */}
      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
        <Card>
          <SpendingChart />
        </Card>
        <Card>
          <RecentTransactions />
        </Card>
      </div>
    </motion.div>
  );
}