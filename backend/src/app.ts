import express from "express";
import "express-async-errors";
import helmet from "helmet";
import cors from "cors";
import errorHandler from "./error/errorHandler";
import bookRouter from './Routes/book';
import userRouter from './Routes/user';
import authorRouter from './Routes/author';
import publisherRouter from './Routes/publisher';

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
        this.app.use('/book', bookRouter);
        this.app.use('/user', userRouter);
        // this.app.use('/token', tokenRouter);
        this.app.use('/author', authorRouter);
        this.app.use('/publisher', publisherRouter);
    }
}

export default new App().app;
