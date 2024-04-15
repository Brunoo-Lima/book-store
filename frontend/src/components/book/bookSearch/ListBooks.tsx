import Book from './Book';
import Loading from './../../utils/Loading';
import { useUserContext } from '../../../hooks/useUserContext';

type ListBooksProps = {
  searchBook: string;
  searchAuthor: string;
  searchPublisher: string;
};

const ListBooks = ({
  searchBook,
  searchAuthor,
  searchPublisher,
}: ListBooksProps) => {
  const { loading, listBooks, sort, filterCategories } = useUserContext();

  const filteredBooks = listBooks.filter((book) => {
    const searchBooks = book.title
      .toLowerCase()
      .includes(searchBook.toLowerCase());

    const searchPublishers = book.publisher
      .toLowerCase()
      .includes(searchPublisher.toLowerCase());

    const searchFilterCategories =
      filterCategories.includes('All') ||
      filterCategories.some((category) => book.category.includes(category));

    return searchBooks && searchPublishers && searchFilterCategories;
  });

  const sortedBooks = filteredBooks.sort((a, b) =>
    sort === 'Asc'
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title)
  );

  return (
    <div className="flex flex-col justify-center items-center p-6 w-[800px] h-[590px] m-auto">
      <h2 className="text-2xl font-semibold mb-2">Livros</h2>
      <ul className="h-full overflow-y-auto">
        {loading ? (
          <Loading />
        ) : (
          <div>
            {sortedBooks.length <= 0 ? (
              <div className="mt-20">
                <p className="font-semibold">Não há livros</p>
              </div>
            ) : (
              sortedBooks.map((props) => <Book key={props.id} {...props} />)
            )}
          </div>
        )}
      </ul>
    </div>
  );
};

export default ListBooks;
