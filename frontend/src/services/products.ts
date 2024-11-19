import { IProduct, IProductDTO, IProductList } from '@/@types/product';
import api from './api';
import handleError from '@/utilities/handle-toast';
import { useQuery } from '@tanstack/react-query';

export const listProducts = async () => {
  try {
    const { data, status } = await api.post<IProductList>(
      '/product/listProducts'
    );

    if (status !== 200 || !data) {
      handleError(status);
      return null;
    }

    return data;
  } catch (err) {
    handleError(err);
  }
};

export const createProduct = async (product: IProductDTO) => {
  try {
    const { data, status } = await api.put<IProductDTO>('/product/addProduct', {
      ...product,
    });

    if (status !== 200 || !data) {
      handleError(status);
      return null;
    }

    return data;
  } catch (err) {
    handleError(err);
  }
};
