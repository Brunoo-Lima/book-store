// import { Request, Response } from "express";
// import { SalesDTO } from "../../Model/entities/Purchase/DTO/SalesDTO";
// import { Sales } from "../../Model/entities/Purchase";
// import { FactoryClient } from "../../Model/entities/Client/Client";
// import { ClientDTO } from "../../Model/entities/Client/DTO/ClientDTO";
// import { UUID } from "crypto";
// import { Facade } from "../Facade/Facade";
// import { Delivery } from "../../Model/entities/Delivery";
// import { Status } from "../../Model/entities/types/Status";
// import { StatusDelivery } from "../../Model/entities/types/StatusDelivery";
// import { Item } from "../../Model/entities/Item";
// import axios from "axios";
// import { Sale } from "@prisma/client";

// export class CreateSaleController {
//     public async handle(req: Request, res: Response) {
//         try {
//             const dataSale = req.body as SalesDTO;
//             const client = dataSale.client as ClientDTO;
//             const clientDomain = FactoryClient.createClient(client);
//             clientDomain.id = dataSale.client.id as UUID;

//             const [dayI, monthI, yearI] = dataSale.delivery.dateInitial
//                 .split("/")
//                 .map(Number); // Divide a string e converte para números
//             const [day, month, year] = dataSale.delivery.dateFinal
//                 .split("/")
//                 .map(Number); // Divide a string e converte para números

//             const delivery = new Delivery(
//                 new Date(new Date(dayI, monthI - 1, yearI)),
//                 StatusDelivery.PREPARING,
//                 new Date(new Date(year, month - 1, day))
//             );
//             const items = dataSale.items.map((items) => {
//                 const product = new Product("", 0, 0);
//                 product.id = items.item.product.product_id;

//                 return new Item(
//                     items.item.product.quantity,
//                     product,
//                     items.item.product.product_price
//                 );
//             });
//             const sale = new Sales(
//                 new Date(),
//                 clientDomain,
//                 Status.PROCESSING,
//                 items,
//                 delivery
//             );
//             const facade = new Facade();
//             const addSale = (await facade.create(sale)) as Sale;

//             if ("error" in addSale) {
//                 return res.json({
//                     error: addSale.error,
//                 });
//             }
//             dataSale.id_sales = addSale.sal_id;
//             axios.put("http://localhost:3005/sale/complete", { // Aciona o WebHook
//                 data: dataSale,
//             });
//             return res.json({
//                 success: true,
//                 sale: addSale,
//             });
//         } catch (error) {
//             return res.json({
//                 error,
//             });
//         }
//     }
// }
