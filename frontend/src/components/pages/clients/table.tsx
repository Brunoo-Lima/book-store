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
    setIsOpenModal(true); // Abre o modal
  };

  const handleOpenInfoClient = (id: string) => {
    router.push(`/clientes/informacoes/${id}`);
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
            {/* <th>Telefone</th> */}
            {/* <th>Ranking</th> */}
            {/* <th>Status</th> */}
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
                {/* <td className="p-2">
              {client.phones.map((phone) => phone.ddd + phone.number)}
            </td> */}
                {/* <td className="p-2">#{client.ranking}</td> */}

                {/* <td className="p-2">
                <p
                  className="rounded-sm w-[90%] mx-auto p-1"
                   style={{
                   background: `${client.status === 'Ativo' ? 'green' : 'red'} `,
                  }}
                >
                  { {client.status === 'Ativo' ? 'Ativo' : 'Inativo'} }
                </p>
              </td> */}
                <td className="p-2">
                  <button onClick={() => handleAlterClient(client)}>
                    <UserRoundPenIcon size={24} />
                  </button>
                </td>
                <td className="p-2">
                  <button>
                    <Link href={`/clientes/informacoes/${client.id}`}>
                      <EyeIcon size={24} />
                    </Link>
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}
