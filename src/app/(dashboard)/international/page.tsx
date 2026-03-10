// src/app/(dashboard)/international/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
  HiGlobe,
  HiUser,
  HiOfficeBuilding,
  HiCurrencyDollar,
  HiAnnotation,
  HiLockClosed,
  HiCheck,
  HiArrowRight,
  HiSwitchHorizontal,
} from 'react-icons/hi';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import { useTransactions } from '@/context/TransactionContext';
import { COUNTRIES, TRANSFER_PURPOSES, CURRENCY_RATES } from '@/lib/constants';
import { formatCurrency, generateReference } from '@/lib/utils';

export default function InternationalPage() {
  const { isProcessing, makeTransfer } = useTransactions();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      recipientCountry: '',
      recipientName: '',
      recipientBank: '',
      recipientAccount: '',
      swiftCode: '',
      currency: '',
      amount: 0,
      purpose: '',
      narration: '',
      pin: '',
    },
  });

  const watchedCountry = watch('recipientCountry');
  const watchedAmount = watch('amount');
  const watchedCurrency = watch('currency');

  const selectedCountry = COUNTRIES.find(c => c.code === watchedCountry);

  const exchangeRate = useMemo(() => {
    if (!watchedCurrency) return null;
    const rate = CURRENCY_RATES.find(r => r.to === watchedCurrency);
    return rate;
  }, [watchedCurrency]);

  const convertedAmount = useMemo(() => {
    if (!exchangeRate || !watchedAmount) return 0;
    return watchedAmount * exchangeRate.rate;
  }, [exchangeRate, watchedAmount]);

  const fee = watchedAmount > 100000 ? 2500 : 1500;

  const onSubmit = (data: any) => {
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setShowConfirmation(false);
    const data = watch();

    await makeTransfer({
      recipientAccount: data.recipientAccount,
      recipientBank: data.recipientBank,
      recipientName: data.recipientName,
      amount: data.amount,
      currency: data.currency || 'NGN',
      narration: data.narration || `International transfer to ${data.recipientName}`,
      pin: data.pin,
    });

    setShowSuccess(true);
  };

  const handleNewTransfer = () => {
    setShowSuccess(false);
    reset();
  };

  const countryOptions = COUNTRIES.map(c => ({ value: c.code, label: `${c.flag} ${c.name}` }));
  const currencyOptions = selectedCountry
    ? [{ value: selectedCountry.currency, label: selectedCountry.currency }]
    : COUNTRIES.map(c => ({ value: c.currency, label: c.currency })).filter((v, i, a) => a.findIndex(t => t.value === v.value) === i);
  const purposeOptions = TRANSFER_PURPOSES.map(p => ({ value: p, label: p }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <HiGlobe size={20} className="text-blue-600" />
          </div>
          International Transfer
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Send money to over 150 countries worldwide</p>
      </div>

      {/* Exchange Rate Calculator */}
      {exchangeRate && watchedAmount > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 mb-1">You send</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white">
                {formatCurrency(watchedAmount, 'NGN')}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
              <HiSwitchHorizontal className="text-emerald-600" size={20} />
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500 mb-1">They receive</p>
              <p className="text-xl font-bold text-emerald-600">
                {formatCurrency(convertedAmount, watchedCurrency)}
              </p>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Rate: 1 NGN = {exchangeRate.rate} {watchedCurrency} • Fee: {formatCurrency(fee, 'NGN')}
          </p>
        </Card>
      )}

      {/* Form */}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Select
            label="Recipient Country"
            options={countryOptions}
            placeholder="Select country"
            {...register('recipientCountry', { required: 'Select a country' })}
          />

          <Input
            label="Recipient Full Name"
            placeholder="Enter full name as on bank account"
            leftIcon={<HiUser size={18} />}
            {...register('recipientName', { required: 'Required' })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Bank Name"
              placeholder="e.g. Chase Bank"
              leftIcon={<HiOfficeBuilding size={18} />}
              {...register('recipientBank', { required: 'Required' })}
            />
            <Input
              label="SWIFT/BIC Code"
              placeholder="e.g. CHASUS33"
              {...register('swiftCode', { required: 'Required' })}
            />
          </div>

          <Input
            label="Account Number / IBAN"
            placeholder="Enter account number"
            {...register('recipientAccount', { required: 'Required' })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Currency"
              options={currencyOptions}
              placeholder="Select currency"
              {...register('currency', { required: 'Required' })}
            />
            <Input
              label="Amount (NGN)"
              type="number"
              placeholder="Amount in Naira"
              leftIcon={<HiCurrencyDollar size={18} />}
              {...register('amount', { valueAsNumber: true, required: 'Required', min: { value: 1000, message: 'Min ₦1,000' } })}
            />
          </div>

          <Select
            label="Purpose of Transfer"
            options={purposeOptions}
            placeholder="Select purpose"
            {...register('purpose', { required: 'Required' })}
          />

          <Input
            label="Narration (Optional)"
            placeholder="Additional note"
            leftIcon={<HiAnnotation size={18} />}
            {...register('narration')}
          />

          <Input
            label="Transaction PIN"
            type="password"
            placeholder="Enter 4-digit PIN"
            maxLength={4}
            leftIcon={<HiLockClosed size={18} />}
            hint="Use 1234 for demo"
            {...register('pin', { required: 'Required', minLength: { value: 4, message: '4 digits required' } })}
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={isProcessing}
            rightIcon={<HiArrowRight size={18} />}
          >
            Continue Transfer
          </Button>
        </form>
      </Card>

      {/* Confirmation Modal */}
      <Modal isOpen={showConfirmation} onClose={() => setShowConfirmation(false)} title="Confirm International Transfer">
        <div className="space-y-4">
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(watchedAmount || 0, 'NGN')}
            </p>
            <p className="text-sm text-emerald-600 mt-1">
              → {formatCurrency(convertedAmount, watchedCurrency)} + {formatCurrency(fee)} fee
            </p>
          </div>

          <div className="space-y-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Recipient</span>
              <span className="font-medium text-gray-900 dark:text-white">{watch('recipientName')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Country</span>
              <span className="font-medium text-gray-900 dark:text-white">{selectedCountry?.flag} {selectedCountry?.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Bank</span>
              <span className="font-medium text-gray-900 dark:text-white">{watch('recipientBank')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Exchange Rate</span>
              <span className="font-medium text-gray-900 dark:text-white">1 NGN = {exchangeRate?.rate} {watchedCurrency}</span>
            </div>
          </div>

          <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl">
            <p className="text-xs text-yellow-700 dark:text-yellow-400">
              ⚠️ International transfers may take 1-3 business days to complete.
            </p>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={() => setShowConfirmation(false)}>Cancel</Button>
            <Button fullWidth isLoading={isProcessing} onClick={handleConfirm}>Confirm & Send</Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccess} onClose={handleNewTransfer} size="sm">
        <div className="text-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6"
          >
            <HiCheck size={40} className="text-emerald-600" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Transfer Initiated!</h3>
          <p className="text-gray-500 text-sm mb-6">
            Your international transfer is being processed and will arrive within 1-3 business days.
          </p>
          <Button fullWidth onClick={handleNewTransfer}>Done</Button>
        </div>
      </Modal>
    </motion.div>
  );
}