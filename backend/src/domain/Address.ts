import { Client } from "./Client";
import { EntityDomain } from "./EntityDomain";
import { TypeResidence } from "./types/TypeResidence";

export class Address extends EntityDomain {
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
        private _typeResidence: TypeResidence,
        private _change: boolean,
        private _delivery: boolean,
    ) {
        super();
    }

    // Métodos GET
    get client(): Client {
        return this._client;
    }

    public set client(client: Client) {
        this._client = client
    }

    get streetName(): string {
        return this._streetName;
    }
    public set streetName(streetName: string) {
        this._streetName = streetName;
    }

    get publicPlace(): string {
        return this._publicPlace;
    }
    public set publicPlace(publicPlace: string) {
        this._publicPlace = publicPlace;
    }

    get number(): string {
        return this._number;
    }
    public set number(number: string) {
        this._number = number;
    }


    get cep(): string {
        return this._cep;
    }

    public set cep(cep: string) {
        this._cep = cep;
    }

    get neighborhood(): string {
        return this._neighborhood;
    }


    public set neighborhood(neighborhood: string) {
        this._neighborhood = neighborhood;
    }

    get city(): string {
        return this._city;
    }
    public set city(city: string) {
        this._city = city;
    }

    get state(): string {
        return this._state;
    }

    public set state(state: string) {
        this._state = state;
    }

    get country(): string {
        return this._country;
    }
    public set country(country: string) {
        this._country = country;
    }
    get compostName(): string {
        return this._compostName;
    }

    public set compostName(compostName: string) {
        this._compostName = compostName;
    }
    get typeResidence(): TypeResidence {
        return this._typeResidence;
    }

    public set typeResidence(typeResidence: TypeResidence) {
        this._typeResidence = typeResidence;
    }
    get delivery(): boolean {
        return this._delivery;
    }

    public set delivery(delivery: boolean) {
        this._delivery = delivery;
    }
    get change(): boolean {
        return this._change;
    }

    public set change(change: boolean) {
        this._change = change;
    }
}
