import { expect, it } from "vitest";
import { Address } from "../Model/domain/Address";
import { Client } from "../Model/domain/Client";
import { StatusClient } from "../Model/domain/types/StatusClient";
import { TypeResidence } from "../Model/domain/types/TypeResidence";
import { ProfilePurchase } from "../Model/domain/types/ProfilePurchase";
import { Gender } from "../Model/domain/types/Gender";
import { TypePhone } from "../Model/domain/types/TypePhone";
import { Phone } from "../Model/domain/Phone";
import { CPF } from "../Model/domain/CPF";
import { ValidDataClient } from "../Model/Business/ValidDataClient";
import { CreditCart } from "../Model/domain/CreditCard";
import { StatusPayment } from "../Model/domain/types/StatusPayment";
import { Flags } from "../Model/domain/types/Flags";

const clientDTO = {
    "phones": [
        {
            "ddd": "11",
            "number": "11111",
            "typePhone": "111"
        }
    ],
    "profilePurchase": "BRONZE",
    "name": "teste",
    "dateOfBirth": "17/03/2004",
    "email": "teste21@gmail.com",
    "cpf": "12345678932",
    "gender": "MEN",
    "rfmScore": 0,
    "password": "12245678A",
    "addresses": [
        {
            "streetName": "123",
            "publicPlace": "Rua", // Logradouro
            "nameAddress": "testes2",
            "number": "43",
            "cep": "08130290",
            "neighborhood": "Cidade Kemel",
            "city": "São Paulo",
            "state": "São Paulo",
            "country": "",
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
    "creditCart": {

    }
}

it("Should create domain entity", () => {
    const validDataRequired = new ValidDataClient()
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


    const client = new Client(
        phones,
        clientDTO.profilePurchase as ProfilePurchase,
        clientDTO.name,
        clientDTO.dateOfBirth,
        clientDTO.email,
        clientDTO.password,
        new CPF(clientDTO.cpf), // Assumindo que CPF tem uma classe própria
        StatusClient.ACTIVATE, // Você pode ajustar isso de acordo com sua lógica
        clientDTO.gender as Gender,
        1,
        1, // Aqui você pode calcular ou ajustar a pontuação RFM
        addresses,
        [new CreditCart({
            _namePrinted:"qwew",
            _number: "qwe",
            _cvv:"qwe",
            _dateValid: "qwe",
            _flag: Flags.MASTERCARD,
            _status: StatusPayment.DENY,
            _preference: false,
        })]
    )
    const object = validDataRequired.process(client)
    console.log(object)
    expect(object).haveOwnProperty('success')
})
