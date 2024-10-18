import { Request, Response } from "express";
import { ClientDTO } from "../../Model/DTO/ClientDTO";
import { FactoryClient } from "../../Model/domain/Client";
import { Facade } from "../Facade/Facade";

export class ListClientController {
    async handle(req: Request, res: Response){
        try{
            const clientDTO = req.body as ClientDTO
            const client = FactoryClient.createClient(clientDTO)
            const facade = new Facade();
            const clients = await facade.findMany(client)

            if(!clients) {
                return {
                    error: 'Clients not found !'
                }
            }
            return res.json({
                clients
            })
        } catch(e) {
            return res.status(403).json({
                error: `This ${e} was found !`
            })
        }
    }
}
