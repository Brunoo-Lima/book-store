/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { loginService } from '@/services/login';
import handleError from '@/utilities/handle-toast';
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
  login: (user: string, password: string) => Promise<void>;
  logout: () => void;
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

          const data = await loginService(JSON.parse(storageToken));

          setUser({
            id: data.user.id,
            email: data.user.email,
          });
        } catch (err) {
          logout();
        }
        // setLoading(false);
      } else {
        router.push('/');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('@token:access');
    if (accessToken && pathname === '/') {
      router.replace('/clientes');
    }
  }, [router]);

  const login = async (user: string, password: string) => {
    try {
      const { user: userData, token } = await loginService({
        email: user,
        password,
      });

      if (userData && token) {
        setAuthToken({ token });

        setUser({
          id: userData.id,
          email: userData.email,
        });

        localStorage.setItem('@token:access', token);
        router.push('/clientes');
      } else {
        toast.error('Usuário ou senha inválidos!');
      }
    } catch (err) {
      toast.error('Erro ao tentar logar, verifique suas credenciais.');
    }
  };

  const logout = () => {
    setUser({} as IUser);
    localStorage.removeItem('@token:access');
    localStorage.removeItem('@user:data');
    router.push('/');
  };

  const isAuthenticated = !!user.id;

  const publicRoutes = ['/'];

  useEffect(() => {
    if (!loading && !isAuthenticated && !publicRoutes.includes(pathname)) {
      redirect('/');
    }
  }, [loading, isAuthenticated, pathname]);

  const authValues = useMemo(
    () => ({
      user,
      setUser,
      login,
      logout,
      isAuthenticated,
      publicRoutes,
    }),
    [user]
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
