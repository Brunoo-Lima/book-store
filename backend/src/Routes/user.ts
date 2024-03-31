import { Router } from "express";
import { CreateUserController } from "../Controllers/user/createUserController";

const router = Router();
const userController = new CreateUserController();
router.post('/create', userController.handle)

export default router;
