import { Router } from "express";
import  CreateBookController  from "../controllers/book/CreateBookController";
import  ListBooksController from "../controllers/book/ListBooksController";
import  loginRequired  from "../middlewares/loginRequired";
import { addLogsChange } from "../middlewares/addLogs";
import UpdateBookController from "../controllers/book/UpdateBookController";

const router = Router();
const createBookController = new CreateBookController();
const listBookController = new ListBooksController();
const updateBookController = new UpdateBookController();

router.post("/create", loginRequired ,createBookController.handle, addLogsChange);
router.get("/list", loginRequired, listBookController.handle);
router.put("/update", loginRequired, updateBookController.handle, addLogsChange);

export default router;
