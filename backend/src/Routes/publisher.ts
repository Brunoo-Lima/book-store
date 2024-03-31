import { Router } from "express";
import { CreatePublisherController } from "../Controllers/publisher/createPublisherController";

const router = Router();
const createPublisherController = new CreatePublisherController();
router.post('/create', createPublisherController.handle);

export default router;
