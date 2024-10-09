import { IUser } from '@/@types/user';
import api from './api';

export const createUser = async (user: IUser) => {
  try {
    const response = await api.put('user/create', user);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
