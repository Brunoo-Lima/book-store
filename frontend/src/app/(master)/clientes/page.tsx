import ListClients from '@/components/pages/clients/list_clients';
import Header from '@/components/ui/header';

export default function ClientsPage() {
  return (
    <>
      <Header title="Lista de Clientes" />

      <ListClients />
    </>
  );
}
