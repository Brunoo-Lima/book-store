import { Request, Response, NextFunction } from "express";
import CreateBookService from "../../services/book/CreateBookService";


//This interface allows me to create new keys in the object
export interface CustomRequest extends Request{
    [key: string]: any;
}

export default class CreateBookController {
    async handle(req: CustomRequest , res: Response, next: NextFunction) {

        const {userId} = req
        const { bookData } = req.body;

        if(!userId || !bookData) return res.status(400).json('Error ! Data does not sent ')

        const bookService = new CreateBookService();
        const { book } = await bookService.execute(bookData);
        const { boo_id, boo_justify_status} = book;

        req.logsChange = {
            boo_id,
            userId,
            description: boo_justify_status
        }
        return next();
    }
}
