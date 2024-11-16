import * as yup from 'yup';

export type IAddressFormSchema = yup.InferType<typeof AddressFormSchema>;

export const AddressFormSchema = yup.object({
  streetName: yup.string().required('Nome da rua é obrigatório'),
  publicPlace: yup.string().required('Logradouro é obrigatório'),
  nameAddress: yup.string().required('Nome curto do endereço é obrigatório'),
  number: yup.string().required('Número é obrigatório'),
  cep: yup
    .string()
    // .matches(/^\d{5}-\d{3}$/, 'CEP inválido')
    .required('CEP é obrigatório'),
  neighborhood: yup.string().required('Bairro é obrigatório'),
  city: yup.string().required('Cidade é obrigatória'),
  state: yup.string().required('Estado é obrigatório'),
  compostName: yup.string().required('Complemento é obrigatório'),
  typeResidence: yup.string().required('Tipo de residência é obrigatório'),
  change: yup.boolean(),
  delivery: yup.boolean(),
});

export const emptyAddress = {
  id: Math.ceil(Math.random() * 1000).toString(),
  streetName: '',
  publicPlace: '',
  nameAddress: '',
  number: '',
  cep: '',
  neighborhood: '',
  city: '',
  state: '',
  compostName: '',
  typeResidence: '',
  change: false,
  delivery: false,
};
