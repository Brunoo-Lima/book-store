import handleError from '@/utilities/handle-toast';
import api from './api';
import { Address, CreditCard, IClient, Phone } from '@/@types/client';
import { IClientList } from '@/@types/list-table-client';
import { useMutation, useQuery } from '@tanstack/react-query';

export const findClients = async (filters: Partial<IClient> = {}) => {
  try {
    const { data, status } = await api.post<IClientList>(
      'client/find',
      filters
    );

    console.log('findClients', data);

    if (status !== 200 || !data) {
      handleError(status);
    }

    // Mapeando a resposta da API para o formato da interface IClient
    const clients: IClient[] = data.clients.map((client) => ({
      id: client.cli_id,
      phones: client.cli_phone.map((phone) => ({
        id: phone.pho_id,
        ddd: phone.pho_ddd,
        number: phone.pho_number,
        typePhone: phone.pho_type_phone,
        numberCombine: phone.pho_numberCombine,
      })),
      profilePurchase: client.cli_profilePurchase,
      name: client.cli_name,
      dateOfBirth: client.cli_dateOfBirth,
      email: client.cli_email,
      cpf: client.cli_cpf,
      gender: client.cli_gender,
      password: client.cli_password,
      confirmPassword: client.cli_password,
      statusClient: client.cli_status,
      score: client.cli_score,
      ranking: client.cli_ranking,
      created_at: client.created_at,
      log: client.cli_log.map((log) => ({
        created: log.created_at,
        action: log.log_action,
        user: log.fk_log_use_id,
        updated: log.updated_at,
      })),
      addresses:
        client.cli_address.map((address) => ({
          id: address.add_id,
          streetName: address.add_streetName,
          publicPlace: address.add_publicPlace,
          nameAddress: address.add_name,
          number: address.add_number,
          cep: address.add_cep,
          neighborhood: address.add_neighborhood,
          city: address.add_city,
          state: address.add_state,
          compostName: address.add_compostName,
          typeResidence: address.add_typeResidence,
          clientID: address.fk_add_cli_id,
          change: address.add_isBilling,
          delivery: address.add_isDelivery,
        })) || [],
      creditCard:
        client.cli_creditCards &&
        client.cli_creditCards.map((card) => ({
          id: card.cre_id,
          namePrinted: card.cre_name,
          number: card.cre_number_cart,
          cvv: card.cre_cvv,
          dateValid: card.cre_dateMaturity,
          flag: card.cre_flag,
          preference: card.cre_preference,
        })),
      sales: client.cli_sales?.map((sale) => ({
        id: sale.sal_id,
        date_sale: sale.sal_date_sale,
        date_update: sale.sal_date_update,
        status: sale.sal_status,
      })),
    }));

    return clients;
  } catch (err) {
    handleError(err);
    throw err;
  }
};

export const useFindClients = (filters: Partial<IClient> = {}) => {
  return useQuery({
    queryKey: ['clients', filters],
    queryFn: () => findClients(filters),
  });
};

type APIResponse = IClient | { error: string };
export const createClients = async (
  client: Omit<IClient, 'id'>
): Promise<APIResponse> => {
  try {
    const { data, status } = await api.put('client/create', client);

    if (status !== 200 || !data) {
      return { error: 'Erro na criação do cliente.' };
    }

    return data;
  } catch (err: any) {
    return { error: err.message || 'Erro desconhecido ao criar cliente.' };
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
export const updateClients = async (
  client: Partial<IClient> & {
    addresses?: Array<Partial<Address>>;
    phones?: Array<Partial<Phone>>;
    creditCards?: Array<Partial<CreditCard>>;
  },
  clientId: string
): Promise<IClient | null> => {
  try {
    // Separar dados genéricos e dados de arrays
    const { addresses, phones, creditCards, ...generalClientData } = client;

    // Remove campos nulos ou indefinidos do cliente geral
    const updatedData = Object.fromEntries(
      Object.entries(generalClientData).filter(
        ([_, value]) => value !== undefined && value !== null
      )
    );

    // Define payload inicial
    const payload: any = { id: clientId, ...updatedData };

    // Adiciona dados de arrays ao payload, se fornecidos
    if (addresses) payload.addresses = addresses;
    if (phones) payload.phones = phones;
    if (creditCards) payload.creditCards = creditCards;

    console.log('Payload para atualização:', payload);

    // Envia os dados filtrados para a API
    const { data, status } = await api.put<IClient>('client/update', payload);

    if (status !== 200 || !data) {
      handleError(status);
      return null;
    }

    return data;
  } catch (err) {
    handleError(err);
    return null;
  }
};
