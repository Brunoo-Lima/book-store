import { Router } from "express";
import { UserController } from "../Controllers/UserController";

const route = Router();
const userController = new UserController();
route.post("/user/login", userController.handle);

export default route;
