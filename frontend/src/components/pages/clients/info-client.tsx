'use client';

import { IClient } from '@/@types/client';
import { clientsList } from '@/mocks/clientsList';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function InfoClient() {
  const { id } = useParams();
  const [clientData, setClientData] = useState<IClient>();

  useEffect(() => {
    const client = clientsList.find((item) => item.id === Number(id));
    if (client) {
      setClientData(client);
    }
  }, [id]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-y-2">
        <p>Nome: {clientData?.name}</p>
        <p>CPF: {clientData?.cpf}</p>
        <p>
          {`${
            clientData?.typePhone === 'Fixo'
              ? 'Telefone'
              : clientData?.typePhone
          }`}
          : {clientData?.phone}
        </p>

        <p>Gênero: {clientData?.gender}</p>

        <p>Data de nascimento: {clientData?.dateOfBirth}</p>

        <p>E-mail: {clientData?.email}</p>
        <p>Bairro: {clientData?.address.neighborhood}</p>
        <p>Rua: {clientData?.address.street}</p>
        <p>Logradouro: {clientData?.address.publicPlace}</p>
        <p>Número: {clientData?.address.number}</p>
        <p>CEP: {clientData?.address.zipCode}</p>
        <p>Cidade: {clientData?.address.city}</p>
        <p>Estado: {clientData?.address.state}</p>
        <p>País: {clientData?.address.country}</p>
        <p>Observação: {clientData?.address.observation}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold">Log de alteração de dados</h2>

        <div className="bg-zinc-800 border-[1px] border-gray-400 rounded-md mt-2 p-2">
          <p className="text-sm">
            Informações quando houver alterações de dados deverão aparecer aqui,
            EX: user responsável, data e hora da alteração
          </p>
        </div>
      </div>
    </div>
  );
}
