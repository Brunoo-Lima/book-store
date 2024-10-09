import { IAddressDelivery } from '@/@types/client';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { clientsList } from '@/mocks/clientsList';
import { getCep } from '@/services/cep';
import {
  IAddressDeliveryFormSchema,
  IIAddressDeliveryFormSchema,
} from '@/validations/address-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'next/navigation';
import React, { FocusEvent, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface IAddressDeliveryProps {
  addressDelivery: IAddressDelivery[];
  setAddressDelivery: React.Dispatch<React.SetStateAction<IAddressDelivery[]>>;
}

export default function AlterAddressDeliveryForm({
  addressDelivery,
  setAddressDelivery,
}: IAddressDeliveryProps) {
  const {
    register,
    formState: { errors },
    setValue,
    reset,
    getValues,
  } = useForm<IIAddressDeliveryFormSchema>({
    resolver: yupResolver(IAddressDeliveryFormSchema),
  });

  const { id } = useParams();

  const handleAddAddress = () => {
    const newAddress = getValues();

    const addressDeliveryWithId: IAddressDelivery = {
      id: Math.ceil(Math.random() * 10000),
      ...newAddress,
    };

    setAddressDelivery([...addressDelivery, addressDeliveryWithId]);
    reset();
  };

  const handleAddCep = async (e: FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');

    try {
      const data = await getCep(cep);

      setValue('neighborhood', data.bairro);
      setValue('street', data.logradouro);
      setValue('publicPlace', data.complemento);
      setValue('state', data.uf);
      setValue('city', data.localidade);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const client = clientsList.find((client) => client.id === Number(id));

    if (client) {
      client.addressDelivery.forEach((address) => {
        if (address) {
          setValue('name', address.name);
          setValue('zipCode', address.zipCode);
          setValue('number', address.number);
          setValue('neighborhood', address.neighborhood);
          setValue('street', address.street);
          setValue('publicPlace', address.publicPlace);
          setValue('city', address.city);
          setValue('state', address.state);
        }
      });
    }
  }, [id, setValue]);

  return (
    <div className="space-y-4 my-2">
      <Input
        type="text"
        label="Nome do Endereço"
        placeholder="Nome curto para identificar o endereço"
        {...register('name')}
        error={errors.name}
      />

      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          type="text"
          label="CEP"
          placeholder="00000-000"
          {...register('zipCode', {
            onBlur: handleAddCep,
          })}
          error={errors.zipCode}
        />
        <Input
          type="text"
          label="Cidade"
          placeholder="Digite a cidade"
          {...register('city')}
          error={errors.city}
        />
      </div>
      <div className="space-y-4">
        <Input
          type="text"
          label="Bairro"
          placeholder="Digite o nome do bairro"
          {...register('neighborhood')}
          error={errors.neighborhood}
        />
        <Input
          type="text"
          label="Rua"
          placeholder="Digite o nome da rua"
          {...register('street')}
          error={errors.street}
        />
        <div className="grid md:grid-cols-2 md:gap-6">
          <Input
            type="text"
            label="Logradouro"
            placeholder="Digite o logradouro"
            {...register('publicPlace')}
            error={errors.publicPlace}
          />
          <Input
            type="number"
            label="Número"
            placeholder="Digite o número"
            {...register('number')}
            error={errors.number}
          />
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <Input
            type="text"
            label="Estado"
            placeholder="Digite o estado"
            {...register('state')}
            error={errors.state}
          />
          <Input
            type="text"
            label="País"
            placeholder="Digite o país"
            {...register('country')}
            error={errors.country}
          />
        </div>
        <Textarea
          label="Observações"
          placeholder="Digite sua observação (opcional)"
          {...register('observation')}
          error={errors.observation}
        />
      </div>
      <Button
        type="button"
        size="xs"
        color="success"
        onClick={handleAddAddress}
      >
        Adicionar
      </Button>
    </div>
  );
}
