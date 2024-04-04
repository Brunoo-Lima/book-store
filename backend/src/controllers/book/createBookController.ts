import { Request, Response } from "express";
import { CreateBookService } from "../../services/book/createBookService";
import { BookDomain } from "../../domain/BookDomain";

class CreateBookController {
    async handle(req: Request, res: Response) {
        const bookData: BookDomain = req.body;

        const bookService = new CreateBookService();

        const createBook = await bookService.execute(bookData);

        return res.json(createBook);
    }
}

export { CreateBookController };
