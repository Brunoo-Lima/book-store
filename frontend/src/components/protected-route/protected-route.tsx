import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  if (loading || !isAuthenticated) {
    return <p>Carregando...</p>;
  }

  return children;
};
