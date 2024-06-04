import express from "express";
import "express-async-errors";
import cors from "cors";
import errorHandler from "./error/errorHandler";
import route from "./Routes/BookRoutes";
import userRoute from './Routes/UserRoute';
import tokenRoute from './Routes/TokenRoute';
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
        this.app.use(errorHandler);
    }

    private routes(): void {
        this.app.use("/book", route);
        this.app.use("/user", userRoute);
        this.app.use('/token', tokenRoute);
    }
}

export default new App().app;
