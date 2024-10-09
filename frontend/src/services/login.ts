import { IUser } from '@/@types/user';
import api from './api';
import axios from 'axios';

interface IUserData {
  id: string;
  email: string;
}

interface ILogin {
  token: string;
  user: IUserData;
}

export const loginService = async ({
  email,
  password,
}: IUser): Promise<ILogin> => {
  try {
    const { data } = await api.post<ILogin>('/login/token', {
      email,
      password,
    });

    if (!data) {
      return {} as ILogin;
    }

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 400) {
        throw new Error('Usuário ou senha inválidos');
      } else if (status === 500) {
        throw new Error('Erro interno do servidor');
      }
      const message =
        error.response?.data?.message ||
        'Erro desconhecido, Por favor, tente novamente.';

      throw new Error(message);
    }
    throw new Error('Erro ao realizar login');
  }
};
