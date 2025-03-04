// import { Request, Response } from "express";
// import { ClientDTO } from "../../Model/entities/Client/DTO/ClientDTO";
// import { FactoryClient } from "../../Model/entities/Client/Client";
// import { StatusDelivery } from "../../Model/entities/types/StatusDelivery";
// import { Delivery } from "../../Model/entities/Purchase/Delivery";
// import { Sales } from "../../Model/entities/Purchase/Sales";
// import { Status } from "../../Model/entities/types/Status";
// import { Facade } from "../Facade/Facade";
// import { SalesDTO } from "../../Model/entities/Purchase/DTO/SalesDTO";

// export class ListSaleController {
//     async handle(req: Request, res: Response) {
//         try {
//             const salesDto = req.body as SalesDTO;
//             const client = salesDto.client ? salesDto.client : {};
//             const clientDomain = FactoryClient.createClient(
//                 client as ClientDTO
//             );
//             clientDomain.cpf.code = salesDto.client.cpf;

//             const delivery = new Delivery(
//                 new Date(),
//                 StatusDelivery.PREPARING,
//                 new Date()
//             );
//             const sale = new Sales(
//                 new Date(),
//                 clientDomain,
//                 Status.PROCESSING,
//                 [],
//                 delivery
//             );
//             const facade = new Facade();
//             const listSale = await facade.findMany(sale);

//             if (!listSale) {
//                 return res.json({
//                     error: "Sale cannot be processed !",
//                 });
//             }
//             return res.json({
//                 success: true,
//                 sale: listSale,
//             });
//         } catch (error) {
//             return res.json({
//                 error: error,
//             });
//         }
//     }
// }
