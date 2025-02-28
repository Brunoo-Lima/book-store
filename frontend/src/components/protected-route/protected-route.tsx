import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  return children;
};
