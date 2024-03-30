import express from "express";
import helmet from "helmet";
import cors from "cors";

import { CreateUserController } from "./src/controllers/user/createUserController";
import { CreateBookController } from "./src/controllers/book/createBookController";

class App {
    readonly app;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(helmet());
    }

    private routes(): void {
        const createUserController = new CreateUserController();
        this.app.post("/user", createUserController.handle);

        const createBookController = new CreateBookController();
        this.app.post("/book", createBookController.handle);
    }
}

export default new App().app;
