import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";

export class LogChange extends EntityDomain{
    constructor(
        private _user: Client
    ){
        super()
    }
}
