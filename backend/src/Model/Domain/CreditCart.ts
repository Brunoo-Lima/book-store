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
    public get namePrinted(): string {
        return this._namePrinted;
    }

    public set namePrinted(namePrinted: string) {
        this._namePrinted = namePrinted;
    }

    public get cvv(): string {
        return this._cvv;
    }

    public set cvv(cvv: string) {
        this._cvv = cvv;
    }

    public get dateValid(): Date{
        return this._dateValid;
    }

    public set dateValid(dateValid: Date,) {
        this._dateValid = dateValid;
    }

    public get flag(): Flag{
        return this._flag;
    }

    public set flag(flag: Flag,) {
        this._flag = flag;
    }

    public get status(): StatusPayment{
        return this._status;
    }

    public set status(status: StatusPayment,) {
        this._status = status;
    }

    public get preference(): boolean {
        return this._preference;
    }

    public set preference(preference: boolean) {
        this._preference = preference;
    }

}
