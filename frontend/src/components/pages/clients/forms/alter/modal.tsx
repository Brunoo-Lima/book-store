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
import { updateClients } from '@/services/clients';
import {
  selectFlagCrediCard,
  selectProfilePurchase,
  selectTypeResidence,
} from '@/mocks/select';
import SelectForm from '@/components/ui/select';
import handleError, { notifySuccess } from '@/utilities/handle-toast';
import { FocusEvent, useEffect, useState } from 'react';
import { getCep } from '@/services/cep';
import { XIcon } from 'lucide-react';

interface IModalProps {
  client: IClient | null;
  onClose: () => void;
  fetchClients: () => void;
}

export type SectionType =
  | 'dados'
  | 'enderecos'
  | 'cartoes'
  | 'telefones'
  | null;

export const ModalAlterClientForm = ({
  client,
  onClose,
  fetchClients,
}: IModalProps) => {
  const {
    register,
    reset,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<IClientFormSchema>({
    resolver: yupResolver(ClientSchema),
  });

  if (!client) {
    return;
  }

  const [editSection, setEditSection] = useState<SectionType>(null);

  const startEditingSection = (section: typeof editSection) => {
    setEditSection(section);
  };

  const stopEditingSection = () => {
    setEditSection(null);
  };
  const fieldArrays = {
    addresses: useFieldArray({ control, name: 'addresses' }),
    phones: useFieldArray({ control, name: 'phones' }),
    creditCard: useFieldArray({ control, name: 'creditCard' }),
  };

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
      handleError(err);
    }
  };

  const handleSaveDataPersonal: SubmitHandler<
    Partial<IClientFormSchema>
  > = async (data) => {
    try {
      const personalData: Partial<IClient> = {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        dateOfBirth: data.dateOfBirth,
        statusClient: data.statusClient,
        gender: data.gender,
        profilePurchase: data.profilePurchase,
        password: data.password,
        confirmPassword: data.confirmPassword,
      };

      const filteredPersonalData = Object.fromEntries(
        Object.entries(personalData).filter(
          ([_, value]) => value !== null && value !== undefined
        )
      );

      // Se há dados a serem atualizados
      if (Object.keys(filteredPersonalData).length > 0) {
        const updatedClient = await updateClients(
          filteredPersonalData, // Enviar apenas os dados filtrados
          client.id as string
        );

        if (updatedClient) {
          notifySuccess('Dados Pessoais atualizados com sucesso!');
          await fetchClients();
          onClose();
        } else {
          handleError('Falha ao atualizar Dados Pessoais');
        }
      } else {
        handleError(
          'Nenhuma alteração encontrada para atualizar Dados Pessoais'
        );
      }
    } catch (err) {
      handleError('Erro ao atualizar Dados Pessoais');
    }
  };

  const handleSaveDataPhones: SubmitHandler<
    Partial<IClientFormSchema>
  > = async (data) => {
    try {
      const { phones } = data;

      // Lida com os telefones
      if (Array.isArray(phones)) {
        // Separar novos telefones dos existentes
        const newPhones = phones.filter((phone) => !(phone as any).id); // Sem ID = novo telefone
        const existingPhones = phones.filter((phone) => (phone as any).id); // Com ID = telefone existente

        const modifiedData: Partial<IClient> = {};

        // Adiciona telefones existentes ao payload
        if (existingPhones.length > 0) {
          modifiedData.phones = existingPhones;
        }

        // Adiciona novos telefones ao payload
        if (newPhones.length > 0) {
          modifiedData.phones = [
            ...(modifiedData.phones || []),
            ...newPhones.map((phone) => ({
              ...phone,
              numberCombine: `${phone.ddd}${phone.number}`,
              id: null,
            })),
          ];
        }

        if (Object.keys(modifiedData).length > 0) {
          const updatedClient = await updateClients(
            modifiedData,
            client.id as string
          );

          if (updatedClient) {
            notifySuccess('Dados Pessoais atualizados com sucesso!');
            await fetchClients();
            // stopEditingSection();
            onClose();
          } else {
            handleError('Falha ao atualizar Dados Pessoais');
          }
        }
      } else {
        handleError(
          'Nenhuma alteração encontrada para atualizar Dados Pessoais'
        );
      }
    } catch (err) {
      handleError('Erro ao atualizar Dados Pessoais');
    }
  };

  const handleSaveEnderecos: SubmitHandler<Partial<IClientFormSchema>> = async (
    data
  ) => {
    try {
      const { addresses } = data;

      if (Array.isArray(addresses)) {
        const newAddresses = addresses.filter(
          (address) => !(address as any).id // Sem ID = novo endereço
        );
        const existingAddresses = addresses.filter(
          (address) => (address as any).id // Com ID = endereço existente
        );

        const modifiedData: Partial<IClient> = {};

        // Adiciona endereços existentes ao payload
        if (existingAddresses.length > 0) {
          modifiedData.addresses = existingAddresses;
        }

        // Adiciona novos endereços ao payload
        if (newAddresses.length > 0) {
          modifiedData.addresses = [
            ...(modifiedData.addresses || []),
            ...newAddresses.map((address) => ({
              ...address,
              id: null,
            })),
          ];
        }

        if (Object.keys(modifiedData).length > 0) {
          const updatedClient = await updateClients(
            modifiedData,
            client.id as string
          );

          if (updatedClient) {
            notifySuccess('Endereços atualizados com sucesso!');
            await fetchClients();
            // stopEditingSection();
            onClose();
          } else {
            handleError('Falha ao atualizar Endereços');
          }
        } else {
          handleError('Nenhuma alteração encontrada para atualizar Endereços');
        }
      } else {
        handleError('Nenhum endereço foi enviado para atualização.');
      }
    } catch (err) {
      handleError('Erro ao atualizar Endereços');
    }
  };

  const handleSaveCartao: SubmitHandler<Partial<IClientFormSchema>> = async (
    data
  ) => {
    try {
      const { creditCard } = data;

      if (Array.isArray(creditCard)) {
        // Separar novos cartões dos existentes
        const newCards = creditCard.filter(
          (card) => !(card as any).id // Sem ID = novo cartão
        );
        const existingCards = creditCard.filter(
          (card) => (card as any).id // Com ID = cartão existente
        );

        const modifiedData: Partial<IClient> = {};

        // Adiciona cartões existentes ao payload
        if (existingCards.length > 0) {
          modifiedData.creditCard = existingCards;
        }

        // Adiciona novos cartões ao payload
        if (newCards.length > 0) {
          modifiedData.creditCard = [
            ...(modifiedData.creditCard || []),
            ...newCards.map((card) => ({
              ...card,
              id: null,
            })),
          ];
        }

        if (Object.keys(modifiedData).length > 0) {
          const updatedClient = await updateClients(
            modifiedData,
            client.id as string
          );

          if (updatedClient) {
            notifySuccess('Cartões de Crédito atualizados com sucesso!');
            await fetchClients();
            // stopEditingSection();
            onClose();
          } else {
            handleError('Falha ao atualizar Cartões de Crédito');
          }
        } else {
          handleError(
            'Nenhuma alteração encontrada para atualizar Cartões de Crédito'
          );
        }
      } else {
        handleError('Nenhum cartão foi enviado para atualização.');
      }
    } catch (err) {
      handleError('Erro ao atualizar Cartões de Crédito');
    }
  };

  return (
    <div className="w-[800px] bg-[#4e3a3a] fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 z-10 py-8 rounded-md border-2 border-gray-800 overflow-hidden flex flex-col ">
      <XIcon
        onClick={onClose}
        className="absolute top-4 right-4 cursor-pointer"
      />

      <form className="w-[700px] max-h-[650px] h-max overflow-y-auto flex flex-col justify-start m-auto gap-8 my-2 px-8 py-4">
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
                value="MEN"
                {...register('gender')}
                disabled={editSection !== 'dados'}
              />
              <Radio
                label="Feminino"
                value="WOMAN"
                {...register('gender')}
                disabled={editSection !== 'dados'}
              />
              {errors.gender && (
                <span className="text-red-600 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>

            <Controller
              name={'profilePurchase'}
              control={control}
              render={({ field }) => (
                <SelectForm
                  label="Nível do perfil de compra"
                  options={selectProfilePurchase}
                  value={
                    selectProfilePurchase.find(
                      (option) => option.value === field.value
                    ) || null
                  }
                  onChange={(option) => field.onChange(option?.value || null)}
                  error={errors?.profilePurchase}
                  disabled={editSection !== 'dados'}
                />
              )}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 items-center">
          <div className="flex flex-col">
            <p className="block text-sm font-medium text-white">
              Status do cliente
            </p>

            <Radio
              label="Ativo"
              value="ACTIVATE"
              {...register('statusClient')}
              disabled={editSection !== 'dados'}
            />
            <Radio
              label="Inativo"
              value="INACTIVE"
              {...register('statusClient')}
              disabled={editSection !== 'dados'}
            />
            {errors.statusClient && (
              <span className="text-red-600 text-sm">
                {errors.statusClient.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          {editSection === 'dados' ? (
            <button
              className="bg-red-500 rounded-md w-full h-8 py-4 flex items-center justify-center font-semibold transition duration-300 hover:opacity-70"
              type="button"
              onClick={stopEditingSection}
            >
              Salvar
            </button>
          ) : (
            <button
              className="bg-red-500 rounded-md w-full h-8 py-4 flex items-center justify-center font-semibold transition duration-300 hover:opacity-70"
              type="button"
              onClick={() => startEditingSection('dados')}
            >
              Editar
            </button>
          )}

          <button
            className="bg-green-500 w-full h-8 py-4 flex items-center justify-center rounded-md font-semibold transition duration-300 hover:opacity-70"
            type="button"
            onClick={handleSubmit(handleSaveDataPersonal)}
          >
            Salvar dados pessoais
          </button>
        </div>

        {/* Telefones */}
        <div className="flex flex-col space-y-2 ">
          <p className="text-lg font-semibold">Telefones</p>
          {fieldArrays.phones.fields.map((item, index) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 border p-4 rounded-md"
            >
              <h3 className="text-lg font-medium">Telefone {index + 1}</h3>
              <div className="grid grid-cols-[100px_1fr_1fr] items-center gap-2 ">
                <Input
                  type="text"
                  label="DDD"
                  placeholder="(00)"
                  {...register(`phones.${index}.ddd`)}
                  error={errors?.phones?.[index]?.ddd}
                  disabled={editSection !== 'telefones'}
                />
                <Input
                  type="text"
                  label="Número"
                  placeholder="00000-0000"
                  {...register(`phones.${index}.number`)}
                  error={errors?.phones?.[index]?.number}
                  disabled={editSection !== 'telefones'}
                />

                <div className="flex gap-x-2">
                  <Radio
                    label="Fixo"
                    value="FIXED"
                    id={`phones-${index}-typePhone-FIXED`}
                    {...register(`phones.${index}.typePhone`)}
                    disabled={editSection !== 'telefones'}
                  />
                  <Radio
                    label="Celular"
                    value="MOBILE"
                    id={`phones-${index}-typePhone-MOBILE`}
                    {...register(`phones.${index}.typePhone`)}
                    disabled={editSection !== 'telefones'}
                  />
                </div>
              </div>
              <Button
                type="button"
                className="hover:opacity-70"
                onClick={() => fieldArrays.phones.remove(index)}
              >
                Remover telefone
              </Button>
            </div>
          ))}
          <Button
            type="button"
            disabled={editSection !== 'telefones'}
            className={`${
              editSection !== 'telefones' ? 'opacity-70' : 'hover:opacity-70'
            }`}
            onClick={() =>
              fieldArrays.phones.append({
                ddd: '',
                number: '',
                typePhone: 'FIXED',
              })
            }
          >
            Adicionar telefone
          </Button>
        </div>

        <div className="flex gap-2">
          {editSection === 'telefones' ? (
            <button
              className="bg-red-500 rounded-md w-full h-8 py-4 flex items-center justify-center font-semibold transition duration-300 hover:opacity-70"
              type="button"
              onClick={stopEditingSection}
            >
              Salvar
            </button>
          ) : (
            <button
              className="bg-red-500 rounded-md w-full h-8 py-4 flex items-center justify-center font-semibold transition duration-300 hover:opacity-70"
              type="button"
              onClick={() => startEditingSection('telefones')}
            >
              Editar
            </button>
          )}

          <button
            className="bg-green-500 w-full h-8 py-4 flex items-center justify-center rounded-md font-semibold transition duration-300 hover:opacity-70"
            type="button"
            onClick={handleSubmit(handleSaveDataPhones)}
          >
            Salvar telefone
          </button>
        </div>

        {/* Endereços */}
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-semibold">Endereços</p>
          {fieldArrays.addresses.fields.map((item, index) => (
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

                <Controller
                  name={`addresses.${index}.typeResidence`}
                  control={control}
                  render={({ field }) => (
                    <SelectForm
                      label="Tipo de Residência"
                      options={selectTypeResidence}
                      value={
                        selectTypeResidence.find(
                          (option) => option.value === field.value
                        ) || null
                      }
                      onChange={(option) =>
                        field.onChange(option?.value || null)
                      }
                      error={errors?.addresses?.[index]?.typeResidence}
                    />
                  )}
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
                className="hover:opacity-70"
                onClick={() => fieldArrays.addresses.remove(index)}
              >
                Remover endereço
              </Button>
            </div>
          ))}
          <Button
            type="button"
            disabled={editSection !== 'enderecos'}
            className={`${
              editSection !== 'enderecos' ? 'opacity-70' : 'hover:opacity-70'
            }`}
            onClick={() => fieldArrays.addresses.append(emptyAddress)}
          >
            Adicionar endereço
          </Button>

          <div className="flex gap-2">
            {editSection === 'enderecos' ? (
              <button
                className="bg-red-500 rounded-md w-full h-8 py-4 flex items-center justify-center font-semibold transition duration-300 hover:opacity-70"
                type="button"
                onClick={stopEditingSection}
              >
                Salvar
              </button>
            ) : (
              <button
                className="bg-red-500 rounded-md w-full h-8 py-4 flex items-center justify-center font-semibold transition duration-300 hover:opacity-70"
                type="button"
                onClick={() => startEditingSection('enderecos')}
              >
                Editar
              </button>
            )}

            <button
              className="bg-green-500 w-full h-8 py-4 flex items-center justify-center rounded-md font-semibold transition duration-300 hover:opacity-70"
              type="button"
              onClick={handleSubmit(handleSaveEnderecos)}
            >
              Salvar Endereços
            </button>
          </div>
        </div>

        {/* Cartões de crédito */}
        <div className="flex flex-col space-y-2">
          <p className="text-lg font-semibold">Cartões de Crédito</p>
          {fieldArrays.creditCard.fields.map((item, index) => (
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
                  label={`Validade ${index + 1}`}
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
                disabled={editSection !== 'cartoes'}
                className={`${
                  editSection !== 'cartoes' ? 'opacity-70' : 'hover:opacity-70'
                }`}
                onClick={() => fieldArrays.creditCard.remove(index)}
              >
                Remover cartão
              </Button>
            </div>
          ))}
          <Button
            type="button"
            className="hover:opacity-70"
            onClick={() =>
              fieldArrays.creditCard.append({
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

          <div className="flex gap-2">
            {editSection === 'cartoes' ? (
              <button
                className="bg-red-500 rounded-md w-full h-8 py-4 flex items-center justify-center font-semibold transition duration-300 hover:opacity-70"
                type="button"
                onClick={stopEditingSection}
              >
                Salvar cartões
              </button>
            ) : (
              <button
                className="bg-red-500 rounded-md w-full h-8 py-4 flex items-center justify-center font-semibold transition duration-300 hover:opacity-70"
                type="button"
                onClick={() => startEditingSection('cartoes')}
              >
                Editar cartões
              </button>
            )}

            <button
              className="bg-green-500 w-full h-8 py-4 flex items-center justify-center rounded-md font-semibold transition duration-300 hover:opacity-70"
              type="button"
              onClick={handleSubmit(handleSaveCartao)}
            >
              Salvar Cartões de Crédito
            </button>
          </div>
        </div>

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
