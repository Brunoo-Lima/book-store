import { EntityDomain } from "./EntityDomain";

export class City extends EntityDomain{
    constructor(private _name: string){
        super()
    }

    public get nameIs() : string {
        return this._name
    }
    public set nameIs(name: string){
        this._name = name
    }
}
