import { FactoryClient } from "../../Model/entities/Client/Client";
import { NextFunction, Request, Response } from "express";
import { ClientDTO } from "../../Model/entities/Client/DTO/ClientDTO";
import { Facade } from "../Facade/Facade";
import { Client } from "@prisma/client";

export class UpdateClientController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const clientDto = req.body as ClientDTO;
            if (!clientDto || !clientDto.id)
                return res.json({
                    error: "You should send some data to Update or you do not send the client ID !",
                });
            if (clientDto.password !== clientDto.confirmPassword)
                return res.json({
                    error: "Passwords do not equals !",
                });

            const client = FactoryClient.createClient(clientDto);
            client.id = clientDto.id ? clientDto.id : "";

            console.log("client", client);

            if (client.addresses && client.addresses.length > 0) {
                client.addresses[0].id = clientDto.addresses[0].id!;
            }
            if (client.creditCard && client.creditCard.length > 0) {
                client.creditCard[0].id = clientDto.creditCard[0].id!;
            }

            const facade = new Facade();
            const clientExist = (await facade.find(client)) as Client;

            if (!clientExist)
                return res.json({
                    error: "Client do not exist ! :(",
                });
            const clientUpdated = (await facade.update(client)) as Client;
            if ("error" in clientUpdated) {
                return res.json({
                    error: `This ${clientUpdated.error}`,
                });
            }
            req.body.client = clientUpdated;

            return next();
        } catch (e) {
            return res.status(400).json({
                error: `This ${e} was found ! :(`,
            });
        }
    }
}
