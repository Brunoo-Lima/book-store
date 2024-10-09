import RegisterClientForm from '@/components/pages/clients/forms/register/register-client-form';
import Header from '@/components/ui/header';

export default function RegisterPage() {
  return (
    <>
      <Header title="Cadastro de clientes" />

      <RegisterClientForm />
    </>
  );
}
