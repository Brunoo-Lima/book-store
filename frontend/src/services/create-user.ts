import { IUser } from '@/@types/user';
import api from './api';
import handleError from '@/utilities/handle-toast';

export const createUser = async (user: IUser) => {
  try {
    const response = await api.put('user/create', user);
    return response.data;
  } catch (err) {
    handleError(err);
    throw err;
  }
};
