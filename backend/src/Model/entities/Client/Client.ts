/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/no-extraneous-class */
import { Address } from "./Address";
import { CreditCard } from "./CreditCard";
import { CPF } from "./CPF";
import { EntityDomain } from "../EntityDomain";
import { Phone } from "./Phone";
import { Gender } from "../types/Gender";
import { ProfilePurchase } from "../types/ProfilePurchase";
import { StatusClient } from "../types/StatusClient";
import { ClientDTO } from "./DTO/ClientDTO";
import { TypePhone } from "../types/TypePhone";
import { TypeResidence } from "../types/TypeResidence";
import { getProfilePurchase } from "../../../utils/getProfilePurchase";

export class Client extends EntityDomain {
    constructor(
        private _phones: Phone[], // Phone can be sent after the object is created
        private _profilePurchase: ProfilePurchase,
        private _name: string,
        private _dateOfBirth: string,
        private _email: string,
        private _password: string,
        private _confirmPassword: string,
        private _cpf: CPF,
        private _statusClient: StatusClient,
        private _gender: Gender,
        private _rfmScore: number, // Pontuação que atrela o perfil ao cliente
        private _ranking: number,
        private _addresses: Address[],
        private _creditCard: CreditCard[] | null
    ) {
        super();
    }

    // Getters
    public get name(): string {
        return this._name;
    }

    public get ranking(): number {
        return this._ranking;
    }

    public get dateOfBirth(): string {
        return this._dateOfBirth;
    }

    public get email(): string {
        return this._email;
    }

    public get cpf(): CPF {
        return this._cpf;
    }

    public get phones(): Phone[] {
        return this._phones;
    }

    public get profilePurchase(): ProfilePurchase {
        return this._profilePurchase;
    }

    public get statusClient(): StatusClient {
        return this._statusClient;
    }

    public get gender(): Gender {
        return this._gender;
    }

    public get rfmScore(): number {
        return this._rfmScore;
    }

    public get addresses(): Address[] {
        return this._addresses;
    }

    public get creditCard(): CreditCard[] | null {
        return this._creditCard;
    }

    public get password(): string {
        return this._password;
    }
    public get confirmPassword(): string {
        return this._confirmPassword;
    }

    // Setters
    public set name(name: string) {
        this._name = name;
    }

    public set ranking(ranking: number) {
        this._ranking = ranking;
    }

    public set dateOfBirth(dateOfBirth: string) {
        this._dateOfBirth = dateOfBirth;
    }

    public set email(email: string) {
        this._email = email;
    }

    public set cpf(cpf: CPF) {
        this._cpf = cpf;
    }

    public set phones(phones: Phone[]) {
        this._phones = phones;
    }

    public set profilePurchase(profilePurchase: ProfilePurchase) {
        this._profilePurchase = profilePurchase;
    }

    public set statusClient(statusClient: StatusClient) {
        this._statusClient = statusClient;
    }

    public set gender(gender: Gender) {
        this._gender = gender;
    }

    public set rfmScore(rfmScore: number) {
        this._rfmScore = rfmScore;
    }

    public set addresses(addresses: Address[]) {
        this._addresses = addresses;
    }

    public set creditCard(creditCart: CreditCard[] | null) {
        this._creditCard = creditCart;
    }

    public set password(password: string) {
        this._password = password;
    }
    public set confirmPassword(password: string) {
        this._confirmPassword = password;
    }
}

export abstract class FactoryClient {
    static createClient(clientDTO: ClientDTO): Client {
        // Mapeamento dos telefones
        const phones: Phone[] = clientDTO.phones
            ? clientDTO.phones.map((phoneDTO) => {
                  return new Phone(
                      {
                          _ddd: phoneDTO.ddd,
                          _number: phoneDTO.number,
                          _typePhone: phoneDTO.typePhone as TypePhone,
                      },
                      phoneDTO.id == null
                  );
              })
            : [];

        // Mapeamento dos endereços
        const addresses: Address[] = clientDTO.addresses
            ? clientDTO.addresses.map((addressDTO) => {
                  return new Address(
                      {
                          streetName: addressDTO.streetName,
                          nameAddress: addressDTO.nameAddress,
                          publicPlace: addressDTO.publicPlace,
                          number: addressDTO.number,
                          cep: addressDTO.cep,
                          neighborhood: addressDTO.neighborhood,
                          city: addressDTO.city,
                          state: addressDTO.state,
                          compostName: addressDTO.compostName,
                          typeResidence:
                              addressDTO.typeResidence as TypeResidence,
                          change: addressDTO.change,
                          delivery: addressDTO.delivery,
                      },
                      addressDTO.id == null
                  );
              })
            : [];

        // Mapeamento do cartão de crédito (se houver)
        const creditCard = clientDTO.creditCard
            ? clientDTO.creditCard.map((card) => {
                  return new CreditCard(
                      {
                          _namePrinted: card.namePrinted,
                          _number: card.number,
                          _cvv: card.cvv,
                          _dateValid: card.dateValid,
                          _flag: card.flag.toUpperCase(),
                          _preference: card.preference,
                      },
                      card.id == null
                  );
              })
            : [];

        // Criando o objeto Client com os dados mapeados
        const profile = getProfilePurchase(0, 0, 0);
        return new Client(
            phones,
            profile.profile,
            clientDTO.name,
            clientDTO.dateOfBirth,
            clientDTO.email,
            clientDTO.password,
            clientDTO.confirmPassword,
            new CPF(clientDTO.cpf), // Assumindo que CPF tem uma classe própria
            clientDTO.statusClient, // Você pode ajustar isso conforme sua lógica
            clientDTO.gender as Gender,
            profile.score, // Aqui você pode calcular ou ajustar a pontuação RFM (NÃO PODE SER 0)
            profile.ranking,
            addresses,
            creditCard
        );
    }
}
