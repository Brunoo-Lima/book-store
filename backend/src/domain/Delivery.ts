import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";

export class Delivery extends EntityDomain{
    constructor(
        private _client: Client,
        private _date: Date
    ){
        super()
    }
}
