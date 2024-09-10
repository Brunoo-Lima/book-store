import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";
import { TypeResidence } from "./types/TypeResidence";

export class Address extends EntityDomain{
    constructor(
        private _client: Client,
        private _streetName: string,
        private _publicPlace: string, // Logradouro
        private _number: string,
        private _cep: string,
        private _neighborhood: string,
        private _city: string,
        private _state: string,
        private _country: string,
        private _compostName: string,
        private _typeResidence: TypeResidence
    ){
        super()
    }
}
