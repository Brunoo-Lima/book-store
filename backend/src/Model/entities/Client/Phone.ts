import { EntityDomain } from "../EntityDomain";
import { TypePhone } from "../types/TypePhone";

export interface PhoneProps {
    _ddd: string;
    _number: string;
    _typePhone: TypePhone;
}

export class Phone extends EntityDomain {
    constructor(private phoneProps: PhoneProps, public isNew?: boolean) {
        super();
    }

    public get ddd(): string {
        return this.phoneProps._ddd;
    }

    public set ddd(ddd: string) {
        this.phoneProps._ddd = ddd;
    }

    public get number(): string {
        return this.phoneProps._number;
    }
    public set number(number: string) {
        this.phoneProps._number = number;
    }

    public set typePhone(typePhone: TypePhone) {
        this.phoneProps._typePhone = typePhone;
    }

    public get typePhone(): TypePhone {
        return this.phoneProps._typePhone;
    }
}
