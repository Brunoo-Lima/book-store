import { IUser } from '@/@types/user';
import api from './api';
import { toast } from 'react-toastify';

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
  } catch (err) {
    console.log(err);

    return {
      token: '',
      user: {
        id: '',
        email: '',
      },
    } as ILogin;
  }
};
