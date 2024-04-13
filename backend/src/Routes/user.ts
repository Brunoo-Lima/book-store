import { Router } from "express";
import CreateUserController  from "../controllers/user/CreateUserController";

const router = Router();
const userController = new CreateUserController();
router.post('/create', userController.handle)

export default router;
