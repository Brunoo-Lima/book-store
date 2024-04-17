import express from "express";
import "express-async-errors";
import cors from "cors";
import errorHandler from "./error/errorHandler";
import bookRouter from "./Routes/book";
import userRouter from "./Routes/user";
import tokenRouter from './Routes/token';

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
        this.app.use("/book", bookRouter);
        this.app.use("/user", userRouter);
        this.app.use('/token', tokenRouter);
    }
}

export default new App().app;
