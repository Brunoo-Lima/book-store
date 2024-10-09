import AlterClientForm from '@/components/pages/clients/forms/alter/alter-client-form';
import Header from '@/components/ui/header';

export default function AlterClientsPage() {
  return (
    <>
      <Header title="Alterar dados do cliente" />

      <AlterClientForm />
    </>
  );
}
