import { FactoryClient } from "../../Model/domain/Client";
import { Request, Response } from 'express'
import { ClientDTO } from "../../Model/DTO/ClientDTO";
import { Facade } from "../Facade/Facade";

export class UpdateClientController {
    async handle(req: Request, res: Response){
        try{
            const clientDto = req.body as ClientDTO
            if(!clientDto || !clientDto.cpf) return res.json({
                error: 'You should send some data to Update or you do not send the CPF !'
            })
            if(clientDto.password !== clientDto.confirmPassword) return res.json({
                error: 'Passwords do not equals !'
            })
            
            const client = FactoryClient.createClient(clientDto)
            client.addresses[0].id = clientDto.addresses[0].id

            const facade = new Facade(client)
            const clientExist = await facade.find()

            if(!clientExist) return res.json({
                error: 'Client do not exist ! :('
            })
            const clientUpdated = await facade.update()

            return res.json({
                success: true,
                clientUpdated
            })
        } catch (e) {
            return res.status(400).json({
                error: `This ${e} was found ! :(`
            })
        }
    }
}
