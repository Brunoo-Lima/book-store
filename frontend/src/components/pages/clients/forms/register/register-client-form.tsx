'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import {
  useFieldArray,
  useForm,
  SubmitHandler,
  Controller,
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
import { createClients, useCreateClient } from '@/services/clients';
import { selectFlagCrediCard } from '@/mocks/select';
import SelectForm from '@/components/ui/select';
import handleError, { notifySuccess } from '@/utilities/handle-toast';
import { FocusEvent } from 'react';
import { getCep } from '@/services/cep';

export default function RegisterClientForm() {
  const {
    register,
    reset,
    handleSubmit,
    control,
    watch,
    setValue,
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
    name: 'creditCard',
  });

  const clearFormFields = () => {
    reset();
  };

  const handleAddCep = async (
    e: FocusEvent<HTMLInputElement>,
    index: number
  ) => {
    const cep = e.target.value.replace(/\D/g, '');

    try {
      const data = await getCep(cep);

      if (data) {
        setValue(`addresses.${index}.cep`, data?.cep);
        setValue(`addresses.${index}.state`, data?.estado);
        setValue(`addresses.${index}.neighborhood`, data?.bairro);
        setValue(`addresses.${index}.publicPlace`, data?.logradouro);
        setValue(`addresses.${index}.streetName`, data?.logradouro);
        setValue(`addresses.${index}.city`, data?.localidade);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<IClientFormSchema> = async (
    data: IClientFormSchema
  ) => {
    try {
      const clientData: Omit<IClient, 'id'> = {
        ...data,
        phones: data.phones || [],
        addresses: data.addresses,
        creditCard: data.creditCard || [],
      };
      const response = await createClients(clientData);

      console.log('response da criação', response);

      if (response) {
        router.push('/clientes');
        notifySuccess('Cliente criado com sucesso');
      } else {
        handleError('Erro ao criar cliente');
      }
    } catch (err) {
      handleError('Erro ao submeter o formulário');
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

      <div className="space-y-4">
        <Input
          type="email"
          label="E-mail"
          placeholder="Digite seu email"
          {...register('email')}
          error={errors?.email}
        />

        <div className="grid grid-cols-2 gap-3 items-center">
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
        </div>

        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="flex flex-col">
            <p className="block text-sm font-medium text-white">Gênero</p>
            <Radio label="Masculino" value="MEN" {...register('gender')} />
            <Radio label="Feminino" value="WOMAN" {...register('gender')} />
            {errors.gender && (
              <span className="text-red-600 text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>

          <Input
            type="text"
            label="Nível de compra"
            placeholder="Digite o nível de compra"
            {...register('profilePurchase')}
            error={errors?.profilePurchase}
          />
        </div>
      </div>

      {/* Telefones */}
      <div className="flex flex-col space-y-2 ">
        <p className="text-lg font-semibold">Telefones</p>
        {phonesFieldArray.fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-[100px_1fr_1fr] items-center gap-2"
          >
            <Input
              type="text"
              label="DDD"
              placeholder="(00)"
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

            <div className="flex gap-x-2">
              <Radio
                label="Fixo"
                value="FIXED"
                {...register(`phones.${index}.typePhone`)}
              />
              <Radio
                label="Celular"
                value="MOBILE"
                {...register(`phones.${index}.typePhone`)}
              />
            </div>
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
              label="Cep"
              type="text"
              placeholder="Digite o cep"
              {...register(`addresses.${index}.cep`)}
              error={errors?.addresses?.[index]?.cep}
              onBlur={(e) => handleAddCep(e, index)}
            />

            <div className="grid grid-cols-[1fr_200px_1fr] gap-2 items-center">
              <Input
                label="Rua"
                type="text"
                placeholder="Digite o nome da rua"
                {...register(`addresses.${index}.streetName`)}
                error={errors?.addresses?.[index]?.streetName}
              />

              <Input
                label="Número do Endereço"
                type="text"
                placeholder="Digite o número"
                {...register(`addresses.${index}.number`)}
                error={errors?.addresses?.[index]?.number}
              />

              <Input
                type="text"
                label="Tipo de Residência"
                placeholder="Digite o tipo de residência"
                {...register(`addresses.${index}.typeResidence`)}
                error={errors?.addresses?.[index]?.typeResidence}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
              <Input
                type="text"
                label="Nome do endereço"
                placeholder="Digite o nome do endereço"
                {...register(`addresses.${index}.nameAddress`)}
                error={errors?.addresses?.[index]?.nameAddress}
              />

              <Input
                type="text"
                label="Nome composto"
                placeholder="Digite nome composto"
                {...register(`addresses.${index}.compostName`)}
                error={errors?.addresses?.[index]?.compostName}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 items-center">
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
            </div>

            <div className="grid grid-cols-3 gap-3 items-center">
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
            </div>

            <div className="flex gap-x-2">
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

            <Controller
              name={`creditCard.${index}.flag`}
              control={control}
              render={({ field }) => (
                <SelectForm
                  label="Bandeira"
                  options={selectFlagCrediCard}
                  value={
                    selectFlagCrediCard.find(
                      (option) => option.value === field.value
                    ) || null
                  }
                  onChange={(option) => field.onChange(option?.value || null)}
                  error={errors?.creditCard?.[index]?.flag}
                />
              )}
            />

            <Input
              label="Número do Cartão"
              type="text"
              placeholder="0000 0000 0000 0000"
              {...register(`creditCard.${index}.number`)}
              error={errors?.creditCard?.[index]?.number}
            />
            <Input
              label="Nome Impresso"
              type="text"
              placeholder="Nome no cartão"
              {...register(`creditCard.${index}.namePrinted`)}
              error={errors?.creditCard?.[index]?.namePrinted}
            />

            <div className="grid grid-cols-2 gap-x-2 items-center">
              <Input
                label="Validade"
                placeholder="MM/AA"
                type="text"
                {...register(`creditCard.${index}.dateValid`)}
                error={errors?.creditCard?.[index]?.dateValid}
              />
              <Input
                label="CVV"
                type="text"
                placeholder="Código de segurança"
                {...register(`creditCard.${index}.cvv`)}
                error={errors?.creditCard?.[index]?.cvv}
              />
            </div>

            <div>
              <label htmlFor="">Preferencial</label>
              <input
                type="checkbox"
                {...register(`creditCard.${index}.preference`)}
              />
            </div>
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
