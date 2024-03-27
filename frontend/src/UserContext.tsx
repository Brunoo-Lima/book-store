import { ReactNode, createContext, useState } from 'react';

export type UserBooksTypes = {
  id: number;
  author: string;
  title: string;
  TotalPage: number;
  year: number;
  category: string[];
  publishing: string;
  edition: string;
  value: number;
  synopsis: string;
  ISBN: string;
  barCode: number;
  height: number;
  depth: number;
  width: number;
  weight: number;
};

type UserContextType = {
  listBooks: UserBooksTypes[] | [];
  setListBooks: React.Dispatch<React.SetStateAction<UserBooksTypes[] | []>>;
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
  const [listBooks, setListBooks] = useState<UserBooksTypes[] | []>([
    {
      id: 1,
      author: 'Martin',
      title: 'Game of Thrones',
      TotalPage: 300,
      year: 2005,
      category: ['Ação', 'Romance'],
      publishing: 'Editora',
      edition: '2ª',
      value: 150,
      synopsis:
        'era uma vez................................................................',
      ISBN: '954',
      barCode: 54955887454655,
      height: 1.5,
      depth: 2.0,
      width: 125,
      weight: 100,
    },
  ]);
  const [filter, setFilter] = useState('All');
  const [sort, setSort] = useState('Asc');

  const contextValue = {
    listBooks,
    setListBooks,
    filter,
    setFilter,
    sort,
    setSort,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
