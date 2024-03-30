import express from "express";

import { CreateUserController } from "./controllers/user/createUserController";
import { CreateBookController } from "./controllers/book/createBookController";
import { ListBooksController } from "./controllers/book/listBooksController";
import { CreateAuthorController } from "./controllers/author/createAuthorController";
import { CreatePublisherController } from "./controllers/publisher/createPublisherController";

const router = express.Router();

const createUserController = new CreateUserController();
const createBookController = new CreateBookController();
const listBooksController = new ListBooksController();
const createAuthorController = new CreateAuthorController();
const createPublisherController = new CreatePublisherController();

//User
router.post("/user", createUserController.handle);

//Book
router.post("/book", createBookController.handle);
router.get("/books", listBooksController.handle);

//Author
router.post("/author", createAuthorController.handle);

//Publisher
router.post("/publisher", createPublisherController.handle);

export default router;
