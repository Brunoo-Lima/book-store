

import { Flag } from "../domain/Flag";
import { Gender } from "../domain/types/Gender";
import { ProfilePurchase } from "../domain/types/ProfilePurchase";
import { StatusPayment } from "../domain/types/StatusPayment";
import { TypePhone } from "../domain/types/TypePhone";
import { TypeResidence } from "../domain/types/TypeResidence";

export interface ClientDTO {
    phones: [
        {
            ddd: string | "",
            number: string | "",
            typePhone: TypePhone
        }
    ]
    profilePurchase: ProfilePurchase | ProfilePurchase.UNDEFINED;
    name: string | "";
    dateOfBirth: string | "";
    email: string | "";
    cpf: string | "";
    gender: Gender;
    password: string | "";
    addresses: [
        {
            streetName: string | "",
            publicPlace: string | "", // Logradouro
            number: string | "",
            cep: string | "",
            neighborhood: string | "",
            city: {
                name: string | ""
            },
            state: {
                description: string | "",
                uf: string | ""
            },
            country: string | "",
            compostName: string | "",
            typeResidence: TypeResidence,
            change: boolean,
            delivery: boolean,
        }
    ];
    creditCart: {
        namePrinted: string,
        cvv: string,
        dateValid: Date,
        flag: Flag,
        status: StatusPayment,
        preference: boolean
    } | null;
}
