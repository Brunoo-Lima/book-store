import { ClientController } from "../Controllers/Client/ClientController";
import { Router } from "express";
// import { log } from "../middlewares/logChange";
import { authenticateJWT } from "../middlewares/loginRequired";


const routeClient = Router()

routeClient.put("/create", authenticateJWT, new ClientController().handle)
routeClient.post("/find", authenticateJWT, new ClientController().list)

export default routeClient;
