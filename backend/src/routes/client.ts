import { ClientController } from "../Controllers/Client/ClientController";
import { Router } from "express";
import { log } from "../middlewares/logChange";


const routeClient = Router()

routeClient.post("/create", new ClientController().handle, log)
routeClient.post("/find", new ClientController().list)

export default routeClient;
