import { EntityDomain } from "./EntityDomain";

export class Country extends EntityDomain {
    constructor (
        private _name: string
    ){
        super()
    }
}
