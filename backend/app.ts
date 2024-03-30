import express from "express";
import helmet from "helmet";
import cors from "cors";

import { CreateUserController } from "./src/controllers/user/createUserController";

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
    }
}

export default new App().app;
