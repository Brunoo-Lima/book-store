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
  creditCard: CreditCard[];
  log?: ILog[];
  score?: number;
  sales?: Sales[] | [];
  ranking?: number;
  statusClient?: string;
  created_at?: string;
}

export interface Phone {
  id?: string;
  ddd: string;
  number: string;
  typePhone: string;
  numberCombine?: string;
}

export interface Address {
  id?: string;
  streetName: string;
  nameAddress: string;
  publicPlace: string;
  number: string;
  cep: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  compostName?: string;
  typeResidence: string;
  change?: boolean;
  delivery?: boolean;
}

export interface CreditCard {
  id?: string;
  namePrinted: string;
  number: string;
  cvv: string;
  dateValid: string;
  flag: string;
  preference?: boolean;
}

export interface ILog {
  action?: string;
  created?: string;
  updated?: string;
  user?: string;
}

interface Sales {
  id?: string;
  date_sale: string;
  date_update: string;
  status: string;
}
