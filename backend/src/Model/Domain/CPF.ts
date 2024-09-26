import { EntityDomain } from "./EntityDomain";

export class CPF extends EntityDomain{
    constructor(private _code: string){
        super()
    }

    public get code() : string {
        return this._code;
    }
}

