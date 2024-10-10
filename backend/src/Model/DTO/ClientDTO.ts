import { UUID } from "crypto";
import { Gender } from "../domain/types/Gender";
import { ProfilePurchase } from "../domain/types/ProfilePurchase";
import { StatusClient } from "../domain/types/StatusClient";
import { TypePhone } from "../domain/types/TypePhone";
import { AddressDTO } from "./AddressDTO";

export interface ClientDTO {
    phones: {
        ddd: string | "",
        number: string | "",
        typePhone: TypePhone
    }[]// Alterado de uma tupla para um array
    id: UUID;
    profilePurchase: ProfilePurchase;
    statusClient: StatusClient;
    name: string | "";
    dateOfBirth: string | "";
    email: string | "";
    cpf: string | "";
    gender: Gender;
    password: string | "";
    confirmPassword: string | "";
    addresses: AddressDTO[] | []
    creditCart: {
        id: string;
        namePrinted: string,
        number: string,
        cvv: string,
        dateValid: string,
        flag: string,
        preference: boolean
    }[]; // Alterado de uma tupla para um array ou null
}
