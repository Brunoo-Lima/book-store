import React, { useContext, useState } from 'react';
import Filter from '../form/Filter';
import { UserContext } from '../../UserContext';
import Input from '../form/Input';
import InputRange from '../form/InputRange';
import { FormatCurrency } from '../utils/formatCurrency';

type NavbarProps = {
  searchAuthor: string;
  setSearchAuthor: React.Dispatch<React.SetStateAction<string>>;

  searchPublisher: string;
  setSearchPublisher: React.Dispatch<React.SetStateAction<string>>;

  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;

  setSort: React.Dispatch<React.SetStateAction<string>>;
};

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

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-2 border-2 border-gray-200 rounded-md outline-none focus:border-emerald-300"
          >
            <option value="All">Todas</option>
            <option value="bronze">Bronze</option>
            <option value="silver">Prata</option>
            <option value="gold">Ouro</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <p>Ordenar:</p>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="px-2 border-2 border-gray-200 rounded-md outline-none focus:border-emerald-300"
          >
            <option value="Asc">Asc</option>
            <option value="Desc">Desc</option>
          </select>
        </div>

        <div className="flex items-center gap-1">
          <p>Categorias:</p>
          <select
            onChange={(e) => setSort(e.target.value)}
            className="px-2 border-2 border-gray-200 rounded-md outline-none focus:border-emerald-300"
          >
            <option value="All">Todas</option>
            <option value="Biografia/Autobiografia">
              Biografia/Autobiografia
            </option>
            <option value="Ensaio">Ensaio</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="Ficção Histórica">Ficção Histórica</option>
            <option value="Horror">Horror</option>
            <option value="Literatura Clássica">Literatura Clássica</option>
            <option value="Mistério/Thriller">Mistério/Thriller</option>
            <option value="Literatura Clássica">Literatura Clássica</option>
            <option value="Poesia">Poesia</option>
            <option value="Romance">Romance</option>
            <option value="Outros">Outros</option>
          </select>
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
