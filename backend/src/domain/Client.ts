import { Address } from "./Address";
import { CPF } from "./CPF";
import { EntityDomain } from "./EntityDomain";
import { Phone } from "./Phone";
import { Gender } from "./types/Gender";
import { StatusClient } from "./types/StatusClient";

export class Client extends EntityDomain{
    private phone: Phone | null = null // Phone can be sent after of the object created
    constructor(
        private _name: string,
        private _DateofBirth: string,
        private _email: string,
        private _cpf: CPF,
        private _statusClient: StatusClient,
        private _Address: Address,
        private _gender: Gender,
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

    public get DateofBirth(): string {
        return this._DateofBirth;
    }

    public set DateofBirth(DateofBirth: string,) {
        this._DateofBirth = DateofBirth;
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
