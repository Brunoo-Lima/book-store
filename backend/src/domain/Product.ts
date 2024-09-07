import { EntityDomain } from "./EntityDomain";

export class Product extends EntityDomain{
    constructor(
        private _name: string,
        private _price: number,
        private _quantity: number,
    ){
        super()
    }
}
