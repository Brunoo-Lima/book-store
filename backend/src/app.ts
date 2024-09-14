import express from "express";
import "express-async-errors";
import errorHandler from "./error/errorHandler";
import routeLogin from "./routes/generateToken";
class App {
    readonly app;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(errorHandler); // Todo erro gerado passa para essa função
    }

    private routes(): void {
        this.app.use('/login', routeLogin)
    }
}

export default new App().app;
