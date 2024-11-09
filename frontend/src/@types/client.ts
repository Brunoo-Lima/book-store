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
  creditCard?: CreditCard[];
  log?: ILog[];
  score?: number;
  ranking?: number;
  status?: string;
  created_at?: string;
}

export interface Phone {
  ddd: string;
  number: string;
  typePhone: string;
}

export interface Address {
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
