import { Router } from "express";
import { CreateBookController } from "../Controllers/book/createBookController";
import { ListBooksController } from "../Controllers/book/listBooksController";

const router = Router();
const createBookController = new CreateBookController();
const listBookController = new ListBooksController();

router.post("/create", createBookController.handle);
router.get("/list", listBookController.handle);

export default router;
