// src/app/(dashboard)/settings/page.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  HiCog,
  HiUser,
  HiShieldCheck,
  HiBell,
  HiColorSwatch,
  HiLockClosed,
  HiDeviceMobile,
  HiFingerPrint,
  HiMoon,
  HiGlobe,
  HiLogout,
  HiChevronRight,
  HiCheck,
} from 'react-icons/hi';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Modal from '@/components/ui/Modal';
import { useAuth } from '@/context/AuthContext';

export default function SettingsPage() {
  const { user, updateProfile, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState('profile');
  const [showChangePin, setShowChangePin] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false,
  });

  const sections = [
    { id: 'profile', label: 'Profile', icon: HiUser },
    { id: 'security', label: 'Security', icon: HiShieldCheck },
    { id: 'notifications', label: 'Notifications', icon: HiBell },
    { id: 'preferences', label: 'Preferences', icon: HiColorSwatch },
  ];

  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const handleSaveProfile = () => {
    updateProfile(profileForm);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"{...{} as any}
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
            <HiCog size={20} className="text-gray-600 dark:text-gray-400" />
          </div>
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar Nav */}
        <Card className="lg:col-span-1 h-fit">
          <nav className="space-y-1">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === section.id
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                <section.icon size={18} />
                {section.label}
              </button>
            ))}
            <button
              onClick={signOut}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <HiLogout size={18} />
              Sign Out
            </button>
          </nav>
        </Card>

        {/* Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6"{...{} as any}>
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Personal Information</h3>

                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                    {user?.firstName?.[0]}{user?.lastName?.[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {user?.firstName} {user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                    <button className="text-sm text-emerald-600 font-medium mt-1 hover:text-emerald-700">
                      Change photo
                    </button>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={profileForm.firstName}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                  <Input
                    label="Last Name"
                    value={profileForm.lastName}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <Input
                    label="Phone"
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div className="mt-4">
                  <Input
                    label="Address"
                    value={profileForm.address}
                    placeholder="Enter your address"
                    onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>

                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-gray-500">Account Number</span>
                    <span className="font-mono font-medium text-gray-900 dark:text-white">{user?.accountNumber}</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-gray-500">Bank</span>
                    <span className="font-medium text-gray-900 dark:text-white">O'Money</span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-gray-500">Verification</span>
                    <span className={`font-medium ${user?.isVerified ? 'text-emerald-600' : 'text-yellow-600'}`}>
                      {user?.isVerified ? '✓ Verified' : 'Pending'}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm py-2">
                    <span className="text-gray-500">Member Since</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6"{...{} as any}>
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Security Settings</h3>
                <div className="space-y-4">
                  {[
                    { icon: HiLockClosed, title: 'Change Password', desc: 'Update your password regularly', action: 'Change' },
                    { icon: HiFingerPrint, title: 'Change PIN', desc: 'Update your 4-digit transaction PIN', action: 'Change' },
                    { icon: HiDeviceMobile, title: 'Two-Factor Authentication', desc: 'Add an extra layer of security', action: 'Enable' },
                    { icon: HiShieldCheck, title: 'Biometric Login', desc: 'Use fingerprint or face to login', action: 'Setup' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                          <item.icon size={20} className="text-gray-600 dark:text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        {item.action}
                        <HiChevronRight size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Current Device</p>
                        <p className="text-xs text-gray-500">Chrome • Lagos, Nigeria</p>
                      </div>
                    </div>
                    <span className="text-xs text-emerald-600 font-medium">Active now</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Notification Preferences</h3>
                <div className="space-y-4">
                  {[
                    { key: 'email', title: 'Email Notifications', desc: 'Receive transaction alerts via email' },
                    { key: 'push', title: 'Push Notifications', desc: 'Get real-time alerts on your device' },
                    { key: 'sms', title: 'SMS Notifications', desc: 'Receive alerts via text message' },
                    { key: 'marketing', title: 'Marketing Emails', desc: 'Receive promotions and updates' },
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{item.title}</p>
                        <p className="text-xs text-gray-500">{item.desc}</p>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'bg-emerald-500'
                            : 'bg-gray-300 dark:bg-gray-700'
                        }`}
                      >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                          notifications[item.key as keyof typeof notifications]
                            ? 'translate-x-6'
                            : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {/* Preferences Section */}
          {activeSection === 'preferences' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6"{...{} as any}>
              <Card>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Display Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <HiMoon size={20} className="text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Dark Mode</p>
                        <p className="text-xs text-gray-500">Toggle dark/light theme</p>
                      </div>
                    </div>
                    <button
                      onClick={() => document.documentElement.classList.toggle('dark')}
                      className="relative w-11 h-6 bg-gray-300 dark:bg-emerald-500 rounded-full transition-colors"
                    >
                      <div className="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform translate-x-1 dark:translate-x-6 shadow-sm" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <HiGlobe size={20} className="text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Language</p>
                        <p className="text-xs text-gray-500">Select your preferred language</p>
                      </div>
                    </div>
                    <select className="text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300">
                      <option>English</option>
                      <option>Français</option>
                      <option>Yoruba</option>
                      <option>Igbo</option>
                      <option>Hausa</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <HiCog size={20} className="text-gray-600 dark:text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Default Currency</p>
                        <p className="text-xs text-gray-500">Set your primary currency</p>
                      </div>
                    </div>
                    <select className="text-sm bg-gray-100 dark:bg-gray-800 border-0 rounded-lg px-3 py-1.5 text-gray-700 dark:text-gray-300">
                      <option>NGN - Nigerian Naira</option>
                      <option>USD - US Dollar</option>
                      <option>GBP - British Pound</option>
                      <option>EUR - Euro</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="border-red-200 dark:border-red-800/50">
                <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <Button variant="danger" size="sm">
                  Delete Account
                </Button>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}