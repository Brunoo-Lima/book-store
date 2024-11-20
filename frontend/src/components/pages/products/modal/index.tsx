import { IProductDTO } from '@/@types/product';
import Input from '@/components/ui/input';
import { createProduct } from '@/services/products';
import handleError, { notifySuccess } from '@/utilities/handle-toast';
import { useState } from 'react';

interface IModalProps {
  onClose: () => void;
  data: IProductDTO | null;
  onUpdateList: () => Promise<void>;
}

export default function Modal({ onClose, data, onUpdateList }: IModalProps) {
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

  const handleCloseModal = () => {
    setFormData({
      product_id: '',
      name: '',
      product_price: 0,
      quantity: 0,
    });
    onClose();
  };

  const isFormValid = () => {
    if (!formData.name.trim()) {
      handleError('O nome do produto é obrigatório.');
      return false;
    }
    if (formData.quantity <= 0 || isNaN(formData.quantity)) {
      handleError('A quantidade deve ser um número positivo.');
      return false;
    }
    if (formData.product_price <= 0 || isNaN(formData.product_price)) {
      handleError('O preço deve ser um número positivo.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) return;

    try {
      const product = await createProduct(formData);

      if (product) {
        notifySuccess('Produto criado com sucesso!');
        await onUpdateList();
        onClose();
      } else {
        handleError('Falha ao criar o Produto');
      }
    } catch (err) {
      handleError('Erro ao criar o Produto');
    }
  };

  return (
    <div className="fixed -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-96 h-[400px] z-10 bg-[#1f1d1d] p-4 rounded-md flex flex-col border border-gray-600">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 mt-6">
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

        <div className="flex items-center gap-x-3 mt-6">
          <button
            className="bg-green-500 rounded-md w-full h-8 font-semibold text-base hover:bg-green-700 transition duration-300"
            type="submit"
          >
            Cadastrar
          </button>
          <button
            className="bg-red-500 rounded-md w-full h-8 font-semibold text-base hover:bg-red-700 transition duration-300"
            type="button"
            onClick={handleCloseModal}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
