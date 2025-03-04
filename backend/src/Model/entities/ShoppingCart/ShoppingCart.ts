
import { Item } from "../Purchase/Item";
import { EntityDomain } from "./../EntityDomain";

export interface CartItems{
    product: Item,
    quantity: number
}


export class ShoppingCart extends EntityDomain{
    private cart: CartItems[] = []
    constructor(){
        super()
    }


    public get items() : Array<CartItems> {
        return this.cart
    }
    public set items(items : Array<CartItems>) {
        this.cart = items;
    }
}
