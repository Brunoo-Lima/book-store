import { createContext } from 'react';
import {
  BookContextTypes,
  ContextProps,
  UserContextTypes,
} from './types/types';
import { useUserFunctions } from './UserFunctions';
import { useBookFunctions } from './BookFunctions';

type ContextType = BookContextTypes & UserContextTypes;

export const UserContext = createContext<ContextType | undefined>(undefined);

export const UserProvider: React.FC<ContextProps> = ({ children }) => {
  const userFunctions = useUserFunctions();
  const bookFunctions = useBookFunctions();

  const contextValue: ContextType = {
    ...userFunctions,
    ...bookFunctions,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
