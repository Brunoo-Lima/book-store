import { City } from "./City";
import { EntityDomain } from "./EntityDomain";
import { TypeResidence } from "./types/TypeResidence";

export class Address extends EntityDomain{
    constructor(
        private _streetName: string,
        private _publicPlace: string, // Logradouro
        private _number: string,
        private _cep: string,
        private _neighborhood: string,
        private _city: City,
        private _compostName: string,
        private _typeResidence: TypeResidence
    ){
        super()
    }
}
