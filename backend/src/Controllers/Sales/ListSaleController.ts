import { Request, Response } from 'express'
import { ClientDTO } from '../../Model/DTO/ClientDTO'
import { FactoryClient } from '../../Model/domain/Client'
import { StatusDelivery } from '../../Model/domain/types/StatusDelivery'
import { Delivery } from '../../Model/domain/Delivery'
import { Sales } from '../../Model/domain/Sales'
import { Status } from '../../Model/domain/types/Status'
import { Facade } from '../Facade/Facade'
import { SalesDTO } from '../../Model/DTO/SalesDTO'

export class ListSaleController{
    async handle(req: Request, res: Response){
        try {
            const salesDto = req.body as SalesDTO
            const client = (salesDto.client) ? salesDto.client : {}
            const clientDomain = FactoryClient.createClient(client as ClientDTO)
            clientDomain.id = salesDto.client.id
            
            const delivery = new Delivery(new Date(), StatusDelivery.PREPARING, new Date())
            const sale = new Sales(
                new Date(),
                clientDomain,
                Status.PROCESSING,
                [],
                delivery
            )
            const facade = new Facade(sale)
            const listSale = await facade.findMany()

            if(!listSale) {
                return res.json({
                    error: "Sale cannot be processed !"
                })
            }
            return res.json({
                success: true,
                sale: listSale
            })

        } catch (error) {
            console.log(error)
            return res.json({
                error: error
            })
        }
    }
}
