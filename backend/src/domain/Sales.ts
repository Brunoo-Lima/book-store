import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";
import { Item } from "./Item";

export class Sales extends EntityDomain {
    constructor(
        private _client: Client,
        private _item: Item[]
    ){
        super()
    }
}
