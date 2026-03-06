// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Logo from '@/components/shared/Logo';
import Button from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';
import {
  HiShieldCheck,
  HiGlobe,
  HiLightningBolt,
  HiCurrencyDollar,
  HiArrowRight,
  HiStar,
  HiUsers,
  HiChartBar,
} from 'react-icons/hi';

const features = [
  {
    icon: HiLightningBolt,
    title: 'Instant Transfers',
    description: 'Send money instantly to any bank account in Nigeria. Zero delays, zero stress.',
  },
  {
    icon: HiGlobe,
    title: 'Global Reach',
    description: 'Transfer money to over 150 countries worldwide at competitive exchange rates.',
  },
  {
    icon: HiShieldCheck,
    title: 'Bank-Grade Security',
    description: 'Your money is protected with military-grade encryption and multi-factor authentication.',
  },
  {
    icon: HiCurrencyDollar,
    title: 'Low Fees',
    description: 'Enjoy the lowest transfer fees in the market. No hidden charges, ever.',
  },
];

const stats = [
  { icon: HiUsers, value: '2M+', label: 'Active Users' },
  { icon: HiChartBar, value: '₦50B+', label: 'Transactions' },
  { icon: HiStar, value: '4.9', label: 'App Rating' },
  { icon: HiGlobe, value: '150+', label: 'Countries' },
];

export default function HomePage() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-pulse">
          <Logo size="xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo size="md" linkTo="/" />
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors">Features</a>
              <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors">About</a>
              <a href="#" className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-emerald-600 transition-colors">Contact</a>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/signin">
                <Button variant="ghost" size="sm">Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full text-emerald-700 dark:text-emerald-400 text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Now live in 150+ countries
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold text-gray-900 dark:text-white leading-tight mb-6"
            >
              Banking Made{' '}
              <span className="gradient-text">Simple</span>,{' '}
              <br className="hidden sm:block" />
              Transfers Made{' '}
              <span className="gradient-text">Global</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto"
            >
              Send and receive money instantly across Nigeria and worldwide.
              Experience the future of digital banking with O'Money.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/signup">
                <Button size="lg" rightIcon={<HiArrowRight />}>
                  Create Free Account
                </Button>
              </Link>
              <Link href="/signin">
                <Button variant="outline" size="lg">
                  Sign In to Dashboard
                </Button>
              </Link>
            </motion.div>

            {/* Demo credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-sm text-gray-500"
            >
              <span>Demo: demo@omoney.com / Demo@1234</span>
            </motion.div>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          >
            {stats.map((stat, i) => (
              <div key={i} className="text-center p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
                <stat.icon className="mx-auto mb-3 text-emerald-600" size={28} />
                <div className="text-2xl lg:text-3xl font-bold font-display text-gray-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              From local transfers to international payments, O'Money has got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 lg:p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:shadow-xl hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-emerald-600 p-8 lg:p-16 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/20" />
              <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full bg-white/10" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-emerald-200 mb-8 max-w-xl mx-auto">
                Join over 2 million users who trust O'Money for their everyday banking needs.
              </p>
              <Link href="/signup">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-emerald-700 hover:bg-gray-100"
                  rightIcon={<HiArrowRight />}
                >
                  Open Your Account Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <Logo size="md" linkTo="/" />
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Modern digital banking for everyone. Fast, secure, and reliable.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Personal</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Business</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Cards</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Savings</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-emerald-600 transition-colors">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} O'Money. All rights reserved. Licensed by the Central Bank of Nigeria.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}