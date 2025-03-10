import express from "express";
import "express-async-errors";
import errorHandler from "./helpers/errorHandler";
import routeClient from "./routes/client";
import routeUser from './routes/user'
import routeLogin from './routes/login'
import routeBook from './routes/book'
import cors from 'cors';


class App {
    readonly app;
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    private middlewares(): void {
        this.app.use(express.json()); // Certifique-se de que o body-parser está configurado para interpretar JSON
        this.app.use(cors())
        this.app.use(errorHandler); // Todo erro gerado passa para essa função
    }

    private routes(): void {
        this.app.use('/client', routeClient)
        this.app.use('/user', routeUser)
        this.app.use('/login', routeLogin)
        this.app.use('/book', routeBook)
    }
}

export default new App().app;
