import { NextFunction, Request, Response } from "express";
import { ClientDTO } from "../DTO/ClientDTO";
import { Client } from "../domain/Client";
import {Client as ClientPrisma} from '@prisma/client'
import { Phone } from "../domain/Phone";
import { TypePhone } from "../domain/types/TypePhone";
import { CPF } from "../domain/CPF";
import { StatusClient } from "../domain/types/StatusClient";
import { Address } from "../domain/Address";
import { Facade } from "../Facade/Facade";
import jwt from 'jsonwebtoken';
export class ClientController{
    async handle(req: Request, res: Response, next: NextFunction) {
        try{
            const clientDTO = req.body as ClientDTO
            const client = new Client({
                phone: new Phone({
                    ddd: clientDTO.phone.ddd,
                    number: clientDTO.phone.number,
                    typePhone: clientDTO.phone.typePhone as TypePhone
                }), // Phone can be sent after of the object created
                profilePurchase: clientDTO.profilePurchase,
                name: clientDTO.name,
                dateOfBirth: clientDTO.dateOfBirth,
                email: clientDTO.email,
                password: clientDTO.password,
                cpf: new CPF(clientDTO.cpf),
                statusClient: StatusClient.ACTIVATE,
                gender: clientDTO.gender,
                addresses: clientDTO.addresses.map((address) => {
                    return new Address({
                        streetName: address.streetName,
                        publicPlace: address.publicPlace, // Logradouro
                        number: address.number,
                        cep: address.cep,
                        neighborhood: address.neighborhood,
                        city: address.city,
                        state: address.state,
                        country: address.country,
                        compostName: address.compostName,
                        typeResidence: address.typeResidence,
                        change: address.change,
                        delivery: address.delivery,
                    })
                }),
                rfmScore: 0, // Pontuação que atrela o perfil ao cliente
                creditCart: null,
            })
            const facade = new Facade(client)
            const clientCreated = await facade.create() as ClientPrisma

            if("error" in clientCreated){
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

        } catch(error){
            return res.status(403).json({
                error: error
            })
        }
    }

}
