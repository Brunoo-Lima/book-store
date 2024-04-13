import { Router } from "express";
import  CreateBookController  from "../controllers/book/CreateBookController";
import  ListBooksController from "../controllers/book/ListBooksController";
import  loginRequired  from "../middlewares/loginRequired";
import { addLogsChange } from "../middlewares/addLogs";

const router = Router();
const createBookController = new CreateBookController();
const listBookController = new ListBooksController();

router.post("/create", loginRequired ,createBookController.handle, addLogsChange);
router.get("/list", loginRequired, listBookController.handle, addLogsChange);

export default router;
