import { Response, Request ,NextFunction} from "express";
import { IBookDTO } from "../interfaces/IBookDTO";
import Facade from "../domain/Facade/Facade";
import ISBN from "../Validations/ISBN";
import Book from "../domain/Book";
import { Author } from "../domain/Author";
import { Category } from "../domain/Category";
import BookDao from "../DAO/BookDao";
import { ValidExistence } from "../Validations/ValidExistence";
import EntityDomain from "../domain/EntityDomain";

interface CustomRequest extends Request{
    [key: string]: any; //Only create news keys
}

export default class BookController {
    async handle(req: CustomRequest, res: Response, next: NextFunction) {
        const bookData: IBookDTO = req.body;
        const authors = bookData.authors.map((name) => new Author(name));
        const categories = bookData.categories.map((cte) => new Category(cte));
        const book = new Book({
            ...bookData,
            authors,
            categories,
        });
        const isbnValidated = new ISBN();
        const validateEntity = new ValidExistence();
        const facade= new Facade([isbnValidated, validateEntity]);
        const bookCreated = await facade.save(book);

        if(bookCreated === null) throw new Error('Book cannot be created !');
        return res.json(bookData);
    }
}
