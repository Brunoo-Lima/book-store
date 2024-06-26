import { NextFunction, Response } from "express";
import { CustomRequest } from "../../interfaces/ICustomRequest";
import { IBookDTO } from "../../interfaces/IBookDTO";
import Facade from "../../domain/Facade/Facade";
import Book, { BookProps } from "../../domain/Book";
import { Authors, Books } from "@prisma/client";

export class UpdateController {
    async handle(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            const bookData = req.body as IBookDTO;
            const book = Book.createBook(bookData);
            const facade = new Facade();

            const bookExist = await facade.findEntity([book]) as Books[] | null;

            if (!bookExist) return res.status(400).json({
                error: ['Entity do not exist!']
            });
            const existingBook = bookExist[0] as unknown as BookProps;

            // Remove all values undefined to update just key with values
            book.cleanDefaultValues();
            const messages = await facade.update([book]);
            const errors = messages.filter((message) => message.error);

            if (errors.length > 0) {
                return res.status(400).json({
                    errors
                });
            }

            return res.json(existingBook);

        } catch (e) {
            // console.log(e);
            return res.status(500).json(e);
        }
    }
}
