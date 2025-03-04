import { EntityDomain } from "../EntityDomain"

export abstract class Product extends EntityDomain{
    constructor(
        private _price: number,
        private _quantity: number,

    ){
        super()
    }

    public get price(): number {
        return this._price;
    }

    public set price(price: number) {
        this._price = price;
    }

    public get quantity(): number {
        return this._quantity;
    }

    public set quantity(quantity: number) {
        this._quantity = quantity;
    }
}
