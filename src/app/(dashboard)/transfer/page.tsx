// src/app/(dashboard)/transfer/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  HiSwitchHorizontal,
  HiUser,
  HiOfficeBuilding,
  HiCurrencyDollar,
  HiAnnotation,
  HiLockClosed,
  HiCheck,
  HiArrowRight,
  HiBookmark,
} from 'react-icons/hi';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Modal from '@/components/ui/Modal';
import Badge from '@/components/ui/Badge';
import { useTransactions } from '@/context/TransactionContext';
import { useAuth } from '@/context/AuthContext';
import { localTransferSchema, LocalTransferFormData } from '@/lib/validators';
import { NIGERIAN_BANKS, MOCK_BENEFICIARIES } from '@/lib/constants';
import { formatCurrency, generateReference } from '@/lib/utils';

export default function TransferPage() {
  const { isProcessing, makeTransfer } = useTransactions();
  const { accounts } = useAuth();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBeneficiaries, setShowBeneficiaries] = useState(false);
  const [formData, setFormData] = useState<LocalTransferFormData | null>(null);
  const [resolvedName, setResolvedName] = useState('');
  const [isResolving, setIsResolving] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<LocalTransferFormData>({
    resolver: zodResolver(localTransferSchema),
    defaultValues: {
      amount: 0,
    },
  });

  const watchedAccount = watch('recipientAccount');
  const watchedBank = watch('recipientBank');
  const watchedAmount = watch('amount');

  // Simulate account name resolution
  React.useEffect(() => {
    if (watchedAccount?.length === 10 && watchedBank) {
      setIsResolving(true);
      const timer = setTimeout(() => {
        const names = [
          'Adebayo Johnson', 'Chioma Okafor', 'Emeka Nwosu',
          'Fatima Ibrahim', 'Oluwaseun Adeyemi', 'Ngozi Eze',
        ];
        setResolvedName(names[Math.floor(Math.random() * names.length)]);
        setIsResolving(false);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      setResolvedName('');
    }
  }, [watchedAccount, watchedBank]);

  const onSubmit = (data: LocalTransferFormData) => {
    setFormData(data);
    setShowConfirmation(true);
  };

  const handleConfirmTransfer = async () => {
    if (!formData) return;
    setShowConfirmation(false);

    await makeTransfer({
      recipientAccount: formData.recipientAccount,
      recipientBank: NIGERIAN_BANKS.find(b => b.code === formData.recipientBank)?.name || '',
      recipientName: resolvedName,
      amount: formData.amount,
      currency: 'NGN',
      narration: formData.narration || '',
      pin: formData.pin,
    });

    setShowSuccess(true);
  };

  const handleSelectBeneficiary = (ben: typeof MOCK_BENEFICIARIES[0]) => {
    setValue('recipientAccount', ben.accountNumber);
    setValue('recipientBank', ben.bankCode);
    setResolvedName(ben.accountName);
    setShowBeneficiaries(false);
  };

  const handleNewTransfer = () => {
    setShowSuccess(false);
    reset();
    setResolvedName('');
    setFormData(null);
  };

  const fee = watchedAmount > 5000 ? 25 : 10;
  const bankOptions = NIGERIAN_BANKS.map(b => ({ value: b.code, label: b.name }));
  const localBeneficiaries = MOCK_BENEFICIARIES.filter(b => !b.isInternational);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl mx-auto space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
            <HiSwitchHorizontal size={20} className="text-emerald-600" />
          </div>
          Local Transfer
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Send money to any bank in Nigeria</p>
      </div>

      {/* Beneficiaries */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Saved Beneficiaries</h3>
          <button
            onClick={() => setShowBeneficiaries(true)}
            className="text-sm text-emerald-600 font-medium hover:text-emerald-700"
          >
            View all
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
          {localBeneficiaries.map(ben => (
            <button
              key={ben.id}
              onClick={() => handleSelectBeneficiary(ben)}
              className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                {ben.accountName.split(' ').map(n => n[0]).join('')}
              </div>
              <span className="text-xs text-gray-600 dark:text-gray-400 max-w-[80px] truncate">
                {ben.accountName.split(' ')[0]}
              </span>
            </button>
          ))}
        </div>
      </Card>

      {/* Transfer Form */}
      <Card>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Select
            label="Recipient Bank"
            options={bankOptions}
            placeholder="Select a bank"
            error={errors.recipientBank?.message}
            {...register('recipientBank')}
          />

          <div>
            <Input
              label="Account Number"
              type="text"
              placeholder="Enter 10-digit account number"
              maxLength={10}
              leftIcon={<HiUser size={18} />}
              error={errors.recipientAccount?.message}
              {...register('recipientAccount')}
            />
            {isResolving && (
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-2">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Resolving account name...
              </p>
            )}
            {resolvedName && !isResolving && (
              <p className="text-xs text-emerald-600 mt-1 flex items-center gap-1">
                <HiCheck size={14} />
                {resolvedName}
              </p>
            )}
          </div>

          <Input
            label="Amount (₦)"
            type="number"
            placeholder="Enter amount"
            leftIcon={<HiCurrencyDollar size={18} />}
            error={errors.amount?.message}
            hint={`Balance: ${formatCurrency(accounts[0]?.balance || 0)} • Fee: ${formatCurrency(fee)}`}
            {...register('amount', { valueAsNumber: true })}
          />

          <Input
            label="Narration (Optional)"
            type="text"
            placeholder="What's this for?"
            leftIcon={<HiAnnotation size={18} />}
            {...register('narration')}
          />

          <Input
            label="Transaction PIN"
            type="password"
            placeholder="Enter 4-digit PIN"
            maxLength={4}
            leftIcon={<HiLockClosed size={18} />}
            error={errors.pin?.message}
            hint="Use 1234 for demo"
            {...register('pin')}
          />

          <Button
            type="submit"
            fullWidth
            size="lg"
            isLoading={isProcessing}
            rightIcon={<HiArrowRight size={18} />}
            disabled={!resolvedName || isResolving}
          >
            Continue Transfer
          </Button>
        </form>
      </Card>

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        title="Confirm Transfer"
      >
        <div className="space-y-4">
          <div className="text-center py-4">
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(formData?.amount || 0)}
            </p>
            <p className="text-sm text-gray-500 mt-1">+ {formatCurrency(fee)} fee</p>
          </div>

          <div className="space-y-3 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Recipient</span>
              <span className="font-medium text-gray-900 dark:text-white">{resolvedName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Bank</span>
              <span className="font-medium text-gray-900 dark:text-white">
                {NIGERIAN_BANKS.find(b => b.code === formData?.recipientBank)?.name}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Account</span>
              <span className="font-medium text-gray-900 dark:text-white">{formData?.recipientAccount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Reference</span>
              <span className="font-medium text-gray-900 dark:text-white font-mono text-xs">{generateReference()}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button fullWidth isLoading={isProcessing} onClick={handleConfirmTransfer}>
              Confirm & Send
            </Button>
          </div>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal
        isOpen={showSuccess}
        onClose={handleNewTransfer}
        size="sm"
      >
        <div className="text-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mx-auto mb-6"
          >
            <HiCheck size={40} className="text-emerald-600" />
          </motion.div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Transfer Successful!</h3>
          <p className="text-gray-500 text-sm mb-6">
            {formatCurrency(formData?.amount || 0)} has been sent to {resolvedName}
          </p>
          <div className="space-y-3">
            <Button fullWidth onClick={handleNewTransfer}>
              New Transfer
            </Button>
            <Button variant="ghost" fullWidth onClick={() => { handleNewTransfer(); window.location.href = '/history'; }}>
              View Transaction
            </Button>
          </div>
        </div>
      </Modal>

      {/* Beneficiaries Modal */}
      <Modal
        isOpen={showBeneficiaries}
        onClose={() => setShowBeneficiaries(false)}
        title="Saved Beneficiaries"
      >
        <div className="space-y-2">
          {localBeneficiaries.map(ben => (
            <button
              key={ben.id}
              onClick={() => handleSelectBeneficiary(ben)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                {ben.accountName.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{ben.accountName}</p>
                <p className="text-xs text-gray-500">{ben.bankName} • {ben.accountNumber}</p>
              </div>
              <HiBookmark size={16} className="text-emerald-500" />
            </button>
          ))}
        </div>
      </Modal>
    </motion.div>
  );
}