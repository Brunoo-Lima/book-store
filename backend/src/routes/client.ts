import { CreateClientController } from "../Controllers/Client/CreateClientController";
import { Router } from "express";
// import { log } from "../middlewares/logChange";
import { login } from "../middlewares/loginRequired";
import { ListClientController } from "../Controllers/Client/ListClientController";


const routeClient = Router()

routeClient.put("/create", login, new CreateClientController().handle)
routeClient.post("/find", login, new ListClientController().handle)

export default routeClient;
