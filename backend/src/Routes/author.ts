import { Router } from "express";
import { CreateAuthorController } from "../Controllers/author/createAuthorController";

const createAuthorController = new CreateAuthorController();
const router = Router();

router.post('/create', createAuthorController.handle);
export default router;

