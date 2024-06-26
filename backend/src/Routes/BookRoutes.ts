import { Router } from "express";
import CreateBookController from "../Controllers/Book/CreateBookController";
import loginRequired from "../Middlewares/loginRequired";
import { UpdateController } from "../Controllers/Book/UpdateBookController";
import { ListBookController } from "../Controllers/Book/ListBooksController";
import { logChange } from "../Middlewares/logChange";

const route = Router();
route.post("/create", loginRequired, new CreateBookController().handle, logChange);
route.put("/update", loginRequired, new UpdateController().handle);
route.get("/list", loginRequired, new ListBookController().handle);

export default route;
