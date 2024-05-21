import express from "express";
import "express-async-errors";
import cors from "cors";
import errorHandler from "./error/errorHandler";
import route from "./Routes/BookRoutes";


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
        // this.app.use("/user", userRouter);
        // this.app.use('/token', tokenRouter);
    }
}

export default new App().app;
