import { TypeResidence } from "../domain/types/TypeResidence"

export interface AddressDTO {
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
    change: boolean,
    delivery: boolean
}
