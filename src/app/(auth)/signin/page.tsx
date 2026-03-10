// src/app/(auth)/signin/page.tsx
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HiMail, HiLockClosed, HiArrowRight } from 'react-icons/hi';
import Logo from '@/components/shared/Logo';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { signInSchema, SignInFormData } from '@/lib/validators';

export default function SignInPage() {
  const router = useRouter();
  const { signIn, isLoading } = useAuth();
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: SignInFormData) => {
    setError('');
    const success = await signIn(data.email, data.password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Invalid email or password. Try demo@omoney.com / Demo@1234');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Logo size="lg" className="mb-8" />

          <h1 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Sign in to your O'Money account to continue
          </p>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-sm text-red-600 dark:text-red-400"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              leftIcon={<HiMail size={18} />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              leftIcon={<HiLockClosed size={18} />}
              error={errors.password?.message}
              {...register('password')}
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <a href="#" className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              fullWidth
              size="lg"
              isLoading={isLoading}
              rightIcon={<HiArrowRight size={18} />}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{' '}
              <Link href="/signup" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                Create one
              </Link>
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl">
            <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400 mb-1">Demo Credentials</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-500">
              Email: demo@omoney.com<br />
              Password: Demo@1234
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white/5 rounded-full blur-xl" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-white/5 rounded-full blur-xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center text-white p-12 max-w-lg"
        >
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-xl flex items-center justify-center mx-auto mb-8">
            <span className="text-4xl font-display font-bold">O'</span>
          </div>
          <h2 className="text-3xl font-display font-bold mb-4">
            Your Money, Your Way
          </h2>
          <p className="text-emerald-200 text-lg leading-relaxed">
            Transfer money locally and internationally with lightning speed.
            Join millions who trust O'Money for their everyday banking.
          </p>

          {/* Floating Elements */}
          <div className="mt-12 flex justify-center gap-4">
            <div className="animate-float px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm text-sm">
              🇳🇬 Nigeria
            </div>
            <div className="animate-float px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm text-sm" style={{ animationDelay: '0.5s' }}>
              🇺🇸 USA
            </div>
            <div className="animate-float px-4 py-2 bg-white/10 rounded-xl backdrop-blur-sm text-sm" style={{ animationDelay: '1s' }}>
              🇬🇧 UK
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}