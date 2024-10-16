import * as yup from 'yup';

export type IAddressFormSchema = yup.InferType<typeof AddressFormSchema>;

export const AddressFormSchema = yup.object({
  streetName: yup.string().required('Nome da rua é obrigatório'),
  publicPlace: yup.string().required('Logradouro é obrigatório'),
  nameAddress: yup.string().required('Nome do endereço é obrigatório'),
  number: yup.string().required('Número é obrigatório'),
  cep: yup
    .string()
    .matches(/^\d{8}$/, 'CEP inválido')
    .required('CEP é obrigatório'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup.string().required('Estado é obrigatório'),
  country: yup.string().required('País é obrigatório'),
  compostName: yup.string(),
  typeResidence: yup
    .string()
    .oneOf(['HOME', 'APARTMENT'])
    .required('Tipo de residência é obrigatório'),
  change: yup.boolean(),
  delivery: yup.boolean(),
});

export type IAddressDeliveryFormSchema = yup.InferType<
  typeof AddressDeliveryFormSchema
>;

export const AddressDeliveryFormSchema = AddressFormSchema.shape({
  identifier: yup.string().required('Nome é obrigatório'),
});

export const emptyAddress = {
  streetName: '',
  publicPlace: '',
  nameAddress: '',
  number: '',
  cep: '',
  neighborhood: '',
  city: '',
  state: '',
  country: '',
  compostName: '',
  typeResidence: 'APARTMENT',
  change: false,
  delivery: false,
};
