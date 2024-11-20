export interface IProductList {
  products: IProduct[];
}

export interface IProduct {
  pro_id: string;
  pro_name: string;
  pro_quantity: number;
  pro_price: number;
}

export interface IProductDTO {
  product_id: string;
  name: string;
  quantity: number;
  product_price: number;
}
