'use client';

import {
  IRegisterClientForm,
  ClientSchema,
} from '@/validations/register-client-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import AlterClientPersonalInfoForm from './alter-client-personal-info-form';
import AlterClientAddressResidentialForm from './alter-client-address-residential-form';
import AlterClientAddressDeliveryBilling from './alter-client-address-delivery-billing';
import AlterClientCreditCard from './alter-client-credit-card';

//TODO: MELHORAR EDIÇÃO, NEM TODOS SÃO OBRIGATORIOS

export default function AlterClientForm() {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(ClientSchema),
    defaultValues: {
      deliveryAddress: [],
      billingAddress: [],
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<IRegisterClientForm> = () => {
    router.replace('/clientes');
  };

  const cancelAlterFormsFields = () => {
    router.back();
    reset();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center gap-8 my-8"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <AlterClientPersonalInfoForm
              register={methods.register}
              errors={errors}
            />

            <AlterClientAddressResidentialForm
              register={methods.register}
              errors={errors}
            />
          </div>
          <div className="space-y-4">
            <AlterClientAddressDeliveryBilling />

            <AlterClientCreditCard />

            <div className="flex justify-center gap-4">
              <Button type="submit" size="default" color="primary">
                Salvar alteração
              </Button>

              <Button
                type="button"
                size="default"
                onClick={cancelAlterFormsFields}
                color="empty"
                className="border-[1px] border-blue-700"
              >
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
