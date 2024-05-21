import { Router } from "express";
import BookController from "../Controllers/BookController";

const route = Router();
const bookController = new BookController();
route.post('/create', bookController.handle);

export default route;
