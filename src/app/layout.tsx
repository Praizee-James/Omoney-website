// src/app/layout.tsx
import type { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { TransactionProvider } from '@/context/TransactionContext';
import './global.css';

export const metadata: Metadata = {
  title: "O'Money - Modern Digital Banking",
  description: "Send money locally and internationally with O'Money. Fast, secure, and reliable digital banking.",
  keywords: 'fintech, digital banking, money transfer, international transfer, Nigeria',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <AuthProvider>
          <TransactionProvider>
            {children}
          </TransactionProvider>
        </AuthProvider>
      </body>
    </html>
  );
}