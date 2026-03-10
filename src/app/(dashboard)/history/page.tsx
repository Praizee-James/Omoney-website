// src/app/(dashboard)/history/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiClock,
  HiSearch,
  HiFilter,
  HiArrowUp,
  HiArrowDown,
  HiGlobe,
  HiDownload,
  HiX,
  HiCalendar,
  HiDocumentText,
} from 'react-icons/hi';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { useTransactions } from '@/context/TransactionContext';
import { formatCurrency, formatDateTime, timeAgo } from '@/lib/utils';
import { Transaction } from '@/types';

export default function HistoryPage() {
  const { transactions } = useTransactions();
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTxn, setSelectedTxn] = useState<Transaction | null>(null);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      if (filterType !== 'all' && txn.type !== filterType) return false;
      if (filterStatus !== 'all' && txn.status !== filterStatus) return false;
      if (filterCategory !== 'all' && txn.category !== filterCategory) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          txn.description.toLowerCase().includes(q) ||
          txn.recipientName.toLowerCase().includes(q) ||
          txn.reference.toLowerCase().includes(q) ||
          txn.recipientBank.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [transactions, search, filterType, filterStatus, filterCategory]);

  const getIcon = (type: string, category: string) => {
    if (category === 'international') return <HiGlobe className="text-blue-500" size={18} />;
    if (type === 'credit') return <HiArrowDown className="text-emerald-500" size={18} />;
    return <HiArrowUp className="text-red-500" size={18} />;
  };

  const getStatusVariant = (status: string): 'success' | 'warning' | 'error' | 'default' => {
    const map: Record<string, 'success' | 'warning' | 'error'> = {
      completed: 'success',
      pending: 'warning',
      failed: 'error',
    };
    return map[status] || 'default';
  };

  const activeFilters = [filterType, filterStatus, filterCategory].filter(f => f !== 'all').length;

  const clearFilters = () => {
    setFilterType('all');
    setFilterStatus('all');
    setFilterCategory('all');
    setSearch('');
  };

  // Group transactions by date
  const groupedTransactions = useMemo(() => {
    const groups: Record<string, Transaction[]> = {};
    filteredTransactions.forEach(txn => {
      const date = new Date(txn.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      if (!groups[date]) groups[date] = [];
      groups[date].push(txn);
    });
    return groups;
  }, [filteredTransactions]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"{...{} as any}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
              <HiClock size={20} className="text-purple-600" />
            </div>
            Transaction History
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''}
          </p>
        </div>
        <Button variant="outline" size="sm" leftIcon={<HiDownload size={16} />}>
          Export
        </Button>
      </div>

      {/* Search & Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <HiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search transactions, recipients, references..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <Button
            variant={activeFilters > 0 ? 'primary' : 'secondary'}
            size="md"
            leftIcon={<HiFilter size={16} />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters {activeFilters > 0 && `(${activeFilters})`}
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"{...{} as any}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Type</label>
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="credit">Credit (Incoming)</option>
                    <option value="debit">Debit (Outgoing)</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 mb-1 block">Category</label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="input-field text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="transfer">Transfer</option>
                    <option value="international">International</option>
                    <option value="payment">Payment</option>
                    <option value="deposit">Deposit</option>
                  </select>
                </div>
              </div>
              {activeFilters > 0 && (
                <button
                  onClick={clearFilters}
                  className="mt-3 text-sm text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                >
                  <HiX size={14} />
                  Clear all filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      {/* Transactions List */}
      <div className="space-y-6">
        {Object.entries(groupedTransactions).map(([date, txns]) => (
          <div key={date}>
            <div className="flex items-center gap-2 mb-3">
              <HiCalendar size={14} className="text-gray-400" />
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{date}</h3>
            </div>
            <Card padding="none">
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {txns.map((txn, index) => (
                  <motion.div
                    key={txn.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"{...{} as any}
                    onClick={() => setSelectedTxn(txn)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                        {getIcon(txn.type, txn.category)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{txn.recipientName}</p>
                        <p className="text-xs text-gray-500">{txn.recipientBank} • {timeAgo(txn.date)}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-3">
                      <div>
                        <p className={`text-sm font-semibold ${
                          txn.type === 'credit' ? 'text-emerald-600' : 'text-gray-900 dark:text-white'
                        }`}>
                          {txn.type === 'credit' ? '+' : '-'}{formatCurrency(txn.amount, txn.currency)}
                        </p>
                        <Badge variant={getStatusVariant(txn.status)} size="sm">
                          {txn.status}
                        </Badge>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <Card>
          <div className="text-center py-16">
            <HiDocumentText size={48} className="mx-auto text-gray-300 dark:text-gray-700 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No transactions found</h3>
            <p className="text-gray-500 text-sm">
              {search || activeFilters > 0 ? 'Try adjusting your filters' : 'Your transactions will appear here'}
            </p>
          </div>
        </Card>
      )}

      {/* Transaction Detail Modal */}
      <Modal
        isOpen={!!selectedTxn}
        onClose={() => setSelectedTxn(null)}
        title="Transaction Details"
      >
        {selectedTxn && (
          <div className="space-y-5">
            <div className="text-center py-4">
              <div className={`inline-flex w-14 h-14 rounded-full items-center justify-center mb-3 ${
                selectedTxn.type === 'credit'
                  ? 'bg-emerald-100 dark:bg-emerald-900/30'
                  : 'bg-red-100 dark:bg-red-900/30'
              }`}>
                {selectedTxn.type === 'credit' ? (
                  <HiArrowDown size={24} className="text-emerald-600" />
                ) : (
                  <HiArrowUp size={24} className="text-red-500" />
                )}
              </div>
              <p className={`text-3xl font-bold ${
                selectedTxn.type === 'credit' ? 'text-emerald-600' : 'text-gray-900 dark:text-white'
              }`}>
                {selectedTxn.type === 'credit' ? '+' : '-'}{formatCurrency(selectedTxn.amount, selectedTxn.currency)}
              </p>
              <Badge variant={getStatusVariant(selectedTxn.status)} size="md">
                {selectedTxn.status.charAt(0).toUpperCase() + selectedTxn.status.slice(1)}
              </Badge>
            </div>

            <div className="space-y-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              {[
                { label: 'Description', value: selectedTxn.description },
                { label: 'Recipient', value: selectedTxn.recipientName },
                { label: 'Bank', value: selectedTxn.recipientBank },
                { label: 'Account', value: selectedTxn.recipientAccount },
                { label: 'Reference', value: selectedTxn.reference },
                { label: 'Fee', value: formatCurrency(selectedTxn.fee, selectedTxn.currency) },
                { label: 'Balance After', value: formatCurrency(selectedTxn.balanceAfter, selectedTxn.currency) },
                { label: 'Date', value: formatDateTime(selectedTxn.date) },
                ...(selectedTxn.recipientCountry ? [{ label: 'Country', value: selectedTxn.recipientCountry }] : []),
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-medium text-gray-900 dark:text-white text-right max-w-[60%] break-all">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" fullWidth leftIcon={<HiDownload size={16} />}>
                Download Receipt
              </Button>
              <Button variant="outline" fullWidth onClick={() => setSelectedTxn(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}