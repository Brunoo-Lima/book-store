import { Response, Request, NextFunction } from "express";
import { IBookDTO } from "../../interfaces/IBookDTO";
import Facade from "../../domain/Facade/Facade";
import Book from "../../domain/Book";
import { Author } from "../../domain/Author";
import { Category } from "../../domain/Category";
import { GroupPricing } from "../../domain/GroupPricing";
import { Authors, Books, Categories, Group_Pricing } from "@prisma/client";
import { CustomRequest } from "../../interfaces/ICustomRequest";

export default class BookController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const { bookData }: IBookDTO = req.body;
            const facade = new Facade();
            const authors = Author.createAuthors(bookData.boo_author);
            const categories = Category.createCategories(bookData.boo_categories);
            const groupPricing = new GroupPricing(
                bookData.boo_group_pricing.type,
                bookData.boo_group_pricing.percent
            );
            const book = new Book({
                ...bookData,
                boo_author: authors,
                boo_categories: categories,
                boo_group_pricing: groupPricing,
            });

            const messages = await facade.save([...authors, ...categories, groupPricing, book]);

            messages.forEach((message) => {
                const { error } = message;
                if (error) return res.status(400).json({ error });
            })
            const success = messages.map((message) => message.success);

            return res.json({
                ...success
            });
        } catch (error) {
            return res.json({ error: error });
        }
    }
    async update(req: CustomRequest, res: Response, next: NextFunction) {
        // const { bookData }: IBookDTO = req.bookUpdate;
        // const facade = new Facade();
        // let authors;

        // // Usar o titulo para pesquisar o livro
        // if (!bookData.title)
        //     return res.status(400).json({
        //         error: ["You need sent the title to update !"],
        //     });

        // if (bookData.authors) {
        //     authors = createAuthors(bookData.authors);
        // }

        // // const book = await facade.findEntity()
    }
}
