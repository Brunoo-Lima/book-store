import { Request, Response, NextFunction } from "express";
import CreateBookService from "../../services/book/CreateBookService";

export default class CreateBookController {
    async handle(req: Request, res: Response, next: NextFunction) {
        const {bookData} = req.body;
        const bookService = new CreateBookService();
        const { book } = await bookService.execute(bookData);

        return res.json(book);
    }
}
