// src/components/ui/Loader.tsx
'use client';

import React from 'react';
import Logo from '@/components/shared/Logo';

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-950 flex flex-col items-center justify-center z-50">
      <div className="animate-pulse">
        <Logo size="xl" />
      </div>
      <div className="mt-8 flex gap-1">
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  );
}