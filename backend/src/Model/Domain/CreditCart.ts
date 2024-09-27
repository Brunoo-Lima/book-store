import { EntityDomain } from "./EntityDomain";
import { Flag } from "./Flag";
import { StatusPayment } from "./types/StatusPayment";

export interface CreditCartProps {
    _namePrinted:string,
    _cvv:string,
    _dateValid: Date,
    _flag: Flag,
    _status: StatusPayment,
    _preference: boolean
}

export class CreditCart extends EntityDomain{
    constructor(
        private creditCartProps: CreditCartProps

    ){
        super()
    }
    public get namePrinted(): string {
        return this.creditCartProps._namePrinted;
    }

    public set namePrinted(namePrinted: string) {
        this.creditCartProps._namePrinted = namePrinted;
    }

    public get cvv(): string {
        return this.creditCartProps._cvv;
    }

    public set cvv(cvv: string) {
        this.creditCartProps._cvv = cvv;
    }

    public get dateValid(): Date{
        return this.creditCartProps._dateValid;
    }

    public set dateValid(dateValid: Date,) {
        this.creditCartProps._dateValid = dateValid;
    }

    public get flag(): Flag{
        return this.creditCartProps._flag;
    }

    public set flag(flag: Flag,) {
        this.creditCartProps._flag = flag;
    }

    public get status(): StatusPayment{
        return this.creditCartProps._status;
    }

    public set status(status: StatusPayment,) {
        this.creditCartProps._status = status;
    }

    public get preference(): boolean {
        return this.creditCartProps._preference;
    }

    public set preference(preference: boolean) {
        this.creditCartProps._preference = preference;
    }

}