'use client';

import { PropsWithChildren } from 'react';
import AuthProvider from '../../hooks/useAuth';
import { FilterProvider } from '@/hooks/useFilter';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { usePathname } from 'next/navigation';
import { ProtectedRoute } from './../protected-route/protected-route';

export default function Providers({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/';

  return (
    <AuthProvider>
      <FilterProvider>
        {isLoginPage ? children : <ProtectedRoute>{children}</ProtectedRoute>}
      </FilterProvider>
      <ToastContainer
        style={{
          zIndex: 999999,
        }}
      />
    </AuthProvider>
  );
}
