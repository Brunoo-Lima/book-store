import React from 'react';
import Input from '../../form/Input';
import { Link } from 'react-router-dom';

type SearchProps = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

const Search = ({ search, setSearch }: SearchProps) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <h2 className="text-2xl text-center font-semibold mb-1">Pesquisa</h2>
      <Input
        type="text"
        placeholder="Digite o nome do livro"
        width={300}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Link
        to={'/'}
        className=" px-4 py-2.5 bg-red-500 hover:bg-red-700 transition duration-300 rounded-lg"
      >
        <p className="text-md font-semibold text-white uppercase">Voltar</p>
      </Link>
    </div>
  );
};

export default Search;
