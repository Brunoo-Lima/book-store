import { Response, Request ,NextFunction} from "express";
import { IBookDTO } from "../domain/interfaces/IBookDTO";
import Facade from "../domain/Facade/Facade";
import ISBN from "../domain/Validations/ISBN";
import Book from "../domain/Book";
import { Author } from "../domain/Author";
import { Category } from "../domain/Category";

interface CustomRequest extends Request{
    [key: string]: any; //Only create news keys
}

export default class BookController {
    async handle(req: CustomRequest, res: Response, next: NextFunction) {
        const bookData: IBookDTO = req.body;
        const authors = bookData.authors.map((author) => new Author(author));
        const categories = bookData.categories.map((cte) => new Category(cte));
        const book = new Book({
            ...bookData,
            authors,
            categories,
        });
        const isbnValidated = new ISBN();
        const facadeBook = new Facade([isbnValidated]);
        const bookCreated = await facadeBook.save(book);

        if(bookCreated === null) throw new Error('Book cannot be created !');
        return res.json(bookData);
    }
}
