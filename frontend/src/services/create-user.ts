import { IUser } from '@/@types/user';
import api from './api';
import handleError from '@/utilities/handle-toast';

export const createUser = async (user: IUser) => {
  try {
    const { data, status } = await api.put('user/create', user);

    if (status !== 200 || !data) {
      handleError(status);
      return null;
    }

    return data;
  } catch (err) {
    handleError(err);
  }
};
