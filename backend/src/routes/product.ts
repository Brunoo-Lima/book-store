import { Router } from "express";
import { CreateProductController } from "../Controllers/Product/CreateProductController";
import { ListProductController } from "../Controllers/Product/ListProductController";

const routes = Router()
routes.put('/addProduct', new CreateProductController().handle)
routes.post('/listProducts', new ListProductController().handle)

export default routes
