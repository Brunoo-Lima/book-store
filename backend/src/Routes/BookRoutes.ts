import { Router } from "express";
import BookController from "../Controllers/CreateBookController";
import loginRequired from "../Middlewares/loginRequired";
import { logChange } from "../Middlewares/logChange";

const route = Router();
const bookController = new BookController();
route.post('/create', loginRequired ,bookController.handle, logChange);

export default route;
