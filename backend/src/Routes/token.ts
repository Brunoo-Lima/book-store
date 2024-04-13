import { Router } from "express";
import tokenController from "../controllers/token/tokenController";

const router = Router();
router.post('/create', tokenController.store);

export default router;
