import { Address } from "./Address";
import { CreditCart } from "./Cart";
import { CPF } from "./CPF";
import { EntityDomain } from "./EntityDomain";
import { Phone } from "./Phone";
import { Gender } from "./types/Gender";
import { ProfilePurchase } from "./types/ProfilePurchase";
import { StatusClient } from "./types/StatusClient";

export class Client extends EntityDomain {
    constructor(
        private _phone: Phone, // Phone can be sent after of the object created
        private _profilePurchase: ProfilePurchase,
        private _name: string,
        private _dateOfBirth: Date,
        private _email: string,
        private _password: string,
        private _cpf: CPF,
        private _statusClient: StatusClient,
        private _gender: Gender,
        private _rfmScore: number, // Pontuação que atrela o perfil ao cliente
        private _addresses: Address[],
        private _creditCart: CreditCart | null,
    ) {
        super();
    }

    public get name(): string {
        return this._name;
    }

    public set name(name: string) {
        this._name = name;
    }

    public get dateOfBirth(): Date {
        return this._dateOfBirth;
    }

    public set dateOfBirth(DateOfBirth: Date) {
        this._dateOfBirth = DateOfBirth;
    }

    public get email(): string {
        return this._email;
    }

    public set email(email: string) {
        this._email = email;
    }

    public get cpf(): CPF {
        return this._cpf;
    }

    public set cpf(cpf: CPF) {
        this._cpf = cpf;
    }

    public get phone(): Phone {
        return this._phone;
    }

    public set phone(phone: Phone) {
        this._phone = phone;
    }

    public get profilePurchase(): ProfilePurchase {
        return this._profilePurchase;
    }

    public set profilePurchase(profilePurchase: ProfilePurchase) {
        this._profilePurchase = profilePurchase;
    }

    public get statusClient(): StatusClient {
        return this._statusClient;
    }

    public set statusClient(statusClient: StatusClient) {
        this._statusClient = statusClient;
    }

    public get gender(): Gender {
        return this._gender;
    }

    public set gender(gender: Gender) {
        this._gender = gender;
    }

    public get rfmScore(): number {
        return this._rfmScore;
    }

    public set rfmScore(rfmScore: number) {
        this._rfmScore = rfmScore;
    }

    public get addresses(): Address[] {
        return this._addresses;
    }

    public set addresses(addressResidence: Address[]) {
        this._addresses = addressResidence;
    }

    public get creditCart(): CreditCart | null {
        return this._creditCart;
    }

    public set creditCart(creditCart: CreditCart | null) {
        this._creditCart = creditCart;
    }
    public get password(): string {
        return this._password;
    }

    public set password(password: string) {
        this._password = password;
    }
}
