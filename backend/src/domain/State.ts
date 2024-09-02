import { Country } from "./Country";
import { EntityDomain } from "./EntityDomain";

export class State extends EntityDomain{
    constructor(
        private _name: string,
        private _uf: string,
        private _country: Country

    ) {
        super()
    }
}
