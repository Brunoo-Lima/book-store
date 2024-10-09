'use client';

import {
  IClientFormSchema,
  ClientSchema,
} from '@/validations/register-client-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import ClientPersonalInfoForm from './client-personal-info-form';
import Button from '@/components/ui/button';
import ClientAddressResidentialForm from './client-address-residential-form';
import ClientAddressDeliveryBilling from './client-address-delivery-billing';
import ClientCreditCard from './client-credit-card';
import { useState } from 'react';
import { IAddressBilling, IAddressDelivery } from '@/@types/client';

//TODO: MELHORAR FORMA DE LIMPAR CAMPOS

export default function RegisterClientForm() {
  const methods = useForm({
    resolver: yupResolver(ClientSchema),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;
  const [deliveryAddresses, setDeliveryAddresses] = useState([]);
  const [billingAddresses, setBillingAddresses] = useState([]);

  const onSubmit: SubmitHandler<IClientFormSchema> = (data) => {
    console.log('teste data', data);
  };

  const clearFormFields = () => {
    reset();
  };

  // const addDeliveryAddress = (address: IAddressDelivery) => {
  //   const addressData: IAddressDelivery = {
  //     ...address,
  //   };
  //   setDeliveryAddresses([...deliveryAddresses, addressData]);
  // };

  // const addBillingAddress = (address: IAddressBilling[]) => {
  //   setBillingAddresses((prev) => [...prev, address]);
  //   // resetAddressFields();
  // };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col justify-center gap-8 my-8"
      >
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <ClientPersonalInfoForm />

            <ClientAddressResidentialForm />
          </div>
          <div className="space-y-4">
            <ClientAddressDeliveryBilling />

            <ClientCreditCard />

            <div className="flex justify-center gap-4">
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
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}
