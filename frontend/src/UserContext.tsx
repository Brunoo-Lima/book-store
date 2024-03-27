import { ReactNode, createContext, useEffect, useState } from 'react';

export type UserBooksTypes = {
  id: number;
  author: string;
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
  // handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
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
    author: '',
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

  // const [filter, setFilter] = useState('All');
  // const [sort, setSort] = useState('Asc');

  const addBook = (book: UserBooksTypes) => {
    setListBooks([...listBooks, book]);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setBookData({ ...bookData, [fieldName]: value });
  };

  useEffect(() => {}, [bookData]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addBook(bookData);

    setBookData({
      id: Math.floor(Math.random() * 1000),
      author: '',
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
  };

  const contextValue = {
    listBooks,
    setListBooks,
    bookData,
    setBookData,
    addBook,
    handleInputChange,
    handleSubmit,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
