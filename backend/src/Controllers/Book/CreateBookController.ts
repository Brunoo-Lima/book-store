import { Response, NextFunction } from "express";
import { IBookDTO } from "../../interfaces/IBookDTO";
import Facade from "../../domain/Facade/Facade";
import Book from "../../domain/Book";
import { Author } from "../../domain/Author";
import { Category } from "../../domain/Category";
import { GroupPricing } from "../../domain/GroupPricing";
import { Authors, Categories, Group_Pricing } from "@prisma/client";
import { CustomRequest } from "../../interfaces/ICustomRequest";

export default class CreateBookController {
    async handle(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const allMessages = []
            const { bookData }: IBookDTO = req.body;
            const facade = new Facade();
            const authors = Author.createAuthors(bookData.boo_author);
            const categories = Category.createCategories(bookData.boo_categories);
            const groupPricing = new GroupPricing(
                bookData.boo_group_pricing.type,
                bookData.boo_group_pricing.percent
            );

            const [authorsExist, categoriesExist, groupPricingExist] = await Promise.all([
                facade.findEntity([...authors]) as Promise<Authors[] | null>,
                facade.findEntity([...categories]) as Promise<Categories[] | null>,
                facade.findEntity([groupPricing]) as Promise<Group_Pricing[] | null>,
            ]);
            if (!authorsExist || authorsExist.length === 0) {
                allMessages.push(await facade.save([...authors]));
            } else {
                authorsExist.forEach((createdAuthor, index) => {
                    authors[index].idEntity = createdAuthor.aut_id;
                });
            }

            if (!categoriesExist || categoriesExist.length === 0) {
                allMessages.push(await facade.save([...categories]));
            } else {
                categoriesExist.forEach((createdCategory, index) => {
                    categories[index].idEntity = createdCategory.cte_id;
                });
            }

            if (!groupPricingExist || groupPricingExist.length === 0) {
                allMessages.push(await facade.save([groupPricing]));
            } else {
                groupPricing.idEntity = groupPricingExist[0].grp_id;
            }

            const book = new Book({
                ...bookData,
                boo_author: authors,
                boo_categories: categories,
                boo_group_pricing: groupPricing,
            });
            allMessages.push(await facade.save([book]));
            const errors = allMessages.filter((message, index) => message[index].error);

            if (errors.length > 0) return res.status(400).json({ ...errors});
            req.bookDomain = book;
            req.created = 'Entity was created !'
            return next();
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}
