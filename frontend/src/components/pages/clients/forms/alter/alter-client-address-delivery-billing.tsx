import { IAddressBilling, IAddressDelivery } from '@/@types/client';
import { useState } from 'react';
import Button from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import AlterAddressDeliveryForm from './alter-address-delivery-form';
import AlterAddressBillingForm from './alter-address-billing-form';

export default function AlterClientAddressDeliveryBilling() {
  const [addressDelivery, setAddressDelivery] = useState<IAddressDelivery[]>(
    []
  );
  const [addressBilling, setAddressBilling] = useState<IAddressBilling[]>([]);
  const [isAddAddressDelivery, setIsAddAddressDelivery] = useState(false);
  const [isAddAddressBilling, setIsAddAddressBilling] = useState(false);
  const [activeAddress, setActiveAddress] = useState<number | null>(null);

  const [activeAddressDelivery, setActiveAddressDelivery] = useState<
    number | null
  >(null);

  const handleAddressClick = (index: number) => {
    setActiveAddress(activeAddress === index ? null : index);
  };

  const handleDeleteAddressBilling = (id: number) => {
    setAddressBilling(addressBilling.filter((item) => item.id !== id));
  };

  const handleAddressDeliveryClick = (index: number) => {
    setActiveAddressDelivery(activeAddressDelivery === index ? null : index);
  };

  const handleDeleteAddressDelivery = (id: number) => {
    setAddressDelivery(addressDelivery.filter((item) => item.id !== id));
  };

  return (
    <>
      <div>
        <h3 className="text-xl font-semibold my-2">Endereço de entrega</h3>
        {/* Código para gerenciamento dos endereços de entrega */}

        <ul>
          {addressDelivery.map((address, index) => (
            <li key={index} className="mb-2">
              <div
                className="bg-blue-600 p-2 w-full text-left rounded-md cursor-pointer flex justify-between items-center"
                onClick={() => handleAddressDeliveryClick(index)}
              >
                {address.name || `Endereço de entrega ${index + 1}`}

                <button
                  className="z-10"
                  type="button"
                  onClick={() => handleDeleteAddressDelivery(address.id)}
                >
                  <XIcon size={18} color="#fff" />
                </button>
              </div>
              {activeAddressDelivery === index && (
                <div className="bg-zinc-800 border-[1px] rounded-md border-gray-500 p-2 grid grid-cols-2 my-2">
                  <p>Rua: {address.street}</p>
                  <p>Bairro: {address.neighborhood}</p>
                  <p>CEP: {address.zipCode}</p>
                  <p>Cidade: {address.city}</p>
                  <p>Estado: {address.state}</p>
                  <p>País: {address.country}</p>
                  <p>Observação: {address.observation}</p>
                </div>
              )}
            </li>
          ))}
        </ul>

        {isAddAddressDelivery && (
          <AlterAddressDeliveryForm
            addressDelivery={addressDelivery}
            setAddressDelivery={setAddressDelivery}
          />
        )}

        <Button
          type="button"
          size="sm"
          color="addFields"
          onClick={() => setIsAddAddressDelivery(!isAddAddressDelivery)}
        >
          Adicionar endereço
        </Button>
      </div>

      <div>
        <h3 className="text-xl font-semibold my-2">Endereço de cobrança</h3>
        {/* Código para gerenciamento dos endereços de cobrança */}
        <ul>
          {addressBilling.map((address, index) => (
            <li key={index} className="mb-2">
              <div
                className="bg-blue-600 p-2 w-full text-left rounded-md cursor-pointer flex justify-between items-center"
                onClick={() => handleAddressClick(index)}
              >
                {`Endereço de cobrança ${index + 1}`}

                <button
                  className="z-10"
                  type="button"
                  onClick={() => handleDeleteAddressBilling(address.id)}
                >
                  <XIcon size={18} color="#fff" />
                </button>
              </div>
              {activeAddress === index && (
                <div className="bg-zinc-800 border-[1px] rounded-md border-gray-500 p-2 grid grid-cols-2 my-2">
                  <p>Rua: {address.street}</p>
                  <p>Bairro: {address.neighborhood}</p>
                  <p>CEP: {address.zipCode}</p>
                  <p>Cidade: {address.city}</p>
                  <p>Estado: {address.state}</p>
                  <p>País: {address.country}</p>
                  <p>Observação: {address.observation}</p>
                </div>
              )}
            </li>
          ))}
        </ul>

        {isAddAddressBilling && (
          <AlterAddressBillingForm
            addressBilling={addressBilling}
            setAddressBilling={setAddressBilling}
          />
        )}

        <Button
          type="button"
          size="sm"
          color="addFields"
          onClick={() => setIsAddAddressBilling(!isAddAddressBilling)}
        >
          Adicionar endereço
        </Button>
      </div>
    </>
  );
}
