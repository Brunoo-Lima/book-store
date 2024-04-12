import Input from '../form/Input';
import Navbar from './Navbar';
import Books from './Books';
import Loading from '../utils/Loading';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../hooks/useUserContext';
import { useState } from 'react';

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
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl text-center font-semibold mb-1">
                Pesquisa
              </h2>
              <Input
                type="text"
                placeholder="Digite o nome do livro"
                width={300}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <Link
                to={'/'}
                className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-700 transition duration-300 rounded-lg"
              >
                <p className="text-md font-semibold text-white">Voltar</p>
              </Link>
            </div>

            <div className="flex flex-col justify-center items-center p-6 w-[800px] h-[590px] m-auto">
              <h2 className="text-2xl font-semibold mb-2">Livros</h2>
              <ul className="h-full overflow-y-auto">
                {loading ? (
                  <Loading />
                ) : (
                  <div>
                    {listBooks.length <= 0 ? (
                      <div className="mt-20">
                        <p className="font-semibold">Não há livros</p>
                      </div>
                    ) : (
                      listBooks
                        .filter((book) =>
                          book.title
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                        )
                        .filter((book) =>
                          book.publisher
                            .toLowerCase()
                            .includes(searchPublisher.toLowerCase()),
                        )
                        .sort((a, b) =>
                          sort === 'Asc'
                            ? a.title.localeCompare(b.title)
                            : b.title.localeCompare(a.title),
                        )

                        .map((props) => <Books key={props.id} {...props} />)
                    )}
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultBook;
