import { Router } from "express";
import { CreateSaleController } from "../Controllers/Sales/CreateSaleController";
import { ListSaleController } from "../Controllers/Sales/ListSaleController";
import updateProfilePurchase from "../utils/updateProfilePurchase";

const routes = Router()

routes.put('/create', new CreateSaleController().handle)
routes.put('/complete', updateProfilePurchase);
routes.post('/list', new ListSaleController().handle)


export default routes
