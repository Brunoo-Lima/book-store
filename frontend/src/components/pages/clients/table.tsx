'use client';

import { IClient } from '@/@types/client';
import { findClients } from '@/services/clients';
import { EyeIcon, UserRoundPenIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Modal } from './forms/alter/modal';

interface ITableProps {
  clients: IClient[];
}

export default function Table({ clients }: ITableProps) {
  const router = useRouter();
  const [data, setData] = useState<IClient | null>(null);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleAlterClient = (client: IClient) => {
    setData(client); // Define o cliente que você quer alterar
    setIsOpenModal(true);

    console.log('cliente dados', client);
  };

  const handleOpenInfoClient = async (client: IClient) => {
    try {
      const clientData = await findClients(client);

      if (clientData) {
        router.push(`/clientes/informacoes/${client.id as string}`);
      } else {
        console.error('Cliente não encontrado');
      }
    } catch (err) {
      console.error('Erro ao buscar dados do cliente:', err);
    }
  };

  return (
    <>
      {isOpenModal && (
        <div className="fixed inset-0 bg-[rgba(18,18,18,0.2)] z-10">
          <Modal client={data} onClose={() => setIsOpenModal(false)} />
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
                      client.status === 'Activate'
                        ? 'bg-green-500'
                        : 'bg-red-500'
                    }`}
                  >
                    {client.status === 'Activate' ? 'Ativo' : 'Inativo'}
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
