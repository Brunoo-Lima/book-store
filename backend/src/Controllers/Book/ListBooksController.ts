import { Request, Response, NextFunction } from 'express';
import { IBookDTO } from '../../interfaces/IBookDTO';
import Book from '../../domain/Book';
import Facade from '../../domain/Facade/Facade';
import { Group_Pricing } from '@prisma/client';

export class ListBookController {
    async handle(req: Request, res: Response, next: NextFunction) {
        try {
            const bookDTO = req.body as IBookDTO;
            const book = Book.createBook(bookDTO);
            const facade = new Facade();

            book.cleanDefaultValues();
            if(book.boo_group_pricing.getTypePricing() !== "DEFAULT"){
                console.log(book.boo_group_pricing);
                const groupPricingExist = await facade.findEntity([book.boo_group_pricing]) as Group_Pricing[];
                if(!groupPricingExist) return res.json({
                    error: ['Group Pricing do not exist !']
                })
                book.boo_group_pricing.idEntity = groupPricingExist[0].grp_id;
            }


            const booksExisting = await facade.findEntity([book]);
            if(!booksExisting) return res.status(400).json({
                error: ['Book do not Exist !']
            })

            return res.json(book);
        } catch (e) {
            console.log(e)
            return res.json(e);
        }
    }
}
