// src/app/(dashboard)/profile/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/settings');
  }, [router]);

  return null;
}