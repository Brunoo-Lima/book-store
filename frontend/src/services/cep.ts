import { IAddress } from '@/@types/client';
import axios from 'axios';

interface IAddressAPI {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
  unidade: string;
}

export const getCep = async (cep: string) => {
  try {
    const response = await axios.get<IAddressAPI>(
      `https:viacep.com.br/ws/${cep}/json/`
    );

    if (!response || response.status !== 200) {
      throw new Error('Algo deu errado!');
    }

    return response.data;
  } catch (err) {
    throw new Error('Ferrou!');
  }
};
