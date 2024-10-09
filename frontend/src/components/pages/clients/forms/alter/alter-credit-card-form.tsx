import { ICreditCard } from '@/@types/credit-card';
import { selectFlagCrediCard } from '@/mocks/select';
import Input from '@/components/ui/input';
import SelectForm from '@/components/ui/select';
import {
  CreditCardFormSchema,
  ICreditCardFormSchema,
} from '@/validations/credit-card-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@/components/ui/button';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { clientsList } from '@/mocks/clientsList';

interface ICreditCardProps {
  creditCardList: ICreditCard[];
  setCreditCardList: React.Dispatch<React.SetStateAction<ICreditCard[]>>;
}

export default function AlterCreditCardForm({
  creditCardList,
  setCreditCardList,
}: ICreditCardProps) {
  const {
    register,
    control,
    formState: { errors },
    reset,
    handleSubmit,
    getValues,
    setValue,
  } = useForm<ICreditCardFormSchema>({
    resolver: yupResolver(CreditCardFormSchema),
  });
  const { id } = useParams();

  const handleAddCreditCard = handleSubmit(() => {
    const newCreditCard = getValues();

    const creditCardWithID: ICreditCard = {
      id: Math.ceil(Math.random() * 10000),
      ...newCreditCard,
    };

    setCreditCardList([...creditCardList, creditCardWithID]);
    reset();
  });

  useEffect(() => {
    const client = clientsList.find((client) => client.id === Number(id));

    if (client) {
      client.creditCard.forEach((credit) => {
        setValue('nameCreditCard', credit.nameCreditCard);
        setValue('cvv', credit.cvv);
        setValue('dateExpired', credit.dateExpired);
        setValue('flag', credit.flag);
        setValue('number', credit.number);
        setValue('number', credit.number);
      });
    }
  }, [id, setValue]);

  return (
    <div className="my-2">
      <div className="space-y-4 mb-4">
        <Controller
          name="flag"
          control={control}
          render={({ field }) => (
            <SelectForm
              label="Bandeira"
              options={selectFlagCrediCard}
              value={
                selectFlagCrediCard.find(
                  (option) => option.value === field.value
                ) || null
              }
              onChange={(option) => field.onChange(option?.value || null)}
              error={errors.flag}
            />
          )}
        />

        <Input
          type="number"
          label="Número do cartão"
          placeholder="0000-0000-0000-0000"
          {...register('number')}
          error={errors?.number}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Data de validade"
            placeholder="dd/mm"
            {...register('dateExpired')}
            error={errors?.dateExpired}
          />

          <Input
            type="number"
            label="CVV"
            placeholder="000"
            {...register('cvv')}
            error={errors?.cvv}
          />
        </div>

        <Input
          type="text"
          label="Nome no cartão"
          placeholder="Nome impresso no cartão"
          {...register('nameCreditCard')}
          error={errors?.nameCreditCard}
        />
      </div>

      <Button
        type="button"
        color="success"
        size="xs"
        onClick={handleAddCreditCard}
      >
        Adicionar
      </Button>
    </div>
  );
}
