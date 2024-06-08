import { Router } from "express";
import { TokenController } from "../Controllers/Token/TokenController";

const route = Router();
const tokenController = new TokenController();
route.post('/generate', tokenController.store);

export default route;
