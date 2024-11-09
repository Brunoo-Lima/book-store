import handleError from '@/utilities/handle-toast';
import api from './api';
import { IClient } from '@/@types/client';
import { IClientList } from '@/@types/list-table-client';
import { useMutation, useQuery } from '@tanstack/react-query';

export const findClients = async (filters: Partial<IClient> = {}) => {
  try {
    const { data, status } = await api.post<IClientList>(
      '/client/find',
      filters
    );

    if (status !== 200 || !data) {
      handleError(status);
    }

    // Mapeando a resposta da API para o formato da interface IClient
    const clients: IClient[] = data.clients.map((client) => ({
      id: client.cli_id,
      phones: client.cli_phone.map((phone) => ({
        ddd: phone.pho_ddd,
        number: phone.pho_number,
        typePhone: phone.pho_type_phone,
      })),
      profilePurchase: client.cli_profilePurchase,
      name: client.cli_name,
      dateOfBirth: client.cli_dateOfBirth,
      email: client.cli_email,
      cpf: client.cli_cpf,
      gender: client.cli_gender,
      password: client.cli_password,
      confirmPassword: '',
      status: client.cli_status,
      score: client.cli_score,
      ranking: client.cli_ranking,
      created_at: client.created_at,
      log: client.cli_log.map((log) => ({
        created: log.created_at,
        action: log.log_action,
        user: log.fk_log_use_id,
        updated: log.updated_at,
      })),
      addresses: client.cli_address.map((address) => ({
        streetName: address.add_streetName,
        publicPlace: address.add_publicPlace,
        nameAddress: address.add_name,
        number: address.add_number,
        cep: address.add_cep,
        neighborhood: address.add_neighborhood,
        city: address.add_city,
        state: address.add_state,
        country: 'BRASIL',
        compostName: address.add_compostName,
        typeResidence: address.add_typeResidence,
        change: address.add_isBilling,
        delivery: address.add_isDelivery,
      })),
      creditCard: client.cli_creditCards.map((card) => ({
        namePrinted: card.namePrinted,
        number: card.number,
        cvv: card.cvv,
        dateValid: card.dateValid,
        flag: card.flag,
        preference: card.preference,
      })),
    }));

    return clients;
  } catch (err) {
    handleError(err);
    throw err;
  }
};

export const createClients = async (client: Omit<IClient, 'id'>) => {
  try {
    const response = await api.put<IClient>('/client/create', client);

    if (response.status !== 200 || !response.data) {
      handleError(response.status);
      return null;
    }

    return response.data;
  } catch (err) {
    handleError(err);
    throw err;
  }
};

// Hook para criar cliente usando useMutation
export const useCreateClient = () => {
  return useMutation({
    mutationFn: (variables: Omit<IClient, 'id'>) => createClients(variables),
    onError: (error) => {
      handleError(error);
    },
  });
};

//Atualizar clientes
export const updateClients = async (client: Partial<IClient>) => {
  try {
    const { data, status } = await api.put<IClient>('client/update', client);

    if (status !== 200 || !data) {
      handleError(status);
      return null;
    }

    return data;
  } catch (err) {
    handleError(err);
  }
};
