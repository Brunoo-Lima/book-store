import * as yup from 'yup';

export type IAddressFormSchema = yup.InferType<typeof AddressFormSchema>;

export const AddressFormSchema = yup.object({
  neighborhood: yup.string().required('Bairro é obrigatório'),
  publicPlace: yup.string().required('Logradouro é obrigatório'),
  street: yup.string().required('Rua é obrigatório'),
  number: yup
    .string()
    .required('Número é obrigatório')
    .min(2, 'Número não pode ser vazio'),
  zipCode: yup.string().required('CEP é obrigatório'),
  city: yup.string().required('Cidade é obrigatório'),
  state: yup.string().required('Estado é obrigatório'),
  country: yup.string().required('País é obrigatório'),
  observation: yup.string().optional(),
});

export type IAddressDeliveryFormSchema = yup.InferType<
  typeof AddressDeliveryFormSchema
>;

export const AddressDeliveryFormSchema = AddressFormSchema.shape({
  identifier: yup.string().required('Nome é obrigatório'),
});
