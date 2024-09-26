// import { ClientDTO } from "../DTO/ClientDTO";
// import { Client } from "../Model/domain/Client";
// import { Client as ClientPrisma } from '@prisma/client'
// import { Phone } from "../Model/domain/Phone";
// import { TypePhone } from "../Model/domain/types/TypePhone";
// import { CPF } from "../Model/domain/CPF";
// import { StatusClient } from "../Model/domain/types/StatusClient";
// import { Address } from "../Model/domain/Address";
// import { Facade } from "../Facade/Facade";
// import jwt from 'jsonwebtoken';
// import { Gender } from "../Model/domain/types/Gender";
// import { ProfilePurchase } from "../Model/domain/types/ProfilePurchase";
export class ClientController {
    async handle() {
        // try {
        //     const clientDTO = req.body as ClientDTO
        //     const client = new Client({
        //         phones: clientDTO.phones.map((phone) => {
        //             return new Phone({
        //                 ddd: phone.ddd,
        //                 number: phone.number,
        //                 typePhone: phone.typePhone as TypePhone
        //             })
        //         }),
        //         profilePurchase: clientDTO.profilePurchase,
        //         name: clientDTO.name,
        //         dateOfBirth: clientDTO.dateOfBirth,
        //         email: clientDTO.email,
        //         password: clientDTO.password,
        //         cpf: new CPF(clientDTO.cpf),
        //         statusClient: StatusClient.ACTIVATE,
        //         gender: clientDTO.gender,
        //         addresses: clientDTO.addresses.map((address) => {
        //             return new Address({
        //                 streetName: address.streetName,
        //                 publicPlace: address.publicPlace, // Logradouro
        //                 number: address.number,
        //                 cep: address.cep,
        //                 neighborhood: address.neighborhood,
        //                 city: address.city,
        //                 state: address.state,
        //                 country: address.country,
        //                 compostName: address.compostName,
        //                 typeResidence: address.typeResidence,
        //                 change: address.change,
        //                 delivery: address.delivery,
        //             })
        //         }),
        //         rfmScore: 0, // Pontuação que atrela o perfil ao cliente
        //         creditCart: null,
        //     })
        //     const facade = new Facade(client)
        //     const clientCreated = await facade.create() as ClientPrisma

        //     if ("error" in clientCreated) {
        //         return res.json({
        //             error: clientCreated.error
        //         })
        //     }
        //     const clientEmail = clientCreated.cli_email
        //     const clientPassword = clientCreated.cli_password

        //     const token = jwt.sign({ clientEmail, clientPassword }, process.env.TOKEN_SECRET as string);
        //     req.body.client = {
        //         clientCreated,
        //         token
        //     }
        //     return next()

        // } catch (error) {
        //     return res.status(403).json({
        //         error: error
        //     })
        // }
    }
    async list() {
    //     try {
    //         const clientDTO = req.body as ClientDTO
    //         const clientCPF = clientDTO.cpf ? new CPF(clientDTO.cpf as string) : new CPF("");
    //         const client = new Client({
    //             email: clientDTO.email as string || "",
    //             password: "",
    //             cpf: clientCPF,
    //             name: clientDTO.name as string || "",
    //             dateOfBirth: clientDTO.dateOfBirth as string || "",
    //             statusClient: StatusClient.ACTIVATE || StatusClient.INACTIVE,
    //             gender: Gender.MEN || Gender.WOMAN ,
    //             rfmScore: 0,
    //             profilePurchase: ProfilePurchase.BRONZE || ProfilePurchase.DIAMANTE || ProfilePurchase.GOLD || ProfilePurchase.SIlVER,
    //             phones: [new Phone({
    //                 ddd: "",
    //                 number: "",
    //                 typePhone: TypePhone.FIXED
    //             })],
    //             addresses: [],
    //             creditCart: null
    //         });
    //         const facade = new Facade(client);
    //         const clients = await facade.findMany() as ClientPrisma[]; // A pesquisa será feita usando os dados do cliente

    //         if (clients.length === 0) {
    //             return res.status(404).json({ error: "No clients found with the given filters." });
    //         }

    //         return res.status(200).json(clients);
    //     } catch (error) {
    //         return res.status(400).json({
    //             error
    //         });
    //     }
    }
}
