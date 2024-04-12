import { useState } from 'react';
import { UserContextTypes, UserType } from './types/types';

export const useUserFunctions = (): UserContextTypes => {
  const initialUserData: UserType = {
    id: Math.floor(Math.random() * 10000),
    name: '',
  };

  const [listUsers, setListUsers] = useState<UserType[]>([]);
  const [userData, setUserData] = useState<UserType>(initialUserData);

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

  return {
    listUsers,
    setListUsers,
    userData,
    setUserData,
    handleInputChangeUser,
    handleSubmitUser,
  };
};
