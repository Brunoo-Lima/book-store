'use client';

import { IProduct, IProductDTO } from '@/@types/product';
import Header from '@/components/ui/header';
import { listProducts } from '@/services/products';
import { useEffect, useState } from 'react';
import Modal from './modal';
import { formattedPrice } from '@/utilities/formattedPrice';

export default function Products() {
  const [productsList, setProductsList] = useState<IProduct[] | []>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dataModal, setDataModal] = useState<IProductDTO | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await listProducts();

      setProductsList(products?.products || []);
    };

    fetchProducts();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(true);
    setDataModal({
      product_id: '',
      name: '',
      product_price: 0,
      quantity: 0,
    } as IProductDTO);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setDataModal(null);
  };

  return (
    <section className="flex flex-col space-y-8">
      <Header title="Produtos" />

      <button
        type="button"
        className="bg-green-500 font-semibold text-lg rounded-md h-10 w-max flex items-center justify-center px-3"
        onClick={handleOpenModal}
      >
        Cadastrar produto
      </button>

      <div className="flex gap-4">
        {productsList.length <= 0 ? (
          <p>Nenhum produto</p>
        ) : (
          <>
            {productsList.map((product) => (
              <div
                key={product.pro_id}
                className="flex flex-col w-52 h-60 border border-gray-800 p-3 rounded-md bg-blue-600"
              >
                <div className="flex-1">
                  <h2 className="font-bold text-lg">{product.pro_name}</h2>
                </div>

                <p>
                  <span className="font-semibold">Quantidade: </span>
                  {product.pro_quantity}
                </p>
                <p>
                  <span className="font-semibold">Preço: </span>{' '}
                  {formattedPrice(product.pro_price)}
                </p>
              </div>
            ))}
          </>
        )}
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-[rgba(18,18,18,0.2)] z-10 ">
          <Modal onClose={handleCloseModal} data={dataModal} />
        </div>
      )}
    </section>
  );
}
