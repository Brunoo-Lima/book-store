import express from "express";
import "express-async-errors";
import errorHandler from "./error/errorHandler";
import routeClient from "./routes/client";
import routeUser from './routes/user'
import cors from 'cors';
class App {
    readonly app;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json());
        this.app.use(cors())
        this.app.use(errorHandler); // Todo erro gerado passa para essa função
    }

    private routes(): void {
        this.app.use('/client', routeClient)
        this.app.use('/user', routeUser)
    }
}

export default new App().app;
