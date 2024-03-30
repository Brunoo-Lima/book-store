import express from "express";

import { CreateUserController } from "./controllers/user/createUserController";
import { CreateBookController } from "./controllers/book/createBookController";
import { ListBooksController } from "./controllers/book/listBooksController";

const router = express.Router();

const createUserController = new CreateUserController();
const createBookController = new CreateBookController();
const listBooksController = new ListBooksController();

//User
router.post("/user", createUserController.handle);

//Book
router.post("/book", createBookController.handle);
router.get("/books", listBooksController.handle);

export default router;
