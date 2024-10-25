'use client';

import { IClient } from '@/@types/client';
import { clientsList } from '@/mocks/clientsList';
import { findClients } from '@/services/clients';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InfoClient() {
  const { id } = useParams();
  const [clientData, setClientData] = useState<IClient>();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const client = await findClients(clientData);
        const clientFind = client.find((item) => item.id === id);
        setClientData(clientFind);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    // if (client) {
    //   setClientData(client);
    // }

    fetchClient();
  }, [id]);

  if (!clientData) return;

  const addresses = clientData.addresses.map((address) => {
    return (
      <div className="border-2 border-blue-500 p-2 rounded-md">
        <p>
          <span className="font-bold">Identificação do endereço:</span>{' '}
          {address.nameAddress}
        </p>
        <p>
          <span className="font-bold">Bairro:</span> {address.neighborhood}
        </p>
        <p>
          <span className="font-bold">Rua:</span> {address.streetName}
        </p>
        <p>
          <span className="font-bold">Logradouro:</span> {address.publicPlace}
        </p>
        <p>
          <span className="font-bold">Número:</span> {address.number}
        </p>
        <p>
          <span className="font-bold">CEP:</span> {address.cep}
        </p>
        <p>
          <span className="font-bold">Cidade:</span> {address.city}
        </p>
        <p>
          <span className="font-bold">Estado:</span> {address.state}
        </p>
        <p>
          <span className="font-bold">País:</span> {address.country}
        </p>
        <p>
          <span className="font-bold">Entrega:</span>{' '}
          {address.delivery ? 'Sim' : 'Não'}
        </p>
        <p>
          <span className="font-bold">Cobrança:</span>{' '}
          {address.change ? 'Sim' : 'Não'}
        </p>
      </div>
    );
  });

  const phones = clientData.phones.map((phone) => {
    return (
      <div>
        <p>
          <span className="font-bold"> Telefone:</span> {phone.ddd}{' '}
          {phone.number} - {phone.typePhone}
        </p>
      </div>
    );
  });

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-y-2">
        <p>
          <span className="font-bold">Nome:</span> {clientData.name}
        </p>
        <p>
          <span className="font-bold">CPF:</span> {clientData.cpf}
        </p>

        <p>{phones}</p>

        <p>
          <span className="font-bold"> Gênero:</span>{' '}
          {clientData.gender === 'MEN' ? 'Masculino' : 'Feminino'}
        </p>

        <p>
          <span className="font-bold">Data de nascimento:</span>{' '}
          {clientData.dateOfBirth}
        </p>

        <p>
          <span className="font-bold">E-mail:</span> {clientData.email}
        </p>

        <p>
          <span className="font-bold">Nível Perfil de compra:</span>{' '}
          {clientData.profilePurchase}
        </p>

        <p>
          <span className="font-bold">Endereço(s):</span>
        </p>
        <p>{addresses}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Log de alteração de dados</h2>

        <div className="flex flex-col gap-y-2">
          {clientData.log?.map((log) => (
            <div className="text-sm bg-zinc-800 border-[1px] border-gray-400 rounded-md mt-2 p-2  gap-y-2">
              <p>
                <span className="font-bold">Ação:</span>{' '}
                {log.action === 'Update' ? 'Atualização' : 'Criação'}
              </p>
              <p>
                <span className="font-bold">Id do usuário responsável:</span>{' '}
                {log.user}
              </p>
              <p>
                <span className="font-bold">Data da criação:</span>{' '}
                {log.created}
              </p>
              <p>
                <span className="font-bold">Data da alteração:</span>{' '}
                {log.updated}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
