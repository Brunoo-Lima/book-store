import React, { useState } from 'react';
import Input from '../form/Input';
import InputRange from '../form/InputRange';
import { FormatCurrency } from '../utils/formatCurrency';
import Select, { Option } from '../form/Select';

type NavbarProps = {
  searchAuthor: string;
  setSearchAuthor: React.Dispatch<React.SetStateAction<string>>;

  searchPublisher: string;
  setSearchPublisher: React.Dispatch<React.SetStateAction<string>>;

  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;

  setSort: React.Dispatch<React.SetStateAction<string>>;
};

const categories: Option[] = [
  { value: 'All', label: 'Todas' },
  { value: 'Biografia/Autobiografia', label: 'Biografia/Autobiografia' },
  { value: 'Ensaio', label: 'Ensaio' },
  { value: 'Fantasia', label: 'Fantasia' },
  { value: 'Ficção Científica', label: 'Ficção Científica' },
  { value: 'Ficção Histórica', label: 'Ficção Histórica' },
  { value: 'Horror', label: 'Horror' },
  { value: 'Literatura Clássica', label: 'Literatura Clássica' },
  { value: 'Mistério/Thriller', label: 'Mistério/Thriller' },
  { value: 'Poesia', label: 'Poesia' },
  { value: 'Romance', label: 'Romance' },
  { value: 'Outros', label: 'Outros' },
];

const Navbar = ({
  searchAuthor,
  setSearchAuthor,
  searchPublisher,
  setSearchPublisher,
  setSort,
  filter,
  setFilter,
}: NavbarProps) => {
  const [price, setPrice] = useState(10);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(parseInt(e.target.value));
  };

  return (
    <div className="bg-[#e7e7e7] h-screen border-r-2 border-gray-400 rounded-tr-md p-4">
      <h2 className="text-2xl text-center">Filtragem</h2>
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex items-center gap-2">
          <h2>Autor:</h2>

          <Input
            type="text"
            placeholder="Digite o nome do Autor"
            width={250}
            value={searchAuthor}
            onChange={(e) => setSearchAuthor(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <h2>Editora:</h2>

          <Input
            type="text"
            placeholder="Digite o nome da Editora"
            width={250}
            value={searchPublisher}
            onChange={(e) => setSearchPublisher(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <h2>Grupo de precificação:</h2>

          <Select
            value={filter}
            options={[
              { value: 'DEFAULT', label: 'TODAS' },
              { value: 'BRONZE', label: 'BRONZE' },
              { value: 'SILVER', label: 'SILVER' },
              { value: 'GOLD', label: 'GOLD' },
              { value: 'DIAMOND', label: 'DIAMOND' },
            ]}
            onChange={setFilter}
          />
        </div>

        <div className="flex items-center gap-1">
          <p>Ordenar:</p>
          <Select
            value={filter}
            options={[
              { value: 'Asc', label: 'Asc' },
              { value: 'Desc', label: 'Desc' },
            ]}
            onChange={setSort}
          />
        </div>

        <div className="flex items-center gap-1">
          <p>Categorias:</p>

          <Select value={filter} options={categories} onChange={setSort} />
        </div>

        <div className="flex flex-col gap-1">
          <p>
            Faixa de preço:{' '}
            <span className="font-semibold">
              {FormatCurrency('BRL', price)}
            </span>
          </p>

          <InputRange price={price} handlePriceChange={handlePriceChange} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
