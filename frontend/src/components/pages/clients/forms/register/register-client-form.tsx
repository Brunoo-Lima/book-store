'use client';

import {
  IClientFormSchema,
  ClientSchema,
} from '@/validations/register-client-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import ClientPersonalInfoForm from './client-personal-info-form';
import Button from '@/components/ui/button';
import ClientAddressResidentialForm from './client-address-residential-form';
import { useCreateClient } from '@/services/clients';
import Radio from '@/components/ui/radio';
import Input from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { emptyAddress, IAddressFormSchema } from '@/validations/address-schema';
import { IError } from '@/@types/error';

export default function RegisterClientForm() {
  const methods = useForm({
    resolver: yupResolver(ClientSchema),
    defaultValues: {
      addresses: [],
    },
  });

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const residencial = useFieldArray({
    control,
    name: 'addresses',
  });

  const { mutateAsync: createClient, isLoading } = useCreateClient();

  const onSubmit = async (data: Partial<IClientFormSchema>) => {
    console.log('Dados enviados para o onSubmit:', data); // Log para verificar os dados antes do envio

    createClient(data, {
      onSuccess: (response) => {
        console.log('Cliente criado com sucesso:', response);
      },
      onError: (error) => {
        console.error('Erro ao criar cliente:', error);
      },
    });
  };

  const clearFormFields = () => {
    reset();
  };

  const handleAddAddress = () => {
    residencial.append(emptyAddress);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center gap-8 my-8"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            {/* <ClientPersonalInfoForm />

            <ClientAddressResidentialForm /> */}

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

            <div className="grid md:grid-cols-2 md:gap-4 items-start">
              <div>
                <p className="block text-sm font-medium text-white">
                  Tipo do telefone:{' '}
                </p>
                <Radio
                  label="Celular"
                  value="CELULAR"
                  {...register('phones.0.typePhone')}
                />
                <Radio
                  label="Fixo"
                  value="FIXO"
                  {...register('phones.0.typePhone')}
                />
                {errors?.phones?.[0]?.typePhone && (
                  <span className="text-sm text-red-600">
                    {errors.phones[0].typePhone.message}
                  </span>
                )}
              </div>

              {/* // <div key={field.id} className="w-7/12">
                  //   <Input
                  //     type="text"
                  //     label="Cidade"
                  //     placeholder="Cidade"
                  //     {...register(`addresses.${index}.city`)}
                  //     error={errors?.addresses?.[index]?.city}
                  //   />
                  // </div> */}

              <div className="w-7/12">
                <Input
                  type="text"
                  label="DDD"
                  placeholder="DDD"
                  {...register('phones.0.ddd')}
                  error={errors?.phones?.[0]?.ddd}
                />
              </div>

              <Input
                type="tel"
                label="Telefone"
                placeholder="00000-0000"
                {...register('phones.0.number')}
                error={errors?.phones?.[0]?.number}
                onInput={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const input = event.target;
                  input.value = input.value.replace(/[^0-9]/g, '');
                }}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 md:gap-4 items-start">
            <div className="flex flex-col">
              <p className="block text-sm font-medium text-white">Gênero</p>
              <Radio label="Masculino" value="MALE" {...register('gender')} />
              <Radio label="Feminino" value="FEMALE" {...register('gender')} />

              {errors?.gender && (
                <span className="text-red-600 text-sm">
                  {errors.gender.message}
                </span>
              )}
            </div>
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
          </div>
        </div>
        <div className="space-y-4">
          <Input
            type="text"
            label="Nível de compra"
            placeholder="Digite o nivel de compra"
            {...register('profilePurchase')}
            error={errors?.profilePurchase}
          />
          <div>
            {/* <Textarea
          label="Observações"
          placeholder="Digite sua observação (opcional)"
          {...register('addresses.0.observation')}
          error={errors?.addresses?.[0]?.observation}
        /> */}
          </div>
        </div>
        {/* <ClientAddressDeliveryBilling />
            <ClientCreditCard /> */}

        {/* <div className="flex justify-center gap-4"> */}

        {/* </div> */}

        <button onClick={handleAddAddress}>Adicionar endereço</button>

        <div className="grid md:grid-cols-2 md:gap-4 items-start">
          {residencial.fields.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`addresses.${index}`}
              render={({ field: { value, onChange } }) => (
                <ClientAddressResidentialForm
                  value={value}
                  onChange={onChange}
                  index={index}
                  error={errors.addresses?.[index]}
                />
              )}
            />
          ))}
        </div>

        <Button type="submit" size="default" color="primary">
          Adicionar cliente
        </Button>

        <Button
          type="button"
          size="default"
          onClick={clearFormFields}
          color="empty"
          className="border-[1px] border-blue-700"
        >
          Limpar campos
        </Button>
      </form>
    </FormProvider>
  );
}
