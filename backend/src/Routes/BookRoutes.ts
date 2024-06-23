import { Router } from "express";
import CreateBookController from "../Controllers/Book/CreateBookController";
import loginRequired from "../Middlewares/loginRequired";
import { UpdateController } from "../Controllers/Book/UpdateBookController";

const route = Router();
route.post("/create", loginRequired, new CreateBookController().handle);
route.put("/update", loginRequired, new UpdateController().handle)

export default route;
