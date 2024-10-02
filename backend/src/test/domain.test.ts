import { expect, it } from "vitest";
import { Address } from "../Model/domain/Address";
import { Client, ClientProps } from "../Model/domain/Client";
import { StatusClient } from "../Model/domain/types/StatusClient";
import { TypeResidence } from "../Model/domain/types/TypeResidence";
import { ProfilePurchase } from "../Model/domain/types/ProfilePurchase";
import { Gender } from "../Model/domain/types/Gender";
import { TypePhone } from "../Model/domain/types/TypePhone";
import { Phone } from "../Model/domain/Phone";
import { CPF } from "../Model/domain/CPF";

const clientDTO = {
    "phones": [
        {
            "ddd": "11",
            "number": "99999999",
            "typePhone": "FIXO"
        }
    ],
    "profilePurchase": "BRONZE",
    "name": "Danilo",
    "dateOfBirth": "17/03/2004",
    "email": "teste21@gmail.com",
    "cpf": "12345678932",
    "gender": "MEN",
    "password": "12245678A",
    "addresses":[
        {
            "streetName": "teste",
            "publicPlace": "Rua", // Logradouro
            "nameAddress": "testes2",
            "number": "43",
            "cep": "08130290",
            "neighborhood": "Cidade Kemel",
            "city": "São Paulo",
            "state": "São Paulo",
            "country": "Brasil",
            "compostName": "Rua de teste",
            "typeResidence": "HOME",
            "change": true,
            "delivery": false
        },
        {
            "streetName": "teste",
            "publicPlace": "Rua", // Logradouro
            "nameAddress": "testes2",
            "number": "43",
            "cep": "08130290",
            "neighborhood": "Cidade Kemel",
            "city": "São Paulo",
            "state": "São Paulo",
            "country": "Brasil",
            "compostName": "Rua de teste",
            "typeResidence": "HOME",
            "change": false,
            "delivery": true
        }
    ],
    "creditCart": null
}

it("Should create domain entity", () => {
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
            state: addressDTO.state,
            compostName: addressDTO.compostName,
            typeResidence: addressDTO.typeResidence as TypeResidence,
            change: addressDTO.change,
            delivery: addressDTO.delivery,
        });
    });

    // Mapeamento do cartão de crédito (se houver)
    // const creditCart = clientDTO.creditCart
    //     ? clientDTO.creditCart.map((card) => {
    //         return new CreditCart({
    //             _namePrinted: card.namePrinted,
    //             _number: card.number,
    //             _cvv: card.cvv,
    //             _dateValid: card.dateValid,
    //             _flag: card.flag,
    //             _status: card.status,
    //             _preference: card.preference
    //         })
    //     })
    //     : null;
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
        creditCart: null,
        ranking: 1
    };
    const client = new Client(clientProps)
    expect(client).instanceOf(Client)
})
