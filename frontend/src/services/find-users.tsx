import handleError from '@/utilities/handle-toast';
import api from './api';
import { IClient } from '@/@types/client';
import { IClientList } from '@/@types/list-table-client';

export const findUsers = async (filters: Partial<IClient> = {}) => {
  try {
    const response = await api.post<IClientList>('/client/find', filters);

    console.log(response.data, 'data');

    if (!response.data || !response.data) {
      throw new Error('Algo deu errado!');
    }

    // Mapeando a resposta da API para o formato da interface IClient
    const clients: IClient[] = response.data.clients.map((client) => ({
      id: client.cli_id,
      phones: client.cli_phone.map((phone) => ({
        ddd: phone.pho_ddd,
        number: phone.pho_number,
        typePhone: phone.pho_type_phone,
      })),
      profilePurchase: client.cli_profilePurchase,
      name: client.cli_name,
      dateOfBirth: client.cli_dateOfBirth,
      email: '', // Defina como necessário, se houver
      cpf: client.cli_cpf,
      gender: client.cli_gender,
      password: '', // Defina como necessário, se houver
      confirmPassword: '', // Defina como necessário, se houver
      addresses: client.cli_address.map((address) => ({
        streetName: address.add_streetName,
        publicPlace: address.add_publicPlace,
        nameAddress: address.add_name,
        number: address.add_number,
        cep: address.add_cep,
        neighborhood: address.add_neighborhood,
        city: address.add_city,
        state: address.add_state,
        country: '', // Defina como necessário, se houver
        compostName: address.add_compostName,
        typeResidence: address.add_typeResidence,
        change: address.add_isBilling, // Ou outra lógica se necessário
        delivery: address.add_isDelivery,
      })),
      creditCart: client.cli_creditCards.map((card) => ({
        namePrinted: '', // Defina como necessário, se houver
        number: '', // Defina como necessário, se houver
        cvv: 0, // Defina como necessário, se houver
        dateValid: '', // Defina como necessário, se houver
        flag: '', // Defina como necessário, se houver
        preference: false, // Defina como necessário, se houver
      })),
    }));

    console.log(clients, 'clients');
    return clients;
  } catch (err) {
    handleError(err);
    throw err;
  }
};
