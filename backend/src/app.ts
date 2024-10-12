import express from "express";
import "express-async-errors";
import errorHandler from "./error/errorHandler";
import routeClient from "./routes/client";
import routeUser from './routes/user'
import routeLogin from './routes/login'
import routeSale from './routes/sales'
import cors from 'cors';
import routesProduct from "./routes/product";
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
        this.app.use('/sale', routeSale)
        this.app.use('/product', routesProduct)
    }
}

export default new App().app;
