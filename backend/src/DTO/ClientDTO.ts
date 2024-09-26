import { Flag } from "@prisma/client";
import { Gender } from "../Model/domain/types/Gender";
import { ProfilePurchase } from "../Model/domain/types/ProfilePurchase";
import { StatusPayment } from "../Model/domain/types/StatusPayment";
import { TypeResidence } from "../Model/domain/types/TypeResidence";

export interface ClientDTO {
    phones: [
        {
            ddd: string,
            number: string,
            typePhone: string
        }
    ]
    profilePurchase: ProfilePurchase;
    name: string;
    dateOfBirth: string;
    email: string;
    cpf: string;
    gender: Gender;
    password: string;
    addresses: [
        {
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
