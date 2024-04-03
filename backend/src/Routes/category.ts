import { Router } from "express";
import CreateCategoryController from "../Controllers/category/createCategoryController";
const categoryController = new CreateCategoryController()
const router = Router();

router.post('/create', categoryController.handle);
export default router;
