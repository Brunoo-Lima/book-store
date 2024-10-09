import { ICreditCard } from './credit-card';

export interface IAddress {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  publicPlace: string;
  country: string;
  observation?: string;
}

export interface IAddressBilling extends IAddress {
  id: number;
}

export interface IAddressDelivery extends IAddress {
  id: number;
  identifier: string;
}

export interface IClient {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  dateOfBirth: string;
  cpf: string;
  typePhone: string;
  phone: string;
  ranking: number;
  gender: string;
  status: 'active' | 'inactive' | string;
  address: IAddress;
  addressDelivery: IAddressDelivery[];
  addressBilling: IAddressBilling[];
  creditCard: ICreditCard[];
}
