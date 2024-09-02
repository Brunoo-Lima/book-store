import { Request, Response } from "express";

const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
   // next: NextFunction
) => {
    if (err instanceof Error) {
        return res.status(400).json({ // Todo erro externo a aplicação cai nesse if
            error: err.message,
        });
    }

    return res.status(500).json({ // Erros internos retonam 500
        status: "error",
        message: "Internal Server Error",
    });
}

export default errorHandler;
