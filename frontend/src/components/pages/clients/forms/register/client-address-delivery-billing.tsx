import { IAddressBilling, IAddressDelivery } from '@/@types/client';
import { useState } from 'react';
import Button from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import AddressBillingForm from './address-billing-form';
import AddressDeliveryForm from './address-delivery-form';

export default function ClientAddressDeliveryBilling() {
  const [addressDelivery, setAddressDelivery] = useState<IAddressDelivery[]>(
    []
  );
  const [addressBilling, setAddressBilling] = useState<IAddressBilling[]>([]);
  const [isAddAddressDelivery, setIsAddAddressDelivery] = useState(false);
  const [isAddAddressBilling, setIsAddAddressBilling] = useState(false);
  const [activeAddressBilling, setActiveAddressBilling] = useState<
    number | null
  >(null);

  const [activeAddressDelivery, setActiveAddressDelivery] = useState<
    number | null
  >(null);

  const handleAddressBillingClick = (index: number) => {
    setActiveAddressBilling(activeAddressBilling === index ? null : index);
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
              <label
                className={`p-2 w-full text-left rounded-md cursor-pointer flex justify-between items-center relative transition duration-75 ${
                  activeAddressDelivery === index
                    ? 'bg-green-600'
                    : 'bg-blue-600'
                }`}
              >
                <input
                  type="radio"
                  name="addressDelivery"
                  value={index}
                  checked={activeAddressDelivery === index}
                  onChange={() => handleAddressDeliveryClick(index)}
                  className="mr-2"
                />

                {activeAddressDelivery === index && (
                  <span className="text-white text-xs absolute left-4">
                    Principal
                  </span>
                )}

                {address.identifier || `Endereço de entrega ${index + 1}`}

                <button
                  className="z-10"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que o evento de clique do radio seja disparado
                    handleDeleteAddressDelivery(address.id);
                  }}
                >
                  <XIcon size={18} color="#fff" />
                </button>
              </label>
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
          <AddressDeliveryForm
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
              <label
                className={`p-2 w-full text-left rounded-md cursor-pointer flex justify-between items-center relative transition duration-75 ${
                  activeAddressBilling === index
                    ? 'bg-green-600'
                    : 'bg-blue-600'
                }`}
              >
                <input
                  type="radio"
                  name="addressBilling"
                  value={index}
                  checked={activeAddressBilling === index}
                  onChange={() => handleAddressBillingClick(index)}
                  className="mr-2"
                />
                {activeAddressBilling === index && (
                  <span className="text-white text-xs absolute left-4">
                    Principal
                  </span>
                )}

                {`Endereço de cobrança ${index + 1}`}

                <button
                  className="z-10"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation(); // Evita que o evento de clique do radio seja disparado
                    handleDeleteAddressBilling(address.id);
                  }}
                >
                  <XIcon size={18} color="#fff" />
                </button>
              </label>
              {activeAddressBilling === index && (
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
          <AddressBillingForm
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
