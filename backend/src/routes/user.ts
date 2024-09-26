import { Router } from "express";
import { UserController } from "../Controllers/User/UserController";

const routes = Router()
routes.put('/create', new UserController().handle)

export default routes
