import { Router } from "express";
import BookController from "../Controllers/BookController";
import loginRequired from "../Middlewares/loginRequired";

const route = Router();
const bookController = new BookController();
route.post('/create', loginRequired ,bookController.handle);

export default route;
