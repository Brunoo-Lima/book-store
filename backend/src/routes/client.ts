import { CreateClientController } from "../Controllers/Client/CreateClientController";
import { Router } from "express";
// import { log } from "../middlewares/logChange";
import { getProfile } from "../middlewares/getProfile";
import { ListClientController } from "../Controllers/Client/ListClientController";
import { UpdateClientController } from "../Controllers/Client/UpdateClientController";

const routeClient = Router()

routeClient.put("/create", getProfile, new CreateClientController().handle)
routeClient.post("/find", getProfile, new ListClientController().handle)
routeClient.put('/update', getProfile, new UpdateClientController().handle)

export default routeClient;
