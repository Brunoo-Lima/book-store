import * as yup from 'yup';

export type ICreditCardFormSchema = yup.InferType<typeof CreditCardFormSchema>;

export const CreditCardFormSchema = yup.object().shape({
  number: yup
    .number()
    .typeError('Número do cartão deve ser um número.')
    .positive('Número do cartão deve ser positivo.')
    .integer('Número do cartão deve ser um número inteiro.')
    .required('Número do cartão de crédito é obrigatório.'),
  cvv: yup
    .number()
    .typeError('CVV deve ser um número.')
    .positive('CVV deve ser positivo.')
    .integer('CVV deve ser um número inteiro.')
    .min(100, 'CVV deve ter no mínimo 3 dígitos.')
    .required('CVV é obrigatório.'),
  namePrinted: yup
    .string()
    .required('Nome no cartão de crédito é obrigatório.'),

  dateValid: yup.string().required('Data de validade é obrigatória.'),
  flag: yup.string().required('Escolha da bandeira é obrigatória.'),
  preference: yup.boolean(),
});
