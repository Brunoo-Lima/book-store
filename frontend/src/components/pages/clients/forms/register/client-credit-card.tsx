import { Control, Controller, UseFormReturn } from 'react-hook-form';
import Input from '@/components/ui/input';
import Button from '@/components/ui/button';

// Define os tipos esperados para as props
interface ClientCreditCardFormProps {
  index: number;
  remove: () => void;
  control: Control<any>; // Tipar de acordo com seu schema, ex: Control<IClientFormSchema>
}

export function ClientCreditCardForm({
  index,
  remove,
  control,
}: ClientCreditCardFormProps) {
  return (
    <div className="flex flex-col gap-4 border p-4 rounded-md">
      <h3 className="text-lg font-medium">Cartão de Crédito {index + 1}</h3>

      <Controller
        name={`creditCart.${index}.cardNumber`} // Acessa o array de cartões de crédito
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Número do Cartão"
            placeholder="0000 0000 0000 0000"
            error={error}
            type="text"
            {...field}
          />
        )}
      />

      <Controller
        name={`creditCart.${index}.cardHolderName`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            label="Nome do Titular"
            type="text"
            placeholder="Nome no cartão"
            error={error}
            {...field}
          />
        )}
      />

      <Controller
        name={`creditCart.${index}.expiryDate`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            type="text"
            label="Validade"
            placeholder="MM/AA"
            error={error}
            {...field}
          />
        )}
      />

      <Controller
        name={`creditCart.${index}.cvv`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Input
            type="text"
            label="CVV"
            placeholder="Código de segurança"
            error={error}
            {...field}
          />
        )}
      />

      <Button type="button" onClick={remove}>
        Remover cartão
      </Button>
    </div>
  );
}
