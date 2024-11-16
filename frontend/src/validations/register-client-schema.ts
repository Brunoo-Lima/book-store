import * as yup from 'yup';
import { AddressFormSchema, AddressDeliveryFormSchema } from './address-schema';
import { CreditCardFormSchema } from './credit-card-schema';

export type IClientFormSchema = yup.InferType<typeof ClientSchema>;

export const ClientSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  cpf: yup.string().required('CPF é obrigatório'),
  dateOfBirth: yup.string().required('Data de nascimento é obrigatória'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  gender: yup.string().required('Gênero é obrigatório'),
  password: yup
    .string()
    .required('Senha é obrigatória')
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .matches(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .matches(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .matches(/\d/, 'A senha deve conter pelo menos um número')
    .matches(
      /[@$!%*?&#]/,
      'A senha deve conter pelo menos um caractere especial (@$!%*?&#)'
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Senhas não são iguais')
    .required('Confirmação de senha é obrigatória'),
  profilePurchase: yup.string().required('Perfil de compra é obrigatório'),
  statusClient: yup.string().optional(),
  phones: yup
    .array()
    .of(
      yup.object({
        ddd: yup
          .string()
          .matches(/^\d{2}$/, 'DDD inválido')
          .required('DDD é obrigatório'),
        number: yup
          .string()
          .matches(/^\d{8,9}$/, 'Número inválido')
          .required('Número de telefone é obrigatório'),
        typePhone: yup.string().required('Tipo de telefone é obrigatório'),
      })
    )
    .min(1, 'É necessário ao menos um telefone'),

  addresses: yup.array().of(AddressFormSchema).required(),

  creditCard: yup
    .array()
    .of(CreditCardFormSchema)
    .min(1, 'É necessário ao menos um cartão de crédito'),
});
