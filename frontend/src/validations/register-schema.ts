import * as yup from 'yup';

export type IRegisterForm = yup.InferType<typeof RegisterSchema>;

export const RegisterSchema = yup.object({
  email: yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .required('Confirmação de senha é obrigatório')
    .oneOf([yup.ref('password')], 'As senhas devem ser iguais'),
});
