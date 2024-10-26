'use client';

import { ISelect } from '@/@types/select';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface IFilterContextProps {
  isSearching: boolean;
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
  selectedStatus: ISelect | null;
  setSelectedStatus: React.Dispatch<React.SetStateAction<ISelect | null>>;
  selectedState: ISelect | null;
  setSelectedState: React.Dispatch<React.SetStateAction<ISelect | null>>;
  selectedCity: ISelect | null;
  setSelectedCity: React.Dispatch<React.SetStateAction<ISelect | null>>;
  searchName: string;
  setSearchName: React.Dispatch<React.SetStateAction<string>>;
}

interface FilterProviderProps {
  children: ReactNode;
}

export const FilterContext = createContext<IFilterContextProps>(
  {} as IFilterContextProps
);

export const FilterProvider = ({ children }: FilterProviderProps) => {
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<ISelect | null>(null);
  const [selectedState, setSelectedState] = useState<ISelect | null>(null);
  const [selectedCity, setSelectedCity] = useState<ISelect | null>(null);
  const [searchName, setSearchName] = useState<string>('');

  const contextValue = useMemo(
    () => ({
      selectedStatus,
      setSelectedStatus,
      isSearching,
      setIsSearching,
      selectedState,
      setSelectedState,
      searchName,
      setSearchName,
      selectedCity,
      setSelectedCity,
    }),
    [
      selectedStatus,
      setSelectedStatus,
      isSearching,
      setIsSearching,
      selectedState,
      setSelectedState,
      searchName,
      setSearchName,
      selectedCity,
      setSelectedCity,
    ]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
