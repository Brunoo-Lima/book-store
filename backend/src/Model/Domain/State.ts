import { EntityDomain } from "./EntityDomain";

export class State extends EntityDomain{
    constructor(
        private _name: string,
        private _uf: string

    ){
        super()
    }
    public getName(): string {
        return this._name;
    }

    public setName(name: string): void {
        this._name = name;
    }

    public getUf(): string {
        return this._uf;
    }

    public setUf(uf: string): void {
        this._uf = uf;
    }
}
