import { Response, Request, NextFunction } from "express";
import { IBookDTO } from "../interfaces/IBookDTO";
import Facade from "../domain/Facade/Facade";
import Book from "../domain/Book";
import { Author } from "../domain/Author";
import { Category } from "../domain/Category";
import { GroupPricing } from "../domain/GroupPricing";
import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";

interface CustomRequest extends Request {
    [key: string]: any; //Only create news keys
}
function createAuthors(authors: Array<string> | undefined): Author[] {
    console.log(authors);
    if (!authors || !authors.length) {
        throw new ErrorValidationsException('Authors cannot be empty!');
    }
    return authors.map(authorName => new Author(authorName));
}

function createCategories(categories: Array<string> | undefined): Category[] {
    console.log(categories)
    if (!categories || !categories.length) {
        throw new ErrorValidationsException('Categories cannot be empty!');
    }
    return categories.map(categoryName => new Category(categoryName));
}
export default class BookController {
    async handle(req: CustomRequest, res: Response, next: NextFunction) {
        const bookData: IBookDTO = req.body;
        console.log(bookData);
        console.log(bookData.authors); //It was returned undefined
        
        const facade = new Facade();
        const authors = createAuthors(bookData.authors);
        const categories = createCategories(bookData.categories);
        const book = new Book({
            ...bookData,
            authors,
            categories,
            groupPricing: new GroupPricing(bookData.groupPricing.type, bookData.groupPricing.percent),
        });

        // const [authorsCreated, categoriesCreated, bookCreated] = await Promise.all([
        //     Promise.all(authors.map((author) => facade.save(author))),
        //     Promise.all(categories.map((category) => facade.save(category))),
        //     facade.save(book)
        // ]);

        return res.json({
            ...authors,
            ...categories,
            book
        });

    }
}
