
import { NextFunction, Request, Response } from "express";
import { ClientDTO } from "../../Model/DTO/ClientDTO"
import { FactoryClient } from "../../Model/domain/Client";
import { Client as ClientPrisma } from '@prisma/client'
import { Facade } from "../Facade/Facade";
import jwt from 'jsonwebtoken';

export class ClientController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const clientDTO = req.body as ClientDTO
            if (!clientDTO) return res.json(
                {
                    error: "Error, Data not sent !"
                }
            )

            const client = FactoryClient.createClient(clientDTO)
            const facade = new Facade(client)

            const clientCreated = await facade.create() as ClientPrisma

            if ("error" in clientCreated) {
                return res.json({
                    error: clientCreated.error
                })
            }
            const clientEmail = clientCreated.cli_email
            const clientPassword = clientCreated.cli_password

            const token = jwt.sign({ clientEmail, clientPassword }, process.env.TOKEN_SECRET as string);
            req.body.client = {
                clientCreated,
                token
            }
            return next()

        } catch (error) {
            return res.status(403).json({
                error: error
            })
        }
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
