import { Router } from "express";
import  CreateBookController  from "../controllers/book/CreateBookController";
import  ListBooksController from "../controllers/book/ListBooksController";
import  loginRequired  from "../middlewares/loginRequired";

const router = Router();
const createBookController = new CreateBookController();
const listBookController = new ListBooksController();

router.post("/create", loginRequired ,createBookController.handle);
router.get("/list", listBookController.handle);

export default router;
