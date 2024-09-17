import { ClientController } from "../Controllers/ClientController";
import { Router } from "express";

const routeClient = Router()
routeClient.post("/create", new ClientController().handle)

export default routeClient;
