import { EntityDomain } from "./EntityDomain"
export class Product extends EntityDomain{
    constructor(
        private _name: string,
        private _price: number,
        private _quantity: number,

    ){
        super()
    }
    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
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
