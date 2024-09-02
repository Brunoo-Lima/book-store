import { EntityDomain } from "./EntityDomain";
import { TypePhone } from "./types/TypePhone";

export class Phone extends EntityDomain{
    constructor(
        private _ddd: number,
        private _number: number,
        private _typePhone: TypePhone
    ){
        super()
    }
}
