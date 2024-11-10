'use client';

import { IClient } from '@/@types/client';
import { findClients } from '@/services/clients';
import { formatDateTimeToBr } from '@/utilities/formattedDate';
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

    fetchClient();
  }, [id]);

  if (!clientData) return;

  const addresses =
    clientData.addresses.length > 0 &&
    clientData.addresses.map((address) => {
      return (
        <div className="border-2 border-gray-500 p-2 rounded-md w-[500px] bg-zinc-900">
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

  const phones =
    clientData.phones.length > 0 &&
    clientData.phones.map((phone) => {
      return (
        <div>
          <p>
            <span className="font-bold"> Telefone:</span> {phone.ddd}{' '}
            {phone.number} - {phone.typePhone}
          </p>
        </div>
      );
    });

  const creditCards =
    clientData.creditCard.length > 0 &&
    clientData.creditCard.map((credit) => {
      return (
        <div className="border-2 border-gray-500 p-2 rounded-md w-[500px] bg-zinc-900">
          <p>
            <span className="font-bold">Bandeira:</span> {credit.flag}
          </p>
          <p>
            <span className="font-bold">Nome impresso:</span>{' '}
            {credit.namePrinted}
          </p>
          <p>
            <span className="font-bold">Número:</span> {credit.number}
          </p>
          <p>
            <span className="font-bold">CVV:</span> {credit.cvv}
          </p>
          <p>
            <span className="font-bold">Data de validade:</span>{' '}
            {credit.dateValid}
          </p>
          <p>
            <span className="font-bold">Preferência:</span>{' '}
            {credit.preference ? 'Sim' : 'Não'}
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
          {formatDateTimeToBr(clientData.dateOfBirth as string)}
        </p>

        <p>
          <span className="font-bold">E-mail:</span> {clientData.email}
        </p>

        <p>
          <span className="font-bold">Nível Perfil de compra:</span>{' '}
          {clientData.profilePurchase}
        </p>

        <p>
          <span className="font-bold">Status:</span>{' '}
          {clientData.status === 'Activate' ? 'Ativo' : 'Inativo'}
        </p>

        <p>
          <span className="font-bold">Ranking:</span> {clientData.ranking}
        </p>

        <p>
          <span className="font-bold">Score:</span> {clientData.score}
        </p>

        <p>
          <span className="font-bold">Vendas:</span>{' '}
          {clientData.sales.length || 0}
        </p>

        <p>
          <span className="font-bold">Criado em:</span>{' '}
          {formatDateTimeToBr(clientData.created_at as string, true)}
        </p>

        <p>
          <span className="font-bold">
            Cartões: {clientData.creditCard.length || 0}
          </span>
        </p>

        <p>{creditCards}</p>

        <p>
          <span className="font-bold">
            Endereço(s): {clientData.addresses.length || 0}
          </span>
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
