import { CreateClientController } from "../Controllers/Client/CreateClientController";
import { Router } from "express";
// import { log } from "../middlewares/logChange";
import { getProfile } from "../middlewares/getProfile";
import { ListClientController } from "../Controllers/Client/ListClientController";


const routeClient = Router()

routeClient.put("/create", getProfile, new CreateClientController().handle)
routeClient.post("/find", getProfile, new ListClientController().handle)

export default routeClient;
