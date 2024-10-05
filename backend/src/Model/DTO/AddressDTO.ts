import { TypeResidence } from "../domain/types/TypeResidence"

export interface AddressDTO {
    id: string;
    streetName: string,
    nameAddress: string,
    publicPlace: string,
    number: string,
    cep:string
    neighborhood: string,
    city: string,
    state: string,
    compostName: string,
    typeResidence: TypeResidence,
    change: boolean | undefined,
    delivery: boolean | undefined
}
