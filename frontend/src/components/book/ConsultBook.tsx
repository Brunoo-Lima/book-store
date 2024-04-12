import Navbar from './Navbar';
import { useState } from 'react';
import Search from './bookSearch/Search';
import ListBooks from './bookSearch/ListBooks';
import { useUserContext } from '../../hooks/useUserContext';

const ConsultBook = () => {
  const { filter, setFilter, sort, setSort, listBooks } = useUserContext();

  const [search, setSearch] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchPublisher, setSearchPublisher] = useState('');

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-semibold mb-4">Consulta de Livro</h1>

      <div className="border-2 border-gray-300 w-[1200px] h-[650px] rounded-md bg-[#f1efef] overflow-hidden">
        <div className="grid grid-cols-divisor">
          <Navbar
            searchAuthor={searchAuthor}
            setSearchAuthor={setSearchAuthor}
            setSort={setSort}
            filter={filter}
            setFilter={setFilter}
            searchPublisher={searchPublisher}
            setSearchPublisher={setSearchPublisher}
          />
          <div className="p-6">
            <Search search={search} setSearch={setSearch} />

            <ListBooks
              listBooks={listBooks}
              search={search}
              searchPublisher={searchPublisher}
              sort={sort}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultBook;
