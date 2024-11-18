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
  selectedGender: ISelect | null;
  setSelectedGender: React.Dispatch<React.SetStateAction<ISelect | null>>;
  selectedProfilePurchase: ISelect | null;
  setSelectedProfilePurchase: React.Dispatch<
    React.SetStateAction<ISelect | null>
  >;
  selectedDDD: string | null;
  setSelectedDDD: React.Dispatch<React.SetStateAction<string | null>>;
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
  const [selectedGender, setSelectedGender] = useState<ISelect | null>(null);
  const [selectedProfilePurchase, setSelectedProfilePurchase] =
    useState<ISelect | null>(null);
  const [selectedDDD, setSelectedDDD] = useState<string | null>(null);

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
      selectedGender,
      setSelectedGender,
      selectedProfilePurchase,
      setSelectedProfilePurchase,
      selectedDDD,
      setSelectedDDD,
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
      selectedGender,
      setSelectedGender,
      selectedProfilePurchase,
      setSelectedProfilePurchase,
      selectedDDD,
      setSelectedDDD,
    ]
  );

  return (
    <FilterContext.Provider value={contextValue}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => useContext(FilterContext);
