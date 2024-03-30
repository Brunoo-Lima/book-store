import { NextFunction, Request, Response } from "express";

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (err instanceof Error) {
        return res.status(400).json({
            error: err.message,
        });
    }

    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};

export default errorHandler;
