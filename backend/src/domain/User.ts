import { EntityDomain } from "./EntityDomain";

export class User extends EntityDomain{
    constructor(
        private _name: string
    ){
        super()
    }

    public get name() : string {
        return this._name
    }
}
