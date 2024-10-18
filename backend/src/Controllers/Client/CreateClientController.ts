
import { NextFunction, Request, Response } from "express";
import { ClientDTO } from "../../Model/DTO/ClientDTO"
import { FactoryClient } from "../../Model/domain/Client";
import { Facade } from "../Facade/Facade";
import { StatusClient } from "../../Model/domain/types/StatusClient";
import { Client } from "@prisma/client";

export class CreateClientController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const clientDTO = req.body as ClientDTO
            clientDTO.statusClient = StatusClient.ACTIVATE
            if (!clientDTO) return res.json(
                {
                    error: "Error, Data not sent !"
                }
            )
            const client = FactoryClient.createClient(clientDTO)
            const facade = new Facade()

            const clientCreated = await facade.create(client) as Client
            client.id = clientCreated.cli_id
            if ("error" in clientCreated) {
                return res.json({
                    error: `Error ${clientCreated.error}`
                })
            }
            req.body.client = clientCreated
            return next()

        } catch (error) {
            return res.status(403).json({
                error: error
            })
        }
    }
}
