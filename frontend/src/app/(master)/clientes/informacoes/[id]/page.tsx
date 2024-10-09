import InfoClient from '@/components/pages/clients/info-client';
import Header from '@/components/ui/header';

export default function InformationClientId() {
  return (
    <>
      <Header title="Informações do cliente" isButtonBack={true} />

      <InfoClient />
    </>
  );
}
