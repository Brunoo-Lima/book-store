'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  Controller,
  useFieldArray,
  useForm,
  SubmitHandler,
} from 'react-hook-form';
import Button from '@/components/ui/button';
import Radio from '@/components/ui/radio';
import Input from '@/components/ui/input';
import {
  ClientSchema,
  IClientFormSchema,
} from '@/validations/register-client-schema';
import { emptyAddress } from '@/validations/address-schema';
import { IClient } from '@/@types/client';
import { useRouter } from 'next/navigation';

//TODO: NAO TA ADICIONANDO, VERIFICAR PQ, SE È O YUP OU NAO FAZENDO ISSO

export default function RegisterClientForm() {
  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IClientFormSchema>({
    resolver: yupResolver(ClientSchema),
  });
  const router = useRouter();

  const addressesFieldArray = useFieldArray({
    control,
    name: 'addresses',
  });

  const phonesFieldArray = useFieldArray({
    control,
    name: 'phones',
  });

  const creditCardFieldArray = useFieldArray({
    control,
    name: 'creditCart',
  });

  const clearFormFields = () => {
    // reset();
  };

  console.log(addressesFieldArray, 'addressesFieldArray');
  console.log(creditCardFieldArray, 'credit');
  console.log(phonesFieldArray, 'phones');

  const onSubmit: SubmitHandler<IClientFormSchema> = async (
    data: IClientFormSchema
  ) => {
    console.log('chegando aqui antes do erro');
    try {
      console.log('Dados do cliente:', data);
      router.push('/clientes');
      // Aqui você pode adicionar a lógica de envio do formulário.
    } catch (err) {
      console.error('Erro ao submeter o formulário', err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[800px] flex flex-col justify-center gap-8 my-8"
    >
      {/* Dados pessoais */}
      <Input
        type="text"
        label="Nome completo"
        placeholder="Digite o nome completo"
        error={errors?.name}
        {...register('name')}
      />
      <div className="grid grid-cols-2 gap-3 items-center">
        <Input
          type="text"
          label="CPF"
          placeholder="000.000.000-00"
          {...register('cpf')}
          error={errors?.cpf}
        />

        <Input
          type="date"
          label="Data de nascimento"
          placeholder="dd/MM/aaaa"
          {...register('dateOfBirth')}
          error={errors?.dateOfBirth}
        />
      </div>

      <div className="flex flex-col">
        <p className="block text-sm font-medium text-white">Gênero</p>
        <Radio label="Masculino" value="MALE" {...register('gender')} />
        <Radio label="Feminino" value="FEMALE" {...register('gender')} />
        {errors.gender && (
          <span className="text-red-600 text-sm">{errors.gender.message}</span>
        )}
      </div>

      <div className="space-y-4">
        <Input
          type="email"
          label="E-mail"
          placeholder="Digite seu email"
          {...register('email')}
          error={errors?.email}
        />

        <Input
          type="password"
          label="Senha"
          placeholder="Digite sua senha"
          {...register('password')}
          error={errors?.password}
        />

        <Input
          type="password"
          label="Confirme sua senha"
          placeholder="Digite sua senha novamente"
          {...register('confirmPassword')}
          error={errors?.confirmPassword}
        />

        <Input
          type="password"
          label="Nível de compra"
          placeholder="Digite o nível de compra"
          {...register('profilePurchase')}
          error={errors?.profilePurchase}
        />
      </div>

      {/* Telefones */}
      <div className="flex flex-col space-y-2">
        <p className="text-lg font-semibold">Telefones</p>
        {phonesFieldArray.fields.map((item, index) => (
          <div key={item.id} className="flex gap-2">
            <Input
              type="text"
              label="DDD"
              placeholder="00"
              {...register(`phones.${index}.ddd`)}
              error={errors?.phones?.[index]?.ddd}
            />
            <Input
              type="text"
              label="Número"
              placeholder="00000-0000"
              {...register(`phones.${index}.number`)}
              error={errors?.phones?.[index]?.number}
            />
            <Radio
              label="Fixo"
              value="FIXO"
              {...register(`phones.${index}.typePhone`)}
            />
            <Radio
              label="Celular"
              value="CELULAR"
              {...register(`phones.${index}.typePhone`)}
            />
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            phonesFieldArray.append({
              ddd: '',
              number: '',
              typePhone: 'CELULAR',
            })
          }
        >
          Adicionar telefone
        </Button>
      </div>

      {/* Endereços */}
      <div className="flex flex-col space-y-2">
        <p className="text-lg font-semibold">Endereços</p>
        {addressesFieldArray.fields.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 border p-4 rounded-md"
          >
            <h3 className="text-lg font-medium">Endereço {index + 1}</h3>
            <Input
              label="Rua"
              type="text"
              placeholder="Digite o nome da rua"
              {...register(`addresses.${index}.streetName`)}
              error={errors?.addresses?.[index]?.streetName}
            />

            <Input
              label="Cep"
              type="text"
              placeholder="Digite o cep"
              {...register(`addresses.${index}.cep`)}
              error={errors?.addresses?.[index]?.cep}
            />
            <Input
              label="Número"
              type="text"
              placeholder="Digite o número"
              {...register(`addresses.${index}.number`)}
              error={errors?.addresses?.[index]?.number}
            />

            <Input
              type="text"
              label="Nome do endereço"
              placeholder="Digite o nome do endereço"
              {...register(`addresses.${index}.compostName`)}
              error={errors?.addresses?.[index]?.compostName}
            />

            <Input
              type="text"
              label="Tipo de Residência"
              placeholder="Digite o tipo de residência"
              {...register(`addresses.${index}.typeResidence`)}
              error={errors?.addresses?.[index]?.typeResidence}
            />

            <Input
              type="text"
              label="Logradouro"
              placeholder="Digite o logradouro"
              {...register(`addresses.${index}.publicPlace`)}
              error={errors?.addresses?.[index]?.publicPlace}
            />

            <Input
              type="text"
              label="Bairro"
              placeholder="Digite o nome do bairro"
              {...register(`addresses.${index}.neighborhood`)}
              error={errors?.addresses?.[index]?.neighborhood}
            />

            <Input
              type="text"
              label="País"
              placeholder="Digite o país"
              {...register(`addresses.${index}.country`)}
              error={errors?.addresses?.[index]?.country}
            />

            <Input
              label="Cidade"
              type="text"
              placeholder="Digite a cidade"
              {...register(`addresses.${index}.city`)}
              error={errors?.addresses?.[index]?.city}
            />
            <Input
              label="Estado"
              type="text"
              placeholder="Digite o estado"
              {...register(`addresses.${index}.state`)}
              error={errors?.addresses?.[index]?.state}
            />

            <div>
              <label htmlFor="">Entrega</label>
              <input
                type="checkbox"
                {...register(`addresses.${index}.delivery`)}
              />
            </div>

            <div>
              <label htmlFor="">Cobrança</label>
              <input
                type="checkbox"
                {...register(`addresses.${index}.change`)}
              />
            </div>
            <Button
              type="button"
              onClick={() => addressesFieldArray.remove(index)}
            >
              Remover endereço
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() => addressesFieldArray.append(emptyAddress)}
        >
          Adicionar endereço
        </Button>
      </div>

      {/* Cartões de crédito */}
      <div className="flex flex-col space-y-2">
        <p className="text-lg font-semibold">Cartões de Crédito</p>
        {creditCardFieldArray.fields.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col gap-4 border p-4 rounded-md"
          >
            <h3 className="text-lg font-medium">Cartão {index + 1}</h3>
            <Input
              label="Número do Cartão"
              type="text"
              placeholder="0000 0000 0000 0000"
              {...register(`creditCart.${index}.number`)}
              error={errors?.creditCart?.[index]?.number}
            />
            <Input
              label="Nome Impresso"
              type="text"
              placeholder="Nome no cartão"
              {...register(`creditCart.${index}.namePrinted`)}
              error={errors?.creditCart?.[index]?.namePrinted}
            />
            <Input
              label="Validade"
              placeholder="MM/AA"
              type="text"
              {...register(`creditCart.${index}.dateValid`)}
              error={errors?.creditCart?.[index]?.dateValid}
            />
            <Input
              label="CVV"
              type="text"
              placeholder="Código de segurança"
              {...register(`creditCart.${index}.cvv`)}
              error={errors?.creditCart?.[index]?.cvv}
            />
            <Button
              type="button"
              onClick={() => creditCardFieldArray.remove(index)}
            >
              Remover cartão
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={() =>
            creditCardFieldArray.append({
              number: '',
              dateValid: '',
              cvv: '',
              flag: '',
              preference: false,
              namePrinted: '',
            })
          }
        >
          Adicionar cartão de crédito
        </Button>
      </div>

      <button type="submit" className="bg-blue-500 rounded-lg p-2">
        Adicionar cliente
      </button>
      <button
        type="button"
        onClick={clearFormFields}
        className="border-emerald-50 border-[1.5px] rounded-lg p-2"
      >
        Limpar campos
      </button>
    </form>
  );
}
