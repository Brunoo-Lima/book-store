import { EntityDomain } from "./EntityDomain";
import { Product } from "./Product";

export class Item extends EntityDomain{
    constructor(
        private _quantity: number,
        private _product: Product
    ){
        super()
    }
}
