// src/app/(auth)/signup/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiUser, HiMail, HiLockClosed, HiPhone, HiArrowRight, HiCheck } from 'react-icons/hi';
import Logo from '@/components/shared/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { signUpSchema, SignUpFormData } from '@/lib/validators';

const passwordRequirements = [
  { label: '8+ characters', test: (v: string) => v.length >= 8 },
  { label: 'Uppercase letter', test: (v: string) => /[A-Z]/.test(v) },
  { label: 'Lowercase letter', test: (v: string) => /[a-z]/.test(v) },
  { label: 'Number', test: (v: string) => /[0-9]/.test(v) },
  { label: 'Special character', test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

export default function SignUpPage() {
  const router = useRouter();
  const { signUp, isLoading } = useAuth();
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      terms: false,
    },
  });

  const password = watch('password', '');

  const onSubmit = async (data: SignUpFormData) => {
    setError('');
    const success = await signUp({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    });
    if (success) {
      router.push('/dashboard');
    } else {
      setError('An account with this email already exists.');
    }
  };

  const handleNextStep = async () => {
    const isValid = await trigger(['firstName', 'lastName', 'email', 'phone']);
    if (isValid) setStep(2);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-linear-to-br from-emerald-900 via-emerald-800 to-emerald-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/5 rounded-full blur-xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white p-12 max-w-lg"{...{} as any}
        >
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl font-display font-bold">O'</span>
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">
            Start Your Journey
          </h2>
          <p className="text-emerald-200 text-lg leading-relaxed">
            Create your O'Money account in under 2 minutes and start sending money worldwide.
          </p>

          <div className="mt-12 space-y-3 text-left max-w-xs mx-auto">
            {['Free account creation', 'Instant local transfers', 'International money transfer', 'Virtual & physical cards'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-emerald-200">
                <div className="w-6 h-6 rounded-full bg-emerald-500/30 flex items-center justify-center">
                  <HiCheck size={14} className="text-emerald-300" />
                </div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"{...{} as any}
        >
          <Logo size="lg" className="mb-8" />

          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Create your account
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Step {step} of 2 — {step === 1 ? 'Personal details' : 'Security setup'}
          </p>

          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-800'}`} />
            <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-800'}`} />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400"{...{} as any}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"{...{} as any}
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="John"
                    leftIcon={<HiUser size={18} />}
                    error={errors.firstName?.message}
                    {...register('firstName')}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Doe"
                    leftIcon={<HiUser size={18} />}
                    error={errors.lastName?.message}
                    {...register('lastName')}
                  />
                </div>

                <Input
                  label="Email Address"
                  type="email"
                  placeholder="john@example.com"
                  leftIcon={<HiMail size={18} />}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+234 801 234 5678"
                  leftIcon={<HiPhone size={18} />}
                  error={errors.phone?.message}
                  {...register('phone')}
                />

                <Button
                  type="button"
                  fullWidth
                  size="lg"
                  rightIcon={<HiArrowRight size={18} />}
                  onClick={handleNextStep}
                >
                  Continue
                </Button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-5"{...{} as any}
              >
                <Input
                  label="Password"
                  type="password"
                  placeholder="Create a strong password"
                  leftIcon={<HiLockClosed size={18} />}
                  error={errors.password?.message}
                  {...register('password')}
                />

                {/* Password Requirements */}
                <div className="grid grid-cols-2 gap-2">
                  {passwordRequirements.map((req) => (
                    <div
                      key={req.label}
                      className={`flex items-center gap-2 text-xs ${
                        req.test(password)
                          ? 'text-emerald-600'
                          : 'text-gray-400'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          req.test(password)
                            ? 'bg-emerald-100 dark:bg-emerald-900/30'
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                      >
                        {req.test(password) && <HiCheck size={10} />}
                      </div>
                      {req.label}
                    </div>
                  ))}
                </div>

                <Input
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  leftIcon={<HiLockClosed size={18} />}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />

                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    {...register('terms')}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    I agree to the{' '}
                    <a href="#" className="text-emerald-600 hover:underline">Terms of Service</a>{' '}
                    and{' '}
                    <a href="#" className="text-emerald-600 hover:underline">Privacy Policy</a>
                  </span>
                </label>
                {errors.terms && <p className="text-sm text-red-500">{errors.terms.message}</p>}

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="secondary"
                    size="lg"
                    onClick={() => setStep(1)}
                    className="flex-1"
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                    rightIcon={<HiArrowRight size={18} />}
                    className="flex-1"
                  >
                    Create Account
                  </Button>
                </div>
              </motion.div>
            )}
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{' '}
              <Link href="/signin" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}