import express from "express";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";

import errorHandler from "./error/errorHandler";
import router from "./routes";

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

        this.app.use(errorHandler);
    }

    private routes(): void {
        this.app.use(router);
    }
}

export default new App().app;
