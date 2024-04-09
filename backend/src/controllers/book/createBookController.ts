import { Request, Response } from "express";
import { CreateBookService } from "../../services/book/createBookService";

class CreateBookController {
    async handle(req: Request, res: Response) {
        const bookData = req.body;
        console.log(bookData)
        const bookService = new CreateBookService();
        const createBook = await bookService.execute(bookData);

        return res.json(createBook);
    }
}

export { CreateBookController };
