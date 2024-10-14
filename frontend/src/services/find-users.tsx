import handleError from '@/utilities/handle-toast';
import api from './api';

export const findUsers = async () => {
  try {
    const response = await api.post('client/find');
    return response.data;
  } catch (err) {
    handleError(err);
    throw err;
  }
};
