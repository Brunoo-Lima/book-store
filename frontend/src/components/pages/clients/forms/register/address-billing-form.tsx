import { IAddressBilling } from '@/@types/client';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { getCep } from '@/services/cep';
import { IAddressFormSchema } from '@/validations/address-schema';
import { FocusEvent } from 'react';
import { useFormContext } from 'react-hook-form';

interface IAddressBillingProps {
  addressBilling: IAddressBilling[];
  setAddressBilling: React.Dispatch<React.SetStateAction<IAddressBilling[]>>;
}

export default function AddressBillingForm({
  addressBilling,
  setAddressBilling,
}: IAddressBillingProps) {
  const {
    register,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useFormContext<IAddressFormSchema>();

  const handleAddAddress = () => {
    const newAddress = getValues();

    const addressBillingWithId: IAddressBilling = {
      id: Math.ceil(Math.random() * 10000),
      ...newAddress,
    };

    setAddressBilling([...addressBilling, addressBillingWithId]);
  };

  const handleAddCep = async (e: FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value;

    try {
      const data = await getCep(cep);

      setValue('street', data.logradouro);
      setValue('neighborhood', data.bairro);
      setValue('city', data.localidade);
      setValue('state', data.uf);
      setValue('publicPlace', data.complemento);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4 my-2">
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
        color="success"
        size="xs"
        onClick={handleAddAddress}
      >
        Adicionar
      </Button>
    </div>
  );
}
