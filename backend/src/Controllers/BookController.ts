import { Response, Request, NextFunction } from "express";
import { IBookDTO } from "../interfaces/IBookDTO";
import Facade from "../domain/Facade/Facade";
import Book from "../domain/Book";
import { Author } from "../domain/Author";
import { Category } from "../domain/Category";
import { GroupPricing } from "../domain/GroupPricing";
import { ErrorValidationsException } from "../domain/Errors/ErrorValidationsException";
import { Authors, Categories, Group_Pricing } from "@prisma/client";
import { formatString } from "../utils/formatString";

function createAuthors(authors: string[]): Author[] {
    if (!authors || !authors.length) throw new ErrorValidationsException('Authors cannot be empty!');
    return authors.map(authorName => {
        const authorFormatted = formatString(authorName)
        return new Author(authorFormatted);
    });
}

function createCategories(categories: string[]): Category[] {
    if (!categories || !categories.length) throw new ErrorValidationsException('Categories cannot be empty!');
    return categories.map(categoryName => {
        const categoryFormatted = formatString(categoryName);
        return new Category(categoryFormatted);
    });
}

export default class BookController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { bookData }: IBookDTO = req.body;

            const facade = new Facade();
            const authors = createAuthors(bookData.authors);
            const categories = createCategories(bookData.categories);
            const groupPricing = new GroupPricing(bookData.groupPricing.type, bookData.groupPricing.percent);

            const authorsCreated = await Promise.all(authors.map(author => facade.save(author) as unknown as Authors));
            const categoriesCreated = await Promise.all(categories.map(category => facade.save(category) as unknown as Categories));
            const groupPricingCreated = await facade.save(groupPricing) as Group_Pricing;

            // Assign the IDs created to the author and category objects
            authorsCreated.forEach((createdAuthor, index) => {
                authors[index].idEntity = createdAuthor.aut_id as `${string}-${string}-${string}-${string}-${string}`;
            });

            categoriesCreated.forEach((createdCategory, index) => {
                categories[index].idEntity = createdCategory.cte_id as `${string}-${string}-${string}-${string}-${string}`;
            });
            groupPricing.idEntity = groupPricingCreated.grp_id as `${string}-${string}-${string}-${string}-${string}`;

            const book = new Book({
                ...bookData,
                authors: authors,
                categories: categories,
                groupPricing: groupPricing
            });

            const newBook = await facade.save(book);
            return res.json({
                authors: authorsCreated,
                categories: categoriesCreated,
                groupPricing: groupPricingCreated,
                book: newBook
            });
        } catch (error) {
            return res.json({ error: error });
        }
    }
}
