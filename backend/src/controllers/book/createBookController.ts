import { Request, Response } from "express";
import { CreateBookService } from "../../services/book/createBookService";

class CreateBookController {
    async handle(req: Request, res: Response) {
        const bookData = req.body;

        const createBookService = new CreateBookService();

        const createBook = await createBookService.execute(bookData);

        return res.json(createBook);
    }
}

export { CreateBookController };
