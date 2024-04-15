import Book from './Book';
import Loading from './../../utils/Loading';
import { useUserContext } from '../../../hooks/useUserContext';

type ListBooksProps = {
  search: string;
  searchAuthor: string;
  searchPublisher: string;
};

const ListBooks = ({
  search,
  searchAuthor,
  searchPublisher,
}: ListBooksProps) => {
  const { loading, listBooks, sort, filterCategories } = useUserContext();

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
                  book.title.toLowerCase().includes(search.toLowerCase())
                )
                .filter((book) =>
                  book.publisher
                    .toLowerCase()
                    .includes(searchPublisher.toLowerCase())
                )
                .filter(
                  (book) =>
                    filterCategories.includes('All') ||
                    filterCategories.some((cat) => book.category.includes(cat))
                )
                .sort((a, b) =>
                  sort === 'Asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title)
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
