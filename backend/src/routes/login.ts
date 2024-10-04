import { Router } from "express";
import { Authentication } from "../Controllers/Authentication/Authentication";

const routes = Router()

routes.post('/token', new Authentication().login)

export default routes;
