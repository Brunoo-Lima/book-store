/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { loginService } from '@/services/login';
import { redirect, usePathname, useRouter } from 'next/navigation';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';

export interface AuthToken {
  token: string;
}

interface IAuthProvider {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

interface ChildrenProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [authToken, setAuthToken] = useState<AuthToken>({} as AuthToken);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      const storageToken = localStorage.getItem('@token:access');

      if (storageToken) {
        setAuthToken({ token: storageToken });
      } else {
        router.push('/');
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (authToken.token && pathname === '/') {
      router.replace('/clientes');
    }
  }, [authToken.token, pathname, router]);

  useEffect(() => {
    if (!loading && !authToken.token && pathname !== '/') {
      router.push('/');
    }
  }, [loading, authToken.token, pathname, router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { token } = await loginService({
        email,
        password,
      });

      if (token) {
        setAuthToken({ token });
        localStorage.setItem('@token:access', token);
        router.replace('/clientes');
      }
    } catch (err: any) {
      toast.error('Erro ao tentar logar, verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthToken({} as AuthToken);
    localStorage.removeItem('@token:access');
    router.push('/');
  };

  const authValues = useMemo(
    () => ({
      login,
      logout,
      loading,
      isAuthenticated: !!authToken.token,
    }),
    [loading, authToken.token]
  );

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
