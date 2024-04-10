import { ReactNode, createContext, useState } from 'react';

export type UserBooksTypes = {
  id: number;
  author: string[];
  title: string;
  totalPage: string;
  year: string;
  category: string[];
  publishing: string;
  edition: string;
  value: string;
  synopsis: string;
  ISBN: string;
  barCode: string;
  height: string;
  depth: string;
  width: string;
  weight: string;
};

type UserContextType = {
  listBooks: UserBooksTypes[];
  setListBooks: React.Dispatch<React.SetStateAction<UserBooksTypes[]>>;

  addBook: (book: UserBooksTypes) => void;

  bookData: UserBooksTypes;
  setBookData: React.Dispatch<React.SetStateAction<UserBooksTypes>>;

  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;

  handleAddAuthor: () => void;
  handleAuthorInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;

  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;

  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
};

type UserContextProps = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [listBooks, setListBooks] = useState<UserBooksTypes[]>([]);
  const [bookData, setBookData] = useState<UserBooksTypes>({
    id: 1,
    author: [''],
    title: '',
    category: [],
    year: '',
    publishing: '',
    edition: '',
    ISBN: '',
    totalPage: '',
    value: '',
    synopsis: '',
    height: '',
    width: '',
    depth: '',
    weight: '',
    barCode: '',
  });

  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Asc');

  console.log('Dados fornecidos pelo UserProvider:', listBooks);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setBookData({ ...bookData, [fieldName]: value });
  };

  const handleAddAuthor = () => {
    setBookData({
      ...bookData,
      author: [...bookData.author, ''],
    });
  };

  const handleAuthorInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { value } = event.target;
    setBookData((prevBookData) => {
      const updatedAuthors = [...prevBookData.author];
      updatedAuthors[index] = value;
      return { ...prevBookData, author: updatedAuthors };
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isChecked = bookData.category.includes(value);

    setBookData((prevBookData) => ({
      ...prevBookData,
      category: isChecked
        ? prevBookData.category.filter((category) => category !== value)
        : [...prevBookData.category, value],
    }));
  };

  const addBook = (book: UserBooksTypes) => {
    console.log('novo livro added', book);
    setListBooks([...listBooks, book]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Remover autores vazios antes de adicionar ao livro
    const newBookData = {
      ...bookData,
      author: bookData.author.filter((author) => author.trim() !== ''),
    };

    // Adicionar o livro à lista de livros
    addBook(newBookData);

    setTimeout(() => {
      // Limpar o estado para um novo livro
      setBookData({
        id: Math.floor(Math.random() * 1000),
        author: [''], // Começa com um autor vazio
        title: '',
        category: [],
        year: '',
        publishing: '',
        edition: '',
        ISBN: '',
        totalPage: '',
        value: '',
        synopsis: '',
        height: '',
        width: '',
        depth: '',
        weight: '',
        barCode: '',
      });
    }, 1000),
      console.log(newBookData);
  };

  const contextValue = {
    listBooks,
    setListBooks,
    bookData,
    setBookData,
    addBook,
    handleInputChange,
    handleSubmit,
    filter,
    setFilter,
    sort,
    setSort,
    handleCheckboxChange,
    handleAddAuthor,
    handleAuthorInputChange,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
