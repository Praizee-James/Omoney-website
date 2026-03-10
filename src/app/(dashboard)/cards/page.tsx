// src/app/(dashboard)/cards/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiCreditCard,
  HiPlus,
  HiLockClosed,
  HiLockOpen,
  HiEye,
  HiEyeOff,
  HiCog,
  HiTrash,
} from 'react-icons/hi';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';
import { MOCK_CARDS } from '@/lib/constants';
import { formatCurrency, maskCardNumber } from '@/lib/utils';

export default function CardsPage() {
  const [cards, setCards] = useState(MOCK_CARDS);
  const [selectedCard, setSelectedCard] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const card = cards[selectedCard];

  const toggleFreeze = (id: string) => {
    setCards(prev => prev.map(c =>
      c.id === id ? { ...c, status: c.status === 'active' ? 'frozen' as const : 'active' as const } : c
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
              <HiCreditCard size={20} className="text-indigo-600" />
            </div>
            My Cards
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your virtual and physical cards</p>
        </div>
        <Button
          leftIcon={<HiPlus size={16} />}
          onClick={() => setShowCreateModal(true)}
        >
          New Card
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Card Display */}
        <div className="space-y-4">
          {/* Card Visual */}
          <motion.div
            key={selectedCard}
            initial={{ opacity: 0, rotateY: -10 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 p-6 lg:p-8 text-white aspect-[1.6/1] max-w-md shadow-2xl"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-5 right-5 w-40 h-40 rounded-full bg-emerald-400/30 blur-2xl" />
              <div className="absolute bottom-5 left-5 w-32 h-32 rounded-full bg-emerald-500/20 blur-xl" />
            </div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-emerald-300 uppercase tracking-wider">
                  {card.variant} Card
                </span>
                <div className="flex items-center gap-2">
                  {card.status === 'frozen' && (
                    <Badge variant="warning">Frozen</Badge>
                  )}
                  <span className="text-lg font-bold uppercase">
                    {card.type === 'visa' ? 'VISA' : card.type === 'mastercard' ? 'MC' : 'VERVE'}
                  </span>
                </div>
              </div>

              {/* Chip */}
              <div className="w-10 h-8 rounded bg-gradient-to-br from-yellow-300 to-yellow-500 opacity-80" />

              <div>
                <p className="text-lg font-mono tracking-[0.2em] mb-2">
                  {showDetails ? card.cardNumber : maskCardNumber(card.cardNumber)}
                </p>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Card Holder</p>
                    <p className="text-sm font-medium">{card.cardHolder}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase">Expires</p>
                    <p className="text-sm font-medium">{card.expiryDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute inset-0 card-shine pointer-events-none" />
          </motion.div>

          {/* Card Selector */}
          <div className="flex gap-2">
            {cards.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setSelectedCard(idx)}
                className={`flex-1 p-3 rounded-xl border-2 transition-all text-center text-xs font-medium ${
                  idx === selectedCard
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                    : 'border-gray-200 dark:border-gray-800 text-gray-500 hover:border-gray-300'
                }`}
              >
                {c.type.toUpperCase()} •• {c.cardNumber.slice(-4)}
                <br />
                <span className="text-[10px] opacity-70">{c.variant}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card Actions & Details */}
        <div className="space-y-4">
          {/* Balance */}
          <Card>
            <p className="text-sm text-gray-500 mb-1">Card Balance</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(card.balance, card.currency)}
            </p>
            <p className="text-xs text-gray-400 mt-1">Daily limit: {formatCurrency(card.dailyLimit, card.currency)}</p>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Card Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                {showDetails ? <HiEyeOff size={18} /> : <HiEye size={18} />}
                {showDetails ? 'Hide' : 'Show'} Details
              </button>
              <button
                onClick={() => toggleFreeze(card.id)}
                className={`flex items-center gap-2 p-3 rounded-xl transition-colors text-sm font-medium ${
                  card.status === 'frozen'
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100'
                    : 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-100'
                }`}
              >
                {card.status === 'frozen' ? <HiLockOpen size={18} /> : <HiLockClosed size={18} />}
                {card.status === 'frozen' ? 'Unfreeze' : 'Freeze'}
              </button>
              <button className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                <HiCog size={18} />
                Settings
              </button>
              <button className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors text-sm font-medium text-red-600">
                <HiTrash size={18} />
                Delete
              </button>
            </div>
          </Card>

          {/* Card Info */}
          <Card>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Card Information</h3>
            <div className="space-y-3">
              {[
                { label: 'Card Type', value: `${card.type.charAt(0).toUpperCase() + card.type.slice(1)} ${card.variant}` },
                { label: 'Status', value: card.status },
                { label: 'Currency', value: card.currency },
                { label: 'Expiry Date', value: card.expiryDate },
              ].map(row => (
                <div key={row.label} className="flex justify-between text-sm">
                  <span className="text-gray-500">{row.label}</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">{row.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Create Card Modal */}
      <Modal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} title="Create New Card">
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            {[
              { type: 'virtual', title: 'Virtual Card', desc: 'For online payments', icon: '💳' },
              { type: 'physical', title: 'Physical Card', desc: 'Delivered to you', icon: '🏦' },
            ].map(opt => (
              <button
                key={opt.type}
                className="p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 transition-all text-left"
              >
                <span className="text-2xl mb-2 block">{opt.icon}</span>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">{opt.title}</p>
                <p className="text-xs text-gray-500">{opt.desc}</p>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {['visa', 'mastercard', 'verve'].map(brand => (
              <button
                key={brand}
                className="p-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-500 transition-all text-center"
              >
                <span className="text-sm font-bold uppercase text-gray-700 dark:text-gray-300">{brand}</span>
              </button>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 block mb-1.5">Currency</label>
            <select className="input-field">
              <option value="NGN">NGN - Nigerian Naira</option>
              <option value="USD">USD - US Dollar</option>
            </select>
          </div>

          <Button fullWidth size="lg">
            Create Card - {formatCurrency(1500)}
          </Button>
        </div>
      </Modal>
    </motion.div>
  );
}