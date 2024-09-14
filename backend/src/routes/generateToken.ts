import { Router } from "express";
import {TokenController} from "../Controllers/Token";

const routeLogin = Router()

routeLogin.post("/token", new TokenController().store)

export default routeLogin
