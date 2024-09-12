import { Address } from "./Address";
import { CreditCart } from "./Cart";
import { CPF } from "./CPF";
import { EntityDomain } from "./EntityDomain";
import { Phone } from "./Phone";
import { Gender } from "./types/Gender";
import { ProfilePurchase } from "./types/ProfilePurchase";
import { StatusClient } from "./types/StatusClient";

export class Client extends EntityDomain{

    constructor(
        private phone: Phone | null = null, // Phone can be sent after of the object created
        private _profilePurchase: ProfilePurchase,
        private _name: string,
        private _DateOfBirth: Date,
        private _email: string,
        private _cpf: CPF,
        private _statusClient: StatusClient,
        private _gender: Gender,
        private _rfmScore: number, // Pontuação que atrela o perfil ao cliente
        private _addressResidence: Address,
        private _addressDelivery: Address,
        private _addressCharge: Address,
        private _creditCart: CreditCart | null
    )
    {
        super()
    }
    public get name(): string{
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get DateOfBirth(): Date {
        return this._DateOfBirth;
    }

    public set DateOfBirth(DateOfBirth: Date) {
        this._DateOfBirth = DateOfBirth;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string,) {
        this.email = email;
    }

    public get cpf(): CPF {
        return this.cpf;
    }

    public set cpf(cpf: CPF) {
        this.cpf = cpf;
    }
}
