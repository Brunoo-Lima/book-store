import { EntityDomain } from "./EntityDomain";
import { Flag } from "./Flag";
import { StatusPayment } from "./types/StatusPayment";

export class CreditCart extends EntityDomain{
    constructor(
        private _namePrinted:string,
        private _cvv:string,
        private _dateValid: Date,
        private _flag: Flag,
        private _status: StatusPayment,
        private _preference: boolean
    ){
        super()
    }
}
