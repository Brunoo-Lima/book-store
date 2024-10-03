import { Address } from "../domain/Address";
import { Flags } from "../domain/types/Flags";
import { Gender } from "../domain/types/Gender";
import { ProfilePurchase } from "../domain/types/ProfilePurchase";
import { StatusPayment } from "../domain/types/StatusPayment";
import { TypePhone } from "../domain/types/TypePhone";

export interface ClientDTO {
    phones: {
        ddd: string | "",
        number: string | "",
        typePhone: TypePhone
    }[]// Alterado de uma tupla para um array

    profilePurchase: ProfilePurchase;
    name: string | "";
    dateOfBirth: string | "";
    email: string | "";
    cpf: string | "";
    gender: Gender;
    password: string | "";
    addresses: Address[]
    creditCart: {
        namePrinted: string,
        number: string,
        cvv: string,
        dateValid: string,
        flag: Flags,
        status: StatusPayment,
        preference: boolean
    }[]; // Alterado de uma tupla para um array ou null
}
