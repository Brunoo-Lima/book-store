import { ICreditCard } from '@/@types/credit-card';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import CreditCard from './credit-card-form';
import Button from '@/components/ui/button';

export default function ClientCreditCard() {
  const [isAddCreditCard, setIsAddCreditCard] = useState(false);
  const [creditCardList, setCreditCardList] = useState<ICreditCard[]>([]);
  const [activeCreditCard, setActiveCreditCard] = useState<number | null>(null);

  const handleCreditCardClick = (index: number) => {
    setActiveCreditCard(activeCreditCard === index ? null : index);
  };

  const handleDeleteCreditCard = (id: number) => {
    setCreditCardList(creditCardList.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h3 className="text-xl font-semibold my-2">Cartão de Crédito</h3>

      <div>
        {creditCardList.map((credit, index) => (
          <li key={index} className="mb-2 list-none">
            <label
              className={`p-2 w-full text-left rounded-md cursor-pointer flex justify-between items-center relative transition duration-75 ${
                activeCreditCard === index ? 'bg-green-600' : 'bg-blue-600'
              }`}
            >
              <input
                type="radio"
                name="creditCard"
                value={index}
                checked={activeCreditCard === index}
                onChange={() => handleCreditCardClick(index)}
                className="mr-2"
              />

              {activeCreditCard === index && (
                <span className="text-white text-xs absolute left-4">
                  Principal
                </span>
              )}

              {`Cartão ${index + 1}`}

              <button
                className="z-10"
                type="button"
                onClick={() => handleDeleteCreditCard(credit.id)}
              >
                <XIcon size={18} color="#fff" />
              </button>
            </label>
            {activeCreditCard === index && (
              <div className="bg-zinc-800 border-[1px] rounded-md border-gray-500 p-2 grid grid-cols-2 my-2">
                <p>Bandeira do cartão: {credit.flag}</p>
                <p>N° do cartão: {credit.numberCard}</p>
                <p>CVV: {credit.cvv}</p>
                <p>Nome: {credit.nameCreditCard}</p>
                <p>Expira: {credit.dateExpired}</p>
              </div>
            )}
          </li>
        ))}

        {isAddCreditCard && (
          <CreditCard
            creditCardList={creditCardList}
            setCreditCardList={setCreditCardList}
          />
        )}

        <Button
          type="button"
          size="sm"
          color="addFields"
          onClick={() => setIsAddCreditCard(!isAddCreditCard)}
        >
          Adicionar cartão
        </Button>
      </div>
    </div>
  );
}
