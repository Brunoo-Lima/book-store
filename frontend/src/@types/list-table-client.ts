export interface IClientList {
  clients: Client[];
}

export interface Client {
  cli_cpf: string;
  cli_id: string;
  cli_creditCards: CliCreditCard[];
  cli_dateOfBirth: string;
  cli_gender: string;
  cli_phone: CliPhone[];
  cli_email: string;
  cli_profilePurchase: string;
  cli_ranking: number;
  cli_name: string;
  cli_score: number;
  cli_status: string;
  cli_address: CliAddress[];
  cli_password: string;
  cli_log: CliLog[];
  cli_sales?: CliSales[] | [];
  created_at?: string;
}

export interface CliPhone {
  pho_id: string;
  pho_ddd: string;
  pho_number: string;
  pho_numberCombine?: string;
  pho_type_phone: string;
  fk_pho_cli_id?: string;
  created_at?: string;
  updated_at?: string;
}

export interface CliLog {
  log_id: string;
  log_action: string;
  created_at?: string;
  updated_at?: string;
  fk_log_cli_id?: string;
  fk_log_use_id?: string;
}

export interface CliAddress {
  add_id: string;
  add_name: string;
  add_streetName: string;
  add_publicPlace: string;
  add_number: string;
  add_cep: string;
  add_neighborhood: string;
  add_compostName: string;
  add_typeResidence: string;
  add_city: string;
  add_state: string;
  add_isBilling: boolean;
  add_isDelivery: boolean;
  fk_add_cli_id?: string;
  created_at?: string;
  updated_at?: string;
}

interface CliCreditCard {
  cre_id: string;
  cre_name: string;
  cre_number_cart: string;
  cre_cvv: string;
  cre_dateMaturity: string;
  cre_flag: string;
  cre_preference?: boolean;
  created_at?: string;
  updated_at?: string;
}

interface CliSales {
  sal_id: string;
  sal_date_sale: string;
  sal_date_update: string;
  sal_status: string;
  fk_sal_cli_id?: string;
}
