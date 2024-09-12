import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";

export class Classification extends EntityDomain {
    constructor(
        private _client: Client
    ){
        super()
    }
}
