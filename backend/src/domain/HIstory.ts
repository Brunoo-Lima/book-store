import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";
import { Sales } from "./Sales";

export class History extends EntityDomain {
    constructor(
        private _client: Client,
        private _sales: Sales[]
    ){
        super()
    }
}
