'use client';

import { PropsWithChildren } from 'react';
import AuthProvider from '../../hooks/useAuth';
import { FilterProvider } from '@/hooks/useFilter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function Providers({ children }: PropsWithChildren) {
  return (
    <AuthProvider>
      <FilterProvider>{children}</FilterProvider>
      <ToastContainer
        style={{
          zIndex: 999999,
        }}
      />
    </AuthProvider>
  );
}
