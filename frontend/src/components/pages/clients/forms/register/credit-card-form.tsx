import { ICreditCard } from '@/@types/credit-card';
import { selectFlagCrediCard } from '@/mocks/select';
import Input from '@/components/ui/input';
import SelectForm from '@/components/ui/select';
import { ICreditCardFormSchema } from '@/validations/credit-card-schema';
import { Controller, useForm, useFormContext } from 'react-hook-form';
import Button from '@/components/ui/button';

interface ICreditCardProps {
  creditCardList: ICreditCard[];
  setCreditCardList: React.Dispatch<React.SetStateAction<ICreditCard[]>>;
}

//TODO: MELHORAR FORMA DE ADICIONAR CARTAO E LIMPAR CAMPOS

export default function CreditCardForm({
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
  } = useFormContext<ICreditCardFormSchema>();

  const handleAddCreditCard = () => {
    const newCreditCard = getValues();

    const creditCardWithID: ICreditCard = {
      id: Math.ceil(Math.random() * 10000),
      ...newCreditCard,
    };

    setCreditCardList([...creditCardList, creditCardWithID]);
  };

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
          {...register('numberCard')}
          error={errors?.numberCard}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Data de validade"
            placeholder="dd/mm/aaaa"
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
