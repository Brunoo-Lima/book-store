import React from 'react';
import Input from '../form/Input';
import InputRange from '../form/InputRange';
import { FormatCurrency } from '../utils/formatCurrency';
import Select, { Option } from '../form/Select';
import { useUserContext } from '../../hooks/useUserContext';

type NavbarProps = {
  searchAuthor: string;
  setSearchAuthor: React.Dispatch<React.SetStateAction<string>>;
  searchPublisher: string;
  setSearchPublisher: React.Dispatch<React.SetStateAction<string>>;
};

const categories: Option[] = [
  { value: 'Todas', label: 'Todas' },
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
}: NavbarProps) => {
  const {
    filterGroup,
    setFilterGroup,
    filterPrice,
    setFilterPrice,
    filterCategories,
    setFilterCategories,
    setSort,
  } = useUserContext();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterPrice(parseInt(e.target.value));
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

          <select
            value={filterGroup}
            onChange={(e) => setFilterGroup(e.target.value)}
          >
            <option value="DEFAULT">TODOS</option>
            <option value="BRONZE">BRONZE</option>
            <option value="SILVER">SILVER</option>
            <option value="GOLD">GOLD</option>
            <option value="DIAMOND">DIAMOND</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <p>Ordenar:</p>
          <select onChange={(e) => setSort(e.target.value)}>
            <option value="Asc">Asc</option>
            <option value="Desc">Desc</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <p>Categorias:</p>

          <Select
            value={filterCategories}
            options={categories}
            onChange={setFilterCategories}
          />
        </div>

        <div className="flex flex-col gap-1">
          <p>
            Faixa de preço:{' '}
            <span className="font-semibold">
              {FormatCurrency('BRL', filterPrice)}
            </span>
          </p>

          <InputRange
            filterPrice={filterPrice}
            handlePriceChange={handlePriceChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
