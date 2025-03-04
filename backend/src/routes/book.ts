import { Router } from "express";
import { log } from "../middlewares/logChange";
import { BookController } from "../Controllers/Book/BookController";

const routes = Router()

routes.put("/create", new BookController().handle, log)

export default routes
