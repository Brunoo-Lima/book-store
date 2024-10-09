import { ICreditCard } from '@/@types/credit-card';
import { XIcon } from 'lucide-react';
import { useState } from 'react';
import Button from '@/components/ui/button';
import AlterCreditCardForm from './alter-credit-card-form';

export default function AlterClientCreditCard() {
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
            <div
              className="bg-blue-600 p-2 w-full text-left rounded-md cursor-pointer flex justify-between items-center"
              onClick={() => handleCreditCardClick(index)}
            >
              {`Cartão ${index + 1}`}

              <button
                className="z-10"
                type="button"
                onClick={() => handleDeleteCreditCard(credit.id)}
              >
                <XIcon size={18} color="#fff" />
              </button>
            </div>
            {activeCreditCard === index && (
              <div className="bg-zinc-800 border-[1px] rounded-md border-gray-500 p-2 grid grid-cols-2 my-2">
                <p>Bandeira do cartão: {credit.flag}</p>
                <p>N° do cartão: {credit.number}</p>
                <p>CVV: {credit.cvv}</p>
                <p>Nome: {credit.nameCreditCard}</p>
                <p>Expira: {credit.dateExpired}</p>
              </div>
            )}
          </li>
        ))}

        {isAddCreditCard && (
          <AlterCreditCardForm
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
