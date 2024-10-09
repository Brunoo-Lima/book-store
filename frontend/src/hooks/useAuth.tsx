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

interface IUser {
  id: string;
  email: string;
}

export interface AuthToken {
  token: string;
}

interface IAuthProvider {
  user: IUser;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
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
  const [user, setUser] = useState<IUser>({} as IUser);
  const [authToken, setAuthToken] = useState<AuthToken>({} as AuthToken);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const fetchUserData = async () => {
      const storageToken = localStorage.getItem('@token:access');

      if (storageToken) {
        try {
          setAuthToken({ token: storageToken });

          // setUser({
          //   id: data.user.id,
          //   email: data.user.email,
          // });
        } catch (err) {
          logout();
        }
      } else {
        router.push('/');
      }

      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('@token:access');
    if (accessToken && pathname === '/') {
      router.replace('/clientes');
    }
  }, [router]);

  useEffect(() => {
    if (!loading && !authToken.token && pathname !== '/') {
      router.push('/');
    }
  }, [loading, authToken.token, pathname, router]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { user: userData, token } = await loginService({
        email,
        password,
      });

      if (userData && token) {
        setAuthToken({ token });

        setUser({
          id: userData.id,
          email: userData.email,
        });

        localStorage.setItem('@token:access', token);
      }

      router.replace('/clientes');

      // else {
      //   toast.error('Usuário ou senha inválidos!');
      // }
    } catch (err: any) {
      toast.error('Erro ao tentar logar, verifique suas credenciais.');
    }

    setLoading(false);
  };

  const logout = () => {
    setUser({} as IUser);
    setAuthToken({} as AuthToken);
    localStorage.removeItem('@token:access');
    router.push('/');
  };

  const authValues = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      loading,
      isAuthenticated: !!user.id,
    }),
    [user, loading]
  );

  // if (loading) {
  //   return null;
  // }

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
