import Clients from '@/components/pages/clients/clients';
import Header from '@/components/ui/header';

export default function ClientsPage() {
  return (
    <>
      <Header title="Lista de Clientes" />

      <Clients />
    </>
  );
}
