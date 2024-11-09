import { IClient } from '../@types/client';
import { IClientFormSchema } from '../validations/register-client-schema';

export const mapFormDataToClient = (
  formData: Partial<IClientFormSchema>
): Partial<IClient> => {
  return {
    id: '', // Você pode gerar um ID se necessário ou deixá-lo vazio
    phones:
      formData.phones &&
      formData.phones.map((phone) => ({
        ddd: phone.ddd,
        number: phone.number,
        typePhone: phone.typePhone || 'CELULAR',
      })),
    profilePurchase: formData.profilePurchase,
    name: formData.name,
    dateOfBirth: formData.dateOfBirth,
    email: formData.email,
    cpf: formData.cpf,
    gender: formData.gender,
    password: formData.password,
    confirmPassword: formData.confirmPassword,
  };
};
