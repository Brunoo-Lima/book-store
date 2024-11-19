import { IProductDTO } from '@/@types/product';
import Input from '@/components/ui/input';
import { createProduct } from '@/services/products';
import handleError, { notifySuccess } from '@/utilities/handle-toast';
import { useState } from 'react';

interface IModalProps {
  onClose: () => void;
  data: IProductDTO | null;
}

export default function Modal({ onClose, data }: IModalProps) {
  const [formData, setFormData] = useState<IProductDTO>({
    product_id: data?.product_id || '',
    name: data?.name || '',
    product_price: data?.product_price || 0,
    quantity: data?.quantity || 0,
  });

  if (!data) return;

  const handleChange = (field: keyof IProductDTO, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const product = await createProduct(formData);

      if (product) {
        notifySuccess('Produto criado com sucesso!');
        onClose();
      } else {
        handleError('Falha ao criar o Produto');
      }
    } catch (err) {
      handleError('Erro ao criar o Produto');
    }
  };

  return (
    <div className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-96 h-96 z-10 bg-zinc-700 p-3 rounded-md flex flex-col">
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Digite o nome do produto"
          label="Nome do produto"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />

        <Input
          type="text"
          placeholder="Digite a quantidade do produto"
          label="Quantidade do produto"
          value={formData.quantity}
          onChange={(e) => handleChange('quantity', Number(e.target.value))}
        />

        <Input
          type="text"
          placeholder="Digite o preço do produto"
          label="Preço do produto"
          value={formData.product_price}
          onChange={(e) =>
            handleChange('product_price', Number(e.target.value))
          }
        />

        <button type="submit">Cadastrar</button>
        <button type="button" onClick={onClose}>
          Cancelar
        </button>
      </form>
    </div>
  );
}
