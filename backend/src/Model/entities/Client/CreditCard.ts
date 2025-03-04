import { EntityDomain } from "../EntityDomain";

export interface CreditCartProps {
    _namePrinted: string;
    _number: string;
    _cvv: string;
    _dateValid: string;
    _flag: string;
    _preference: boolean;
}

export class CreditCard extends EntityDomain {
    constructor(
        private creditCartProps: CreditCartProps,
        public isNew?: boolean
    ) {
        super();
    }

    public get number(): string {
        return this.creditCartProps._number;
    }

    public set number(number: string) {
        this.creditCartProps._number = number;
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

    public get dateValid(): string {
        return this.creditCartProps._dateValid;
    }

    public set dateValid(dateValid: string) {
        this.creditCartProps._dateValid = dateValid;
    }

    public get flag(): string {
        return this.creditCartProps._flag;
    }

    public set flag(flag: string) {
        this.creditCartProps._flag = flag;
    }

    public get preference(): boolean {
        return this.creditCartProps._preference;
    }

    public set preference(preference: boolean) {
        this.creditCartProps._preference = preference;
    }
}
