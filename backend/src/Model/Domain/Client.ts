/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Address } from "./Address";
import { CreditCart } from "./CreditCard";
import { CPF } from "./CPF";
import { EntityDomain } from "./EntityDomain";
import { Phone } from "./Phone";
import { Gender } from "./types/Gender";
import { ProfilePurchase } from "./types/ProfilePurchase";
import { StatusClient } from "./types/StatusClient";
import { ClientDTO } from "../DTO/ClientDTO";
import { TypePhone } from "./types/TypePhone";
import { TypeResidence } from "./types/TypeResidence";

export interface ClientProps{
    phones: Phone[], // Phone can be sent after of the object created
    profilePurchase: ProfilePurchase,
    name: string,
    dateOfBirth: string,
    email: string,
    password: string,
    cpf: CPF,
    statusClient: StatusClient,
    gender: Gender,
    rfmScore: number, // Pontuação que atrela o perfil ao cliente
    ranking: number,
    addresses: Address[],
    creditCart: CreditCart[] | null,
}
export class Client extends EntityDomain {
    constructor(
        private clientProps: ClientProps
    ) {
        super();
    }

    public get name(): string {
        return this.clientProps.name;
    }

    public set name(ranking: number) {
        this.clientProps.ranking = ranking;
    }

    public get ranking(): number {
        return this.clientProps.ranking;
    }

    public set ranking(name: string) {
        this.clientProps.name = name;
    }

    public get dateOfBirth(): string {
        return this.clientProps.dateOfBirth;
    }

    public set dateOfBirth(DateOfBirth: string) {
        this.clientProps.dateOfBirth = DateOfBirth;
    }

    public get email(): string {
        return this.clientProps.email;
    }

    public set email(email: string) {
        this.clientProps.email = email;
    }

    public get cpf(): CPF {
        return this.clientProps.cpf;
    }

    public set cpf(cpf: CPF) {
        this.clientProps.cpf = cpf;
    }

    public get phone(): Phone[] {
        return this.clientProps.phones;
    }

    public set phone(phone: Phone[]) {
        this.clientProps.phones = phone;
    }

    public get profilePurchase(): ProfilePurchase {
        return this.clientProps.profilePurchase;
    }

    public set profilePurchase(profilePurchase: ProfilePurchase) {
        this.clientProps.profilePurchase = profilePurchase;
    }

    public get statusClient(): StatusClient {
        return this.clientProps.statusClient;
    }

    public set statusClient(statusClient: StatusClient) {
        this.clientProps.statusClient = statusClient;
    }

    public get gender(): Gender {
        return this.clientProps.gender;
    }

    public set gender(gender: Gender) {
        this.clientProps.gender = gender;
    }

    public get rfmScore(): number {
        return this.clientProps.rfmScore;
    }

    public set rfmScore(rfmScore: number) {
        this.clientProps.rfmScore = rfmScore;
    }

    public get addresses(): Address[] {
        return this.clientProps.addresses;
    }

    public set addresses(addressResidence: Address[]) {
        this.clientProps.addresses = addressResidence;
    }

    public get creditCart(): CreditCart[]| null {
        return this.clientProps.creditCart;
    }

    public set creditCart(creditCart: CreditCart[] | null) {
        this.clientProps.creditCart = creditCart;
    }
    public get password(): string {
        return this.clientProps.password;
    }

    public set password(password: string) {
        this.clientProps.password = password;
    }
}

export abstract class FactoryClient {
    static createClient(clientDTO: ClientDTO): Client {
        // Mapeamento dos telefones
        const phones: Phone[] = clientDTO.phones.map(phoneDTO => {
            return new Phone({
                _ddd: phoneDTO.ddd,
                _number: phoneDTO.number,
                _typePhone: phoneDTO.typePhone as TypePhone
            });
        });

        // Mapeamento dos endereços
        const addresses: Address[] = clientDTO.addresses.map(addressDTO => {
            return new Address({
                streetName: addressDTO.streetName,
                nameAddress: addressDTO.nameAddress,
                publicPlace: addressDTO.publicPlace,
                number: addressDTO.number,
                cep: addressDTO.cep,
                neighborhood: addressDTO.neighborhood,
                city: addressDTO.city,
                state:addressDTO.state,
                country: addressDTO.country,
                compostName: addressDTO.compostName,
                typeResidence: addressDTO.typeResidence as TypeResidence,
                change: addressDTO.change,
                delivery: addressDTO.delivery,
            });
        });

        // Mapeamento do cartão de crédito (se houver)
        const creditCart = clientDTO.creditCart != null
            ? clientDTO.creditCart.map((card) => {
                return new CreditCart({
                    _namePrinted: card.namePrinted,
                    _number: card.number,
                    _cvv: card.cvv,
                    _dateValid: card.dateValid,
                    _flag: card.flag,
                    _status: card.status,
                    _preference: card.preference
                })
            })
            : null;
        // Criando o objeto Client com os dados mapeados
        const clientProps: ClientProps = {
            phones: phones,
            profilePurchase: clientDTO.profilePurchase as ProfilePurchase,
            name: clientDTO.name,
            dateOfBirth: clientDTO.dateOfBirth,
            email: clientDTO.email,
            password: clientDTO.password,
            cpf: new CPF(clientDTO.cpf), // Assumindo que CPF tem uma classe própria
            statusClient: StatusClient.ACTIVATE, // Você pode ajustar isso de acordo com sua lógica
            gender: clientDTO.gender as Gender,
            rfmScore: 0, // Aqui você pode calcular ou ajustar a pontuação RFM
            addresses: addresses,
            creditCart: creditCart,
            ranking: 1
        };
        return new Client(clientProps);
    }
}
