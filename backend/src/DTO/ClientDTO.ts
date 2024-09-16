import { Flag } from "@prisma/client";
import { Gender } from "../domain/types/Gender";
import { ProfilePurchase } from "../domain/types/ProfilePurchase";
import { StatusClient } from "../domain/types/StatusClient";
import { StatusPayment } from "../domain/types/StatusPayment";
import { TypeResidence } from "../domain/types/TypeResidence";

export interface ClientDTO {
    phone: {
        ddd: number,
        number: number,
        typePhone: string
    };
    profilePurchase: ProfilePurchase;
    name: string;
    dateOfBirth: Date;
    email: string;
    cpf: {
        code: string
    };
    statusClient: StatusClient;
    gender: Gender;
    rfmScore: number;
    addresses: {
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
    };
    creditCart: {
        namePrinted:string,
        cvv:string,
        dateValid: Date,
        flag: Flag,
        status: StatusPayment,
        preference: boolean
    } | null;
}
