'use client';

import { IClient } from '@/@types/client';
import { findClients } from '@/services/clients';
import { EyeIcon, UserRoundPenIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ModalAlterClientForm } from './forms/alter/modal';
import handleError from '@/utilities/handle-toast';

interface ITableProps {
  clients: IClient[];
  fetchClients: () => Promise<void>;
}

export default function Table({ clients, fetchClients }: ITableProps) {
  const router = useRouter();
  const [data, setData] = useState<IClient | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleAlterClient = (client: IClient) => {
    setData(client);
    setIsOpenModal(true);
  };

  const handleOpenInfoClient = async (client: Partial<IClient>) => {
    try {
      const clientData = await findClients();

      client = clientData.find((item) => item.id === client.id) as IClient;

      if (clientData) {
        router.push(`/clientes/informacoes/${client.id as string}`);
      } else {
        handleError('Cliente não encontrado');
      }
    } catch (err) {
      handleError('Erro ao buscar dados do cliente:');
    }
  };

  return (
    <>
      {isOpenModal && (
        <div className="fixed inset-0 bg-[rgba(18,18,18,0.2)] z-10">
          <ModalAlterClientForm
            client={data}
            onClose={() => setIsOpenModal(false)}
            fetchClients={fetchClients}
          />
        </div>
      )}

      <table className="w-full border-collapse">
        <thead className="text-center border-b-[1px] p-2">
          <tr>
            <th>Id</th>
            <th>Nome</th>
            <th>Status</th>
            <th>Editar</th>
            <th>Visualizar</th>
          </tr>
        </thead>

        <tbody>
          {clients &&
            clients.map((client) => (
              <tr key={client.id} className="text-center border-b-[1px]">
                <td className="p-2 w-1/4 text-ellipsis overflow-hidden whitespace-nowrap">
                  {client.id}
                </td>
                <td className="p-2">{client.name}</td>
                <td className="p-2 flex items-center justify-center">
                  <p
                    className={`w-20 p-1 rounded-md font-semibold uppercase ${
                      client.statusClient?.toLowerCase() === 'activate'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {client.statusClient?.toLowerCase() === 'activate'
                      ? 'Ativo'
                      : 'Inativo'}
                  </p>
                </td>
                <td className="p-2">
                  <button onClick={() => handleAlterClient(client)}>
                    <UserRoundPenIcon size={24} />
                  </button>
                </td>
                <td className="p-2">
                  <button onClick={() => handleOpenInfoClient(client)}>
                    <EyeIcon size={24} />
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
