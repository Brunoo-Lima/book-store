import Book from './Book';
import { BookType } from '../../../context/types/types';
import Loading from './../../utils/Loading';
import { useUserContext } from '../../../hooks/useUserContext';

type ListBooksProps = {
  listBooks: BookType[];

  search: string;
  searchPublisher: string;
  sort: string;
};

const ListBooks = ({
  listBooks,
  search,
  searchPublisher,
  sort,
}: ListBooksProps) => {
  const { loading } = useUserContext();

  return (
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
                  book.title.toLowerCase().includes(search.toLowerCase()),
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

                .map((props) => <Book key={props.id} {...props} />)
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default ListBooks;
