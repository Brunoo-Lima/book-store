import { EntityDomain } from "./EntityDomain";
import { TypePhone } from "./types/TypePhone";

export interface PhoneProps{
    ddd: number,
    number: number,
    typePhone: TypePhone
}

export class Phone extends EntityDomain{
    constructor(
        private phoneProps: PhoneProps
    ){
        super()
    }

    public get ddd(): number {
        return this.phoneProps.ddd;
    }

    public set ddd(ddd: number) {
        this.phoneProps.ddd = ddd;
    }

    public get number(): number {
        return this.phoneProps.number;
    }
    public set number(number: number) {
        this.phoneProps.number = number;
    }

    public set typePhone(typePhone: TypePhone) {
        this.phoneProps.typePhone = typePhone;
    }

    public get typePhone(): string {
        return this.phoneProps.typePhone;
    }
}
