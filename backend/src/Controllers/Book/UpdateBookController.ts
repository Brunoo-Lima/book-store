import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/ICustomRequest";
import { IBookDTO } from "../../interfaces/IBookDTO";
import Facade from "../../domain/Facade/Facade";
import Book from "../../domain/Book";
import { Authors, Categories, Group_Pricing } from "@prisma/client";

export class UpdateController {
    async handle(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const bookData: Partial<IBookDTO> = req.body;
            const book = Book.createBook(bookData);
            const facade = new Facade();

            const entityExist = await facade.findEntity([book]);

            if (!entityExist) return res.status(400).json({
                error: ['Entity do not exist!']
            });

            // Remove all values undefined to update just key with values
            book.cleanDefaultValues();

            let authorsExist, categoriesExist, groupPricingExist;
            if (book.boo_author.length > 0) {
                authorsExist = await facade.findEntity([...book.boo_author]) as Authors[];
                if (!authorsExist || authorsExist.length === 0) {
                    await facade.save([...book.boo_author]);
                } else {
                    authorsExist.forEach((createdAuthor, index) => {
                        book.boo_author[index].idEntity = createdAuthor.aut_id;
                    });
                }
            }

            if (book.boo_categories.length > 0) {
                categoriesExist = await facade.findEntity([...book.boo_categories]) as Categories[];
                if (!categoriesExist || categoriesExist.length === 0) {
                    await facade.save([...book.boo_categories]);
                } else {
                    categoriesExist.forEach((createdCategory, index) => {
                        book.boo_categories[index].idEntity = createdCategory.cte_id;
                    });
                }
            }

            if (book.boo_group_pricing) {
                groupPricingExist = await facade.findEntity([book.boo_group_pricing]) as Group_Pricing[];
                if (!groupPricingExist || groupPricingExist.length === 0) {
                    await facade.save([book.boo_group_pricing]);
                } else {
                    book.boo_group_pricing.idEntity = groupPricingExist[0].grp_id;
                }
            }


            const messages = await facade.update([book]);
            const errors = messages.filter((message) => message.error);

            if (errors.length > 0) {
                return res.status(400).json({
                    errors
                });
            }

            return res.json({
                book
            });

        } catch (e) {
            // console.log(e);
            return res.status(500).json(e);
        }
    }
}
