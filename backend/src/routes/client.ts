import { ClientController } from "../Controllers/ClientController";
import { Router } from "express";
import { log } from "../middlewares/logChange";
import { login } from "../middlewares/loginRequired";


const routeClient = Router()

routeClient.post("/create", new ClientController().handle, log)
routeClient.post("/find", login, new ClientController().handle) // Alterar para o store

export default routeClient;
