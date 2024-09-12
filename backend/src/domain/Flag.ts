import { EntityDomain } from "./EntityDomain";

export class Flag extends EntityDomain{
    constructor(
        private _name: string
    ){
        super()
    }
}
