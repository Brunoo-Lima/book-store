import { ReactNode, createContext, useState } from 'react';

enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

enum CategoryChange {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  UNAVAILABLE = 'UNAVAILABLE',
}

enum TypeGroupPricing {
  DEFAULT = 'DEFAULT',
  BRONZE = 'BRONZE',
  SILVER = 'SILVER',
  OURO = 'OURO',
  DIAMOND = 'DIAMOND',
}

export type BookType = {
  id: number;
  code: string;
  author: string[];
  title: string;
  pages: string;
  year: string;
  category: string[];
  publisher: string;
  edition: string;
  value: string;
  synopsis: string;
  ISBN: string;
  barCode: string;
  height: string;
  depth: string;
  width: string;
  weight: string;
  groupPricing: TypeGroupPricing;

  status: Status;
  justifyStatus: string;
  categoryOfChange: CategoryChange;
};

export type UserType = {
  id: number;
  name: string;
};

type UserContextType = {
  listBooks: BookType[];
  setListBooks: React.Dispatch<React.SetStateAction<BookType[]>>;
  bookData: BookType;
  setBookData: React.Dispatch<React.SetStateAction<BookType>>;

  addBook: (book: BookType) => void;

  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => void;

  handleTextareaChange: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: string,
  ) => void;

  handleSelectChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
    fieldName: string,
  ) => void;

  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  updateBook: (id: number, newData: Partial<BookType>) => void;

  handleAddAuthor: () => void;
  handleAuthorInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => void;

  listUsers: UserType[];
  setListUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  userData: UserType;
  setUserData: React.Dispatch<React.SetStateAction<UserType>>;

  handleInputChangeUser: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => void;
  handleSubmitUser: (event: React.FormEvent<HTMLFormElement>) => void;

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
  const initialBookData: BookType = {
    id: Math.floor(Math.random() * 10000),
    code: '',
    author: [''],
    title: '',
    category: [],
    year: '',
    publisher: '',
    edition: '',
    ISBN: '',
    pages: '',
    value: '',
    synopsis: '',
    height: '',
    width: '',
    depth: '',
    weight: '',
    barCode: '',
    groupPricing: TypeGroupPricing.DEFAULT,
    status: Status.ACTIVE,
    justifyStatus: '',
    categoryOfChange: CategoryChange.IN_STOCK,
  };

  const initialUserData: UserType = {
    id: 1,
    name: '',
  };

  const [listBooks, setListBooks] = useState<BookType[]>([]);
  const [bookData, setBookData] = useState<BookType>(initialBookData);

  const [listUsers, setListUsers] = useState<UserType[]>([]);
  const [userData, setUserData] = useState<UserType>(initialUserData);

  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Asc');

  //métodos do livro
  const addBook = (book: BookType) => {
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
      setBookData(initialBookData);
    }, 1000);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setBookData({ ...bookData, [fieldName]: value });
  };

  const updateBook = (id: number, newData: Partial<BookType>) => {
    setListBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, ...newData } : book,
      ),
    );
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setBookData(() => {
      if (bookData === null) {
        return bookData;
      }
      return { ...bookData, [fieldName]: value };
    });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setBookData({ ...bookData, [fieldName]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isChecked = bookData.category.includes(value);

    if (isChecked === true) {
      return alert('Escolha uma categoria');
    }

    setBookData((prevBookData) => ({
      ...prevBookData,
      category: isChecked
        ? prevBookData.category.filter((category) => category !== value)
        : [...prevBookData.category, value],
    }));
  };

  //metodos para autor
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

  //metodos para usuario
  const handleInputChangeUser = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string,
  ) => {
    const { value } = event.target;
    setUserData({ ...userData, [fieldName]: value });
  };

  const addUser = (user: UserType) => {
    if (!user.name || user.name === '') alert('Preencha o nome para continuar');
    setListUsers([...listUsers, user]);
  };

  const handleSubmitUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newUserData = { ...userData };

    addUser(newUserData);
    setTimeout(() => {
      setUserData(initialUserData);
    }, 3000);
  };

  const contextValue = {
    listBooks,
    setListBooks,
    listUsers,
    setListUsers,
    addBook,
    bookData,
    setBookData,
    userData,
    setUserData,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
    handleSubmitUser,
    handleAddAuthor,
    handleAuthorInputChange,
    filter,
    setFilter,
    sort,
    setSort,
    handleInputChangeUser,
    handleTextareaChange,
    handleSelectChange,
    updateBook,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
