import { Router } from "express";
import { CreateGroupPricingController } from "../Controllers/groupPricing/createGroupPricingController";

const router = Router();
const createGroupsPricingController = new CreateGroupPricingController();

router.post("/create", createGroupsPricingController.handle);

export default router;
