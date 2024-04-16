import { ReactNode } from 'react';

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum CategoryChange {
  IN_STOCK = 'IN_STOCK',
  OUT_OF_STOCK = 'OUT_OF_STOCK',
  UNAVAILABLE = 'UNAVAILABLE',
}

export enum TypeGroupPricing {
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

export type BookContextTypes = {
  listBooks: BookType[];
  setListBooks: React.Dispatch<React.SetStateAction<BookType[]>>;
  bookData: BookType;
  setBookData: React.Dispatch<React.SetStateAction<BookType>>;

  initialBookData: BookType;

  handleChangeEvents: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    fieldName: string
  ) => void;

  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBookSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  updateBookById: (id: number, newData: Partial<BookType>) => void;
  updateBookData: (
    bookToUpdate: BookType,
    newData: Pick<BookType, 'justifyStatus' | 'categoryOfChange' | 'status'>
  ) => void;

  handleAddAuthor: () => void;
  handleAuthorInputChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => void;

  filterGroup: string;
  setFilterGroup: React.Dispatch<React.SetStateAction<string>>;

  filterPrice: number;
  setFilterPrice: React.Dispatch<React.SetStateAction<number>>;

  filterCategories: string[];
  setFilterCategories: React.Dispatch<React.SetStateAction<string[]>>;

  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;

  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserContextTypes = {
  listUsers: UserType[];
  setListUsers: React.Dispatch<React.SetStateAction<UserType[]>>;
  userData: UserType;
  setUserData: React.Dispatch<React.SetStateAction<UserType>>;

  handleInputChangeUser: (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => void;
  handleSubmitUser: (event: React.FormEvent<HTMLFormElement>) => void;
};

export type ContextProps = {
  children: ReactNode;
};
