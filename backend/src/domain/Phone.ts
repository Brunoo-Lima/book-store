import { EntityDomain } from "./EntityDomain";
import { TypePhone } from "./types/TypePhone";

export interface PhoneProps{
    ddd: string,
    number: string,
    typePhone: TypePhone
}

export class Phone extends EntityDomain{
    constructor(
        private phoneProps: PhoneProps
    ){
        super()
    }

    public get ddd(): string {
        return this.phoneProps.ddd;
    }

    public set ddd(ddd: string) {
        this.phoneProps.ddd = ddd;
    }

    public get number(): string {
        return this.phoneProps.number;
    }
    public set number(number: string) {
        this.phoneProps.number = number;
    }

    public set typePhone(typePhone: TypePhone) {
        this.phoneProps.typePhone = typePhone;
    }

    public get typePhone(): string {
        return this.phoneProps.typePhone;
    }
}
