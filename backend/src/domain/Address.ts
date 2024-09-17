import { EntityDomain } from "./EntityDomain";
import { TypeResidence } from "./types/TypeResidence";


export interface AddressProps {
    streetName: string,
    publicPlace: string, // Logradouro
    number: string,
    cep: string,
    neighborhood: string,
    city: string,
    state: string,
    country: string,
    compostName: string,
    typeResidence: TypeResidence,
    change: boolean,
    delivery: boolean,
}

export class Address extends EntityDomain {
    constructor(
        private addressProps: AddressProps
    ) {
        super();
    }

    get streetName(): string {
        return this.addressProps.streetName;
    }
    public set streetName(streetName: string) {
        this.addressProps.streetName = streetName;
    }

    get publicPlace(): string {
        return this.addressProps.publicPlace;
    }
    public set publicPlace(publicPlace: string) {
        this.addressProps.publicPlace = publicPlace;
    }

    get number(): string {
        return this.addressProps.number;
    }
    public set number(number: string) {
        this.addressProps.number = number;
    }


    get cep(): string {
        return this.addressProps.cep;
    }

    public set cep(cep: string) {
        this.addressProps.cep = cep;
    }

    get neighborhood(): string {
        return this.addressProps.neighborhood;
    }


    public set neighborhood(neighborhood: string) {
        this.addressProps.neighborhood = neighborhood;
    }

    get city(): string {
        return this.addressProps.city;
    }
    public set city(city: string) {
        this.addressProps.city = city;
    }

    get state(): string {
        return this.addressProps.state;
    }

    public set state(state: string) {
        this.addressProps.state = state;
    }

    get country(): string {
        return this.addressProps.country;
    }
    public set country(country: string) {
        this.addressProps.country = country;
    }
    get compostName(): string {
        return this.addressProps.compostName;
    }

    public set compostName(compostName: string) {
        this.addressProps.compostName = compostName;
    }
    get typeResidence(): TypeResidence {
        return this.addressProps.typeResidence;
    }

    public set typeResidence(typeResidence: TypeResidence) {
        this.addressProps.typeResidence = typeResidence;
    }
    get delivery(): boolean {
        return this.addressProps.delivery;
    }

    public set delivery(delivery: boolean) {
        this.addressProps.delivery = delivery;
    }
    get change(): boolean {
        return this.addressProps.change;
    }

    public set change(change: boolean) {
        this.addressProps.change = change;
    }
}
