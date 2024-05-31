import { Response, Request, NextFunction } from "express";
import { IBookDTO } from "../interfaces/IBookDTO";
import Facade from "../domain/Facade/Facade";
import Book from "../domain/Book";
import { Author } from "../domain/Author";
import { Category } from "../domain/Category";
import { GroupPricing } from "../domain/GroupPricing";
import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";

function createAuthors(authors: string[]): Author[] {
    if (!authors || !authors.length) {
        throw new ErrorValidationsException('Authors cannot be empty!');
    }
    return authors.map(authorName => new Author(authorName));
}

function createCategories(categories: string[]): Category[] {
    if (!categories || !categories.length) {
        throw new ErrorValidationsException('Categories cannot be empty!');
    }
    return categories.map(categoryName => new Category(categoryName));
}

export default class BookController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { bookData }: IBookDTO = req.body;
            const facade = new Facade();
            const authors = createAuthors(bookData.authors);
            const categories = createCategories(bookData.categories);
            const groupPricing = new GroupPricing(bookData.groupPricing.type, bookData.groupPricing.percent);

            const authorsCreated = await Promise.all(authors.map(author => facade.save(author)));
            const categoriesCreated = await Promise.all(categories.map(category => facade.save(category)));
            const groupPricingCreated = await facade.save(groupPricing);


            const book = new Book({
                ...bookData,
                authors: authors,
                categories: categories,
                groupPricing: groupPricing
            });
            const bookCreated = await facade.save(book);

            return res.json({
                authors: authorsCreated,
                categories: categoriesCreated,
                groupPricing: groupPricingCreated,
                book: bookCreated
            });
        } catch (error) {
            return res.json(error);
        }
    }
}
