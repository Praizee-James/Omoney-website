// src/components/shared/Logo.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  linkTo?: string;
}

export default function Logo({ size = 'md', showText = true, className, linkTo = '/' }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg' },
    md: { icon: 'w-10 h-10', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl' },
  };

  const content = (
    <div className={cn('flex items-center gap-2', className)}>
      <div className={cn(
        'relative rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/25',
        sizes[size].icon
      )}>
        <span className="text-white font-display font-bold text-lg">O'</span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-transparent to-white/20" />
      </div>
      {showText && (
        <span className={cn(
          'font-display font-bold text-gray-900 dark:text-white',
          sizes[size].text
        )}>
          O'<span className="text-emerald-600">Money</span>
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return <Link href={linkTo}>{content}</Link>;
  }

  return content;
}