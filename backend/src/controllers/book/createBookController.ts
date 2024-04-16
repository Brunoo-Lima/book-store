import { Request, Response, NextFunction } from "express";
import CreateBookService from "../../services/book/createBookService";

export default class CreateBookController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const {userId} = req.body
        const { bookData } = req.body;

        if(!userId || !bookData) return res.status(400).json('Error ! Data does not sent ')

        const bookService = new CreateBookService();
        const { book } = await bookService.execute(bookData);
        const { boo_id, boo_justify_status} = book;

        req.body.logsChange = {
            boo_id,
            userId,
            description: boo_justify_status
        }
        return next();
    }
}
