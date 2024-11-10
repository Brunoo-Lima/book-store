'use client';
import { IClient } from '@/@types/client';
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
import { findClients, updateClients } from '@/services/clients';
import { selectFlagCrediCard } from '@/mocks/select';
import SelectForm from '@/components/ui/select';
import handleError, { notifySuccess } from '@/utilities/handle-toast';
import { FocusEvent, useEffect, useState } from 'react';
import { getCep } from '@/services/cep';
import { XIcon } from 'lucide-react';

interface IModalProps {
  client: IClient | null;
  onClose: () => void;
}

export const Modal = ({ client, onClose }: IModalProps) => {
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

  if (!client) {
    return;
  }

  const [editSection, setEditSection] = useState<
    'dados' | 'enderecos' | 'cartoes' | null
  >(null);

  const startEditingSection = (section: typeof editSection) => {
    setEditSection(section);
  };

  const stopEditingSection = () => {
    setEditSection(null);
  };

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

  useEffect(() => {
    if (client) {
      reset(client);
    }
  }, [client, reset]);

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

  const onSubmit: SubmitHandler<Partial<IClientFormSchema>> = async (
    data: Partial<IClient>
  ) => {
    try {
      // Verifica se há dados para atualizar
      if (!data || Object.keys(data).length === 0) {
        handleError('Nenhuma alteração encontrada para atualizar.');
        return;
      }

      // Filtra os campos que têm realmente uma alteração
      const modifiedData = Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== undefined)
      );

      const updatedClient = await updateClients(
        modifiedData,
        client.id,
        client
      );

      //A resposta foi bem-sucedida?
      if (updatedClient) {
        console.log('Cliente atualizado:', updatedClient);
        notifySuccess('Cliente atualizado com sucesso!');
        onClose();
      } else {
        handleError('Falha ao atualizar o cliente');
      }
    } catch (err) {
      console.error(err);
      handleError('Erro ao atualizar o cliente');
    }
  };

  return (
    <div className=" w-[800px] bg-gray-900 fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10 py-4 overflow-hidden">
      <XIcon
        onClick={onClose}
        className="absolute top-4 right-4 cursor-pointer"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[600px] max-h-[750px] overflow-y-auto flex flex-col justify-start m-auto gap-8 my-2 px-4 py-4"
      >
        {/* Dados pessoais */}
        <h2 className="text-lg font-semibold">Dados Pessoais</h2>

        <Input
          type="text"
          label="Id"
          value={client.id}
          placeholder=""
          readOnly
        />
        <Input
          type="text"
          label="Nome completo"
          placeholder="Digite o nome completo"
          error={errors?.name}
          {...register('name')}
          disabled={editSection !== 'dados'}
        />
        <div className="grid grid-cols-2 gap-3 items-center">
          <Input
            type="text"
            label="CPF"
            placeholder="000.000.000-00"
            {...register('cpf')}
            error={errors?.cpf}
            disabled={editSection !== 'dados'}
          />

          <Input
            type="date"
            label="Data de nascimento"
            placeholder="dd/MM/aaaa"
            {...register('dateOfBirth')}
            error={errors?.dateOfBirth}
            disabled={editSection !== 'dados'}
          />
        </div>

        <div className="space-y-4">
          <Input
            type="email"
            label="E-mail"
            placeholder="Digite seu email"
            {...register('email')}
            error={errors?.email}
            disabled={editSection !== 'dados'}
          />

          <div className="grid grid-cols-2 gap-3 items-center">
            <Input
              type="password"
              label="Senha"
              placeholder="Digite sua senha"
              {...register('password')}
              error={errors?.password}
              disabled={editSection !== 'dados'}
            />

            <Input
              type="password"
              label="Confirme sua senha"
              placeholder="Digite sua senha novamente"
              {...register('confirmPassword')}
              error={errors?.confirmPassword}
              disabled={editSection !== 'dados'}
            />
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="flex flex-col">
              <p className="block text-sm font-medium text-white">Gênero</p>
              <Radio
                label="Masculino"
                value="MALE"
                {...register('gender')}
                disabled={editSection !== 'dados'}
              />
              <Radio
                label="Feminino"
                value="FEMALE"
                {...register('gender')}
                disabled={editSection !== 'dados'}
              />
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
              disabled={editSection !== 'dados'}
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
                disabled={editSection !== 'dados'}
              />
              <Input
                type="text"
                label="Número"
                placeholder="00000-0000"
                {...register(`phones.${index}.number`)}
                error={errors?.phones?.[index]?.number}
                disabled={editSection !== 'dados'}
              />

              <div className="flex gap-x-2">
                <Radio
                  label="Fixo"
                  value="FIXO"
                  {...register(`phones.${index}.typePhone`)}
                  disabled={editSection !== 'dados'}
                />
                <Radio
                  label="Celular"
                  value="CELULAR"
                  {...register(`phones.${index}.typePhone`)}
                  disabled={editSection !== 'dados'}
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

        {editSection === 'dados' ? (
          <button type="button" onClick={stopEditingSection}>
            Salvar Dados Pessoais
          </button>
        ) : (
          <button type="button" onClick={() => startEditingSection('dados')}>
            Editar Dados Pessoais
          </button>
        )}

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
                disabled={editSection !== 'enderecos'}
              />

              <div className="grid grid-cols-[1fr_200px_1fr] gap-2 items-center">
                <Input
                  label="Rua"
                  type="text"
                  placeholder="Digite o nome da rua"
                  {...register(`addresses.${index}.streetName`)}
                  error={errors?.addresses?.[index]?.streetName}
                  disabled={editSection !== 'enderecos'}
                />

                <Input
                  label="Número"
                  type="text"
                  placeholder="Digite o número"
                  {...register(`addresses.${index}.number`)}
                  error={errors?.addresses?.[index]?.number}
                  disabled={editSection !== 'enderecos'}
                />

                <Input
                  type="text"
                  label="Tipo de Residência"
                  placeholder="Digite o tipo de residência"
                  {...register(`addresses.${index}.typeResidence`)}
                  error={errors?.addresses?.[index]?.typeResidence}
                  disabled={editSection !== 'enderecos'}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <Input
                  type="text"
                  label="Nome do endereço"
                  placeholder="Digite o nome do endereço"
                  {...register(`addresses.${index}.nameAddress`)}
                  error={errors?.addresses?.[index]?.nameAddress}
                  disabled={editSection !== 'enderecos'}
                />

                <Input
                  type="text"
                  label="Nome composto"
                  placeholder="Digite nome composto"
                  {...register(`addresses.${index}.compostName`)}
                  error={errors?.addresses?.[index]?.compostName}
                  disabled={editSection !== 'enderecos'}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-center">
                <Input
                  type="text"
                  label="Logradouro"
                  placeholder="Digite o logradouro"
                  {...register(`addresses.${index}.publicPlace`)}
                  error={errors?.addresses?.[index]?.publicPlace}
                  disabled={editSection !== 'enderecos'}
                />

                <Input
                  type="text"
                  label="Bairro"
                  placeholder="Digite o nome do bairro"
                  {...register(`addresses.${index}.neighborhood`)}
                  error={errors?.addresses?.[index]?.neighborhood}
                  disabled={editSection !== 'enderecos'}
                />
              </div>

              <div className="grid grid-cols-3 gap-3 items-center">
                <Input
                  type="text"
                  label="País"
                  placeholder="Digite o país"
                  {...register(`addresses.${index}.country`)}
                  error={errors?.addresses?.[index]?.country}
                  disabled={editSection !== 'enderecos'}
                />

                <Input
                  label="Cidade"
                  type="text"
                  placeholder="Digite a cidade"
                  {...register(`addresses.${index}.city`)}
                  error={errors?.addresses?.[index]?.city}
                  disabled={editSection !== 'enderecos'}
                />
                <Input
                  label="Estado"
                  type="text"
                  placeholder="Digite o estado"
                  {...register(`addresses.${index}.state`)}
                  error={errors?.addresses?.[index]?.state}
                  disabled={editSection !== 'enderecos'}
                />
              </div>

              <div className="flex gap-x-2">
                <div>
                  <label htmlFor="">Entrega</label>
                  <input
                    type="checkbox"
                    {...register(`addresses.${index}.delivery`)}
                    disabled={editSection !== 'enderecos'}
                  />
                </div>

                <div>
                  <label htmlFor="">Cobrança</label>
                  <input
                    type="checkbox"
                    {...register(`addresses.${index}.change`)}
                    disabled={editSection !== 'enderecos'}
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
          {editSection === 'enderecos' ? (
            <button type="button" onClick={stopEditingSection}>
              Salvar Endereços
            </button>
          ) : (
            <button
              type="button"
              onClick={() => startEditingSection('enderecos')}
            >
              Editar Endereços
            </button>
          )}
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
                    disabled={editSection !== 'cartoes'}
                  />
                )}
              />

              <Input
                label="Número do Cartão"
                type="text"
                placeholder="0000 0000 0000 0000"
                {...register(`creditCard.${index}.number`)}
                error={errors?.creditCard?.[index]?.number}
                disabled={editSection !== 'cartoes'}
              />
              <Input
                label="Nome Impresso"
                type="text"
                placeholder="Nome no cartão"
                {...register(`creditCard.${index}.namePrinted`)}
                error={errors?.creditCard?.[index]?.namePrinted}
                disabled={editSection !== 'cartoes'}
              />

              <div className="grid grid-cols-2 gap-x-2 items-center">
                <Input
                  label="Validade"
                  placeholder="MM/AA"
                  type="text"
                  {...register(`creditCard.${index}.dateValid`)}
                  error={errors?.creditCard?.[index]?.dateValid}
                  disabled={editSection !== 'cartoes'}
                />
                <Input
                  label="CVV"
                  type="text"
                  placeholder="Código de segurança"
                  {...register(`creditCard.${index}.cvv`)}
                  error={errors?.creditCard?.[index]?.cvv}
                  disabled={editSection !== 'cartoes'}
                />
              </div>

              <div>
                <label htmlFor="">Preferencial</label>
                <input
                  type="checkbox"
                  {...register(`creditCard.${index}.preference`)}
                  disabled={editSection !== 'cartoes'}
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

          {editSection === 'cartoes' ? (
            <button type="button" onClick={stopEditingSection}>
              Salvar cartões
            </button>
          ) : (
            <button
              type="button"
              onClick={() => startEditingSection('cartoes')}
            >
              Editar cartões
            </button>
          )}
        </div>

        <button type="submit" className="bg-blue-500 rounded-lg p-2">
          Salvar alteração
        </button>
        <button
          type="button"
          onClick={clearFormFields}
          className="border-emerald-50 border-[1.5px] rounded-lg p-2"
        >
          Limpar campos
        </button>
      </form>
    </div>
  );
};
