import { Request, Response } from "express";
import { ClientDTO } from "../../Model/DTO/ClientDTO";
import { FactoryClient } from "../../Model/domain/Client";

export class ListClientController {
    async handle(req: Request, res: Response){
        try{
            const clientDTO = req.body as ClientDTO
            const client = FactoryClient.createClient(clientDTO)
            return res.json({
                client
            })
        } catch(e) {
            return res.status(403).json({
                error: `This ${e} was found !`
            })
        }
    }
}
