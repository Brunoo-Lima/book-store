import handleError from '@/utilities/handle-toast';
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
  estado: string;
  unidade: string;
}

export const getCep = async (cep: string) => {
  try {
    const response = await axios.get<IAddressAPI>(
      `https:viacep.com.br/ws/${cep}/json/`
    );

    if (!response || response.status !== 200) {
      handleError('Algo deu errado!');
      return;
    }

    return response.data;
  } catch (err) {
    handleError(err);
  }
};
