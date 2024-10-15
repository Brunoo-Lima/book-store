// import { ICreditCard } from './credit-card';

// export interface IAddress {
//   street: string;
//   number: string;
//   neighborhood: string;
//   city: string;
//   state: string;
//   zipCode: string;
//   publicPlace: string;
//   country: string;
//   observation?: string;
// }

// export interface IAddressBilling extends IAddress {
//   id: number;
// }

// export interface IAddressDelivery extends IAddress {
//   id: number;
//   identifier: string;
// }

// export interface IClient {
//   id: number;
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   dateOfBirth: string;
//   cpf: string;
//   typePhone: string;
//   phone: string;
//   ranking: number;
//   gender: string;
//   status: 'active' | 'inactive' | string;
//   address: IAddress;
//   addressDelivery: IAddressDelivery[];
//   addressBilling: IAddressBilling[];
//   creditCard: ICreditCard[];
// }

export interface IClient {
  id: string;
  phones: Phone[];
  profilePurchase: string;
  name: string;
  dateOfBirth: string;
  email: string;
  cpf: string;
  gender: string;
  password: string;
  confirmPassword: string;
  addresses: Address[];
  creditCart: CreditCart[];
}

export interface Phone {
  ddd: string;
  number: string;
  typePhone: string;
}

export interface Address {
  streetName: string;
  publicPlace: string;
  nameAddress: string;
  number: string;
  cep: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  compostName: string;
  typeResidence: string;
  change: boolean;
  delivery: boolean;
}

export interface CreditCart {
  namePrinted: string;
  number: string;
  cvv: number;
  dateValid: string;
  flag: string;
  preference: boolean;
}
