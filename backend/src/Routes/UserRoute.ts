import { Router } from "express";
import { UserController } from "../Controllers/User/UserController";

const route = Router();
const userController = new UserController();
route.post("/register", userController.store);
route.post("/login", userController.login);

export default route;
