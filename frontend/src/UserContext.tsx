import { ReactNode, createContext, useState } from 'react';

type UserContextType = {
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
  const [listBooks, setListBooks] = useState();
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
