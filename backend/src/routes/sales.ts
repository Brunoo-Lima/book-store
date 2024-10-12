import { Router } from "express";
import { CreateSaleController } from "../Controllers/Sales/CreateSaleController";
import { ListSaleController } from "../Controllers/Sales/ListSaleController";

const routes = Router()
routes.put('/create', new CreateSaleController().handle)
routes.post('/list', new ListSaleController().handle)
export default routes
