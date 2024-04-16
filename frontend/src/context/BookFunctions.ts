import { useEffect, useState } from 'react';
import {
  BookContextTypes,
  BookType,
  CategoryChange,
  Status,
  TypeGroupPricing,
} from './types/types';

import { toast } from 'react-toastify';

export const useBookFunctions = (): BookContextTypes => {
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

  const [listBooks, setListBooks] = useState<BookType[]>([]);
  const [bookData, setBookData] = useState<BookType>(initialBookData);
  const [loading, setLoading] = useState(true);
  const [filterGroup, setFilterGroup] = useState('DEFAULT');
  const [filterPrice, setFilterPrice] = useState(0);
  const [filterCategories, setFilterCategories] = useState(['All']);
  const [sort, setSort] = useState('Asc');

  const addBook = (book: BookType) => {
    setListBooks([...listBooks, book]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timeout);
  }, [setLoading]);

  const handleBookSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Remover autores vazios antes de adicionar ao livro
    const newBookData = {
      ...bookData,
      author: bookData.author.filter((author) => author.trim() !== ''),
    };

    const requiredFields = [
      bookData.author,
      bookData.title,
      bookData.year,
      bookData.publisher,
      bookData.edition,
      bookData.ISBN,
      bookData.pages,
      bookData.synopsis,
      bookData.height,
      bookData.width,
      bookData.weight,
      bookData.depth,
      bookData.barCode,
    ];

    const isValid = requiredFields.every((fields) => !!fields);

    if (!isValid) {
      toast.warning('Campos nao podem ser vazios!');
      return;
    }

    // Adicionar o livro à lista de livros
    addBook(newBookData);
    toast.success('Livro adicionado!');

    setTimeout(() => {
      // Limpar o estado para um novo livro
      setBookData(initialBookData);
    }, 100);
    setLoading(false);
  };

  const updateBookById = (id: number, newData: Partial<BookType>) => {
    setListBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? { ...book, ...newData } : book))
    );
  };

  const updateBookData = (
    bookToUpdate: BookType,
    newData: Pick<BookType, 'justifyStatus' | 'categoryOfChange' | 'status'>
  ) => {
    // Atualiza somente os campos justifyStatus, status e categoryOfChange, mantendo os outros campos inalterados
    const updatedBook: BookType = {
      ...bookToUpdate,
      justifyStatus: newData.justifyStatus ?? bookToUpdate.justifyStatus,
      categoryOfChange:
        newData.categoryOfChange ?? bookToUpdate.categoryOfChange,
      status: newData.status ?? bookToUpdate.status,
    };

    if (bookData.justifyStatus === '' || !bookData.categoryOfChange) {
      toast('Campos Vazios!');
      return;
    }

    //Atualiza o estado com o livro atualizado
    const updateBooksData = listBooks.map((book) =>
      book.id === bookToUpdate.id ? updatedBook : book
    );

    //Atualiza a lista de livros com os novos dados do livro
    setListBooks(updateBooksData);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    setBookData((prevBookData) => {
      const updatedCategories = checked
        ? [...prevBookData.category, value] // Adiciona a categoria selecionada
        : prevBookData.category.filter((category) => category !== value); // Remove a categoria desmarcada

      if (updatedCategories.length === 0) {
        toast.warn('Selecione pelo menos uma categoria!');
      }

      return {
        ...prevBookData,
        category: updatedCategories,
      };
    });
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
    index: number
  ) => {
    const { value } = event.target;
    setBookData((prevBookData) => {
      const updatedAuthors = [...prevBookData.author];
      updatedAuthors[index] = value;
      return { ...prevBookData, author: updatedAuthors };
    });
  };

  const handleChangeEvents = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    fieldName: string
  ) => {
    const { value } = e.target;
    setBookData({ ...bookData, [fieldName]: value });
  };

  return {
    listBooks,
    setListBooks,
    bookData,
    setBookData,
    handleBookSubmit,
    updateBookById,
    updateBookData,
    handleAddAuthor,
    handleAuthorInputChange,
    handleCheckboxChange,
    handleChangeEvents,
    initialBookData,
    loading,
    setLoading,
    filterGroup,
    setFilterGroup,
    filterPrice,
    setFilterPrice,
    filterCategories,
    setFilterCategories,
    sort,
    setSort,
  };
};
