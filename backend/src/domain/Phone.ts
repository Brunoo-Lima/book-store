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

    public get ddd(): number {
        return this._ddd;
    }

    public set ddd(ddd: number) {
        this._ddd = ddd;
    }

    public get number(): number {
        return this._number;
    }
    public set number(number: number) {
        this._number = number;
    }

    public set typePhone(typePhone: TypePhone) {
        this._typePhone = typePhone;
    }

    public get typePhone(): string {
        return this._typePhone;
    }
}
