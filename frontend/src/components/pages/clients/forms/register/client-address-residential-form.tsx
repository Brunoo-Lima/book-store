import { IClient } from '@/@types/client';
import { IError } from '@/@types/error';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { getCep } from '@/services/cep';
import { IAddressFormSchema } from '@/validations/address-schema';
import { IClientFormSchema } from '@/validations/register-client-schema';
import { FocusEvent } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';

interface IClientAddressResidentialFormProps {
  value: IAddressFormSchema | null;
  onChange: (value: IAddressFormSchema) => void;
  index: number;
  error?: IError<IAddressFormSchema>;
}

export default function ClientAddressResidentialForm({
  index,
  onChange,
  error,
  value,
}: IClientAddressResidentialFormProps) {
  const {
    setValue,
    register,
    formState: { errors },
  } = useFormContext<IClientFormSchema>();

  const handleAddCep = async (e: FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value.replace(/\D/g, '');

    try {
      const data = await getCep(cep);

      // setValue('residentialAddress.city', data.logradouro);
      // setValue('residentialAddress.neighborhood', data.bairro);
      // setValue('residentialAddress.publicPlace', data.complemento);
      // setValue('residentialAddress.city', data.localidade);
      // setValue('residentialAddress.state', data.uf);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (name: keyof IAddressFormSchema, curValue: string) => {
    if (value) {
      onChange({ ...value, [name]: curValue });
    } else {
      onChange({
        ...{
          cep: '',
          city: '',
          neighborhood: '',
          publicPlace: '',
          state: '',
          number: '',
          streetName: '',
          nameAddress: '',
          compostName: '',
          typeResidence: 'HOME',
          country: '',
          change: false,
          delivery: false,
        },
        [name]: curValue,
      });
    }
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="my-2">
        <h3 className="text-xl font-semibold">Endereço</h3>
      </div>

      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          type="text"
          label="País"
          placeholder="Digite o nome"
          value={value?.compostName}
          onChange={(e) => handleChange('compostName', e.target.value)}
          error={errors?.addresses?.[index]?.compostName}
        />

        <Input
          type="text"
          label="País"
          placeholder="Digite o tipo de residência"
          value={value?.typeResidence}
          onChange={(e) => handleChange('typeResidence', e.target.value)}
          error={errors?.addresses?.[index]?.typeResidence}
        />

        <Input
          type="text"
          label="CEP"
          placeholder="00000-000"
          value={value?.cep}
          onChange={(e) => handleChange('cep', e.target.value)}
          error={errors?.addresses?.[index]?.cep}
        />

        <Input
          type="text"
          label="Rua"
          placeholder="Digite o nome da rua"
          value={value?.streetName}
          onChange={(e) => handleChange('streetName', e.target.value)}
          error={errors?.addresses?.[index]?.streetName} //
        />

        <Input
          type="text"
          label="Logradouro"
          placeholder="Digite o logradouro"
          value={value?.publicPlace}
          onChange={(e) => handleChange('publicPlace', e.target.value)}
          error={errors?.addresses?.[index]?.publicPlace}
        />

        <Input
          type="number"
          label="Número"
          placeholder="Digite o número"
          value={value?.number}
          onChange={(e) => handleChange('number', e.target.value)}
          error={errors?.addresses?.[index]?.number}
        />
      </div>

      <Input
        type="text"
        label="Bairro"
        placeholder="Digite o nome do bairro"
        value={value?.neighborhood}
        onChange={(e) => handleChange('neighborhood', e.target.value)}
        error={errors?.addresses?.[index]?.neighborhood}
      />

      <div className="grid md:grid-cols-2 md:gap-6">
        <Input
          type="text"
          label="Estado"
          placeholder="Digite o estado"
          value={value?.state}
          onChange={(e) => handleChange('state', e.target.value)}
          error={errors?.addresses?.[index]?.state}
        />
        <Input
          type="text"
          label="País"
          placeholder="Digite o país"
          value={value?.country}
          onChange={(e) => handleChange('country', e.target.value)}
          error={errors?.addresses?.[index]?.country}
        />

        <Input
          type="text"
          label="País"
          placeholder="Digite o cidade"
          value={value?.city}
          onChange={(e) => handleChange('city', e.target.value)}
          error={errors?.addresses?.[index]?.city}
        />

        <div>
          <label htmlFor="">entrega</label>
          <input
            type="checkbox"
            value={value?.delivery ? 'true' : 'false'}
            onChange={(e) => handleChange('delivery', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="">Cobrança</label>
          <input
            type="checkbox"
            value={value?.change ? 'true' : 'false'}
            onChange={(e) => handleChange('change', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
