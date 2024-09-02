import { EntityDomain } from "./EntityDomain";
import { State } from "./State";

export class City extends EntityDomain{
    constructor(
        private _name: string,
        private _state: State,
    ){
        super()
    }
}
