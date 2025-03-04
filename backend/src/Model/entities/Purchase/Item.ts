import { EntityDomain } from "../EntityDomain";
import { Product } from "./Product";

export class Item extends EntityDomain{
    constructor(
        private _quantity: number,
        private _product: Product,
        private _product_price: number

    ){
        super()
    }
    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(quantity: number) {
        this._quantity = quantity;
    }

    public get product(): Product {
        return this._product;
    }

    public set product(product: Product) {
        this._product = product;
    }

    public get product_price(): number {
        return this._product_price;
    }

    public set product_price(product_price: number) {
        this._product_price = product_price;
    }
}
