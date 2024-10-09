import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { clientsList } from '@/mocks/clientsList';
import { getCep } from '@/services/cep';
import { IRegisterClientForm } from '@/validations/register-client-schema';
import { useParams } from 'next/navigation';
import { FocusEvent, useEffect } from 'react';
import { FieldErrors, useFormContext, UseFormRegister } from 'react-hook-form';

interface IAddressResidential {
  register: UseFormRegister<IRegisterClientForm>;
  errors: FieldErrors<IRegisterClientForm>;
}

export default function AlterClientAddressResidentialForm({
  errors,
  register,
}: IAddressResidential) {
  const { setValue } = useFormContext<IRegisterClientForm>();
  const { id } = useParams();

  const handleAddCep = async (e: FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');

    try {
      const data = await getCep(cep);

      setValue('residentialAddress.street', data.logradouro);
      setValue('residentialAddress.neighborhood', data.bairro);
      setValue('residentialAddress.publicPlace', data.complemento);
      setValue('residentialAddress.city', data.localidade);
      setValue('residentialAddress.state', data.uf);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const client = clientsList.find((client) => client.id === Number(id));

    if (client) {
      setValue('residentialAddress.neighborhood', client.address.neighborhood);
      setValue('residentialAddress.street', client.address.street);
      setValue('residentialAddress.publicPlace', client.address.publicPlace);
      setValue('residentialAddress.number', client.address.number.toString());
      setValue('residentialAddress.zipCode', client.address.zipCode);
      setValue('residentialAddress.city', client.address.city);
      setValue('residentialAddress.state', client.address.state);
      setValue('residentialAddress.country', client.address.country);
      setValue('residentialAddress.observation', client.address.observation);
    }
  }, [id, setValue]);

  return (
    <div className="space-y-4 pt-4">
      <div className="my-2">
        <h3 className="text-xl font-semibold">Endereço</h3>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          type="string"
          label="CEP"
          placeholder="00000-000"
          {...register('residentialAddress.zipCode', {
            onBlur: handleAddCep,
          })}
          error={errors?.residentialAddress?.zipCode}
        />
        <Input
          type="text"
          label="Cidade"
          placeholder="Digite a cidade"
          {...register('residentialAddress.city')}
          error={errors?.residentialAddress?.city}
        />
      </div>

      <Input
        type="text"
        label="Bairro"
        placeholder="Digite o nome do bairro"
        {...register('residentialAddress.neighborhood')}
        error={errors?.residentialAddress?.neighborhood}
      />

      <Input
        type="text"
        label="Rua"
        placeholder="Digite o nome da rua"
        {...register('residentialAddress.street')}
        error={errors?.residentialAddress?.street}
      />

      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          type="text"
          label="Logradouro"
          placeholder="Digite o logradouro"
          {...register('residentialAddress.publicPlace')}
          error={errors?.residentialAddress?.publicPlace}
        />
        <Input
          type="number"
          label="Número"
          placeholder="Digite o número"
          {...register('residentialAddress.number')}
          error={errors?.residentialAddress?.number}
        />
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          type="text"
          label="Estado"
          placeholder="Digite o estado"
          {...register('residentialAddress.state')}
          error={errors?.residentialAddress?.state}
        />
        <Input
          type="text"
          label="País"
          placeholder="Digite o país"
          {...register('residentialAddress.country')}
          error={errors?.residentialAddress?.country}
        />
      </div>

      <div>
        <Textarea
          label="Observações"
          placeholder="Digite sua observação (opcional)"
          {...register('residentialAddress.observation')}
          error={errors?.residentialAddress?.observation}
        />
      </div>
    </div>
  );
}
